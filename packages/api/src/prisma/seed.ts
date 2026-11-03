// @ts-nocheck
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding AusEdu Connect…');

  // 1. Create a demo tenant
  const platform = await prisma.tenant.upsert({
    where: { slug: 'aus-edu-platform' },
    update: {},
    create: {
      slug: 'aus-edu-platform',
      name: 'AusEdu Connect Platform',
      status: 'ACTIVE',
      plan: 'PROFESSIONAL',
      branding: { theme: 'blue', logoUrl: '' },
      settings: { appName: 'AusEdu Connect', supportEmail: 'support@ause.edu' },
      subscription: {
        create: {
          status: 'ACTIVE',
          billingCycle: 'MONTHLY',
          amount: '0',
          currency: 'AUD',
          seats: 1,
          startsAt: new Date(),
          endsAt: new Date('2027-12-31'),
        },
      },
    },
  });

  // 2. Create a demo school (with a campus)
  const school = await prisma.schoolProfile.create({
    data: {
      schoolId: 'melbourne-high-school',
      legalName: 'Melbourne High School',
      tradingName: 'Melbourne High School',
      registrationNumber: 'VIT12345',
      cricosCode: '0012345',
      verificationStatus: 'VERIFIED',
      tenant: { connect: { slug: platform.slug } },
      addresses: {
        create: [
          {
            name: 'Melbourne City Campus',
            addressLine1: '123 Swanston St',
            city: 'Melbourne',
            state: 'VIC',
            postcode: '3000',
            country: 'Australia',
            timezone: 'Australia/Melbourne',
          },
        ],
      },
    },
  });

  // 3. Create the course(s)
  const schoolCampus = await prisma.campus.findFirst({
    where: { schoolId: school.id },
  });

  const course = await prisma.course.create({
    data: {
      code: 'HLTH101',
      name: 'Health & Physical Education',
      category: 'HIGH_SCHOOL',
      qualification: 'CERTIFICATE_II',
      deliveryMode: 'BLENDED',
      durationMonths: 12,
      entryRequirements: 'No prerequisites',
      internationalStudents: true,
      status: 'PUBLISHED',
      school: { connect: { id: school.id } },
      tenant: { connect: { slug: platform.slug } },
      pricingHistory: {
        create: {
          version: 1,
          changedById: 'system',
          changedByName: 'AusEdu Connect',
          changedByType: 'PLATFORM_ADMIN',
          summary: { old: 0, new: 3200 },
          changes: { old: 0, new: 3200 },
          effectiveDate: new Date('2024-01-01'),
        },
      },
      campuses: {
        create: [
          {
            campus: { connect: { id: schoolCampus.id } },
            effectiveDate: new Date(),
          },
        ],
      },
      intakes: {
        create: [
          { month: 1, year: 2026, intakeLabel: '2026-01', description: 'January intake' },
          { month: 7, year: 2026, intakeLabel: '2026-07', description: 'July intake' },
        ],
      },
    },
  });

  // 4. Create a demo agency with a commission agreement to the school
  const agency = await prisma.agencyProfile.create({
    data: {
      agencyId: 'NARR-001',
      legalName: 'Northern Australia Recruitment Pty Ltd',
      tradingName: 'NARR',
      verificationStatus: 'VERIFIED',
      tenant: { connect: { slug: platform.slug } },
      addresses: {
        create: [
          {
            name: 'NARR Office',
            addressLine1: '45 Smith St',
            city: 'Cairns',
            state: 'QLD',
            postcode: '4870',
            country: 'Australia',
            timezone: 'Australia/Brisbane',
          },
        ],
      },
      commissionAgreements: {
        create: {
          tenant: { connect: { slug: platform.slug } },
          school: { connect: { id: school.id } },
          agent: { connect: { agencyId: 'NARR-001' } },
          rate: 5,
          currency: 'AUD',
          effectiveFrom: new Date('2024-01-01'),
          effectiveUntil: new Date('2026-12-31'),
          status: 'ACTIVE',
        },
      },
    },
  });

  // 5. Create a demo student (lead)
  const student = await prisma.student.create({
    data: {
      tenant: { connect: { slug: platform.slug } },
      firstName: 'Jordan',
      lastName: 'Beckett',
      email: 'j.beckett@example.com',
      phone: '+61 400 000 000',
      country: 'Australia',
      preferredCourse: 'Health & Physical Education',
      preferredLocation: 'Melbourne',
      status: 'QUALIFIED',
      documents: {
        create: {
          tenant: { connect: { slug: platform.slug } },
          docType: 'STUDENT_DOCUMENT',
          name: 'Student passport copy',
          storageKey: `students/${student.id}/passport.pdf`,
          mimeType: 'application/pdf',
          sizeBytes: 5120,
          verified: false,
          status: 'PENDING',
          uploadedBy: 'system',
          uploadedByName: 'AusEdu Connect',
        },
      },
    },
  });

  // 6. Create a quote
  const quote = await prisma.quote.create({
    data: {
      tenant: { connect: { slug: platform.slug } },
      agency: { connect: { agencyId: 'NARR-001' } },
      school: { connect: { id: school.id } },
      student: { connect: { id: student.id } },
      intake: {
        connect: {
          courseId_intakeLabel: {
            courseId: course.id,
            intakeLabel: '2026-01',
          },
        },
      },
      quoteRef: `NARR-${Date.now().toString().slice(-6)}`,
      status: 'DRAFT',
      totalEstimate: '3200.00',
      commissionEligible: '160.00',
      notes: 'Draft quote for demonstration purposes.',
      documents: {
        create: {
          tenant: { connect: { slug: platform.slug } },
          docType: 'COURSE_DOCUMENTATION',
          name: 'Quote Certificate',
          storageKey: `quotes/${quote.id}/certificate.pdf`,
          mimeType: 'application/pdf',
          sizeBytes: 2048,
          verified: true,
          status: 'VERIFIED',
          uploadedBy: 'system',
          uploadedByName: 'AusEdu Connect',
        },
      },
    },
  });

  // 7. Create a pricing snapshot for the quote
  await prisma.quotePricingSnapshot.upsert({
    where: { quoteId_version: { quoteId: quote.id, version: 1 } },
    update: {},
    create: {
      quote: { connect: { id: quote.id } },
      version: 1,
      summary: { old: 0, new: 3200 },
      changes: { old: 0, new: 3200 },
      effectiveDate: new Date(),
    },
  });

  // 8. Create a platform setting
  await prisma.platformSetting.create({
    data: {
      key: 'contact_email',
      value: 'support@ause.edu',
      tenant: { connect: { slug: platform.slug } },
    },
  });

  console.log('Seed complete.');
  console.log('  Tenant:', platform.slug);
  console.log('  School:', school.slug);
  console.log('  Agency:', agency.slug);
  console.log('  Student:', student.email);
  console.log('  Quote:', quote.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
