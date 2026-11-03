-- CreateEnum
CREATE TYPE "TenantStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'DRAFT');

-- CreateEnum
CREATE TYPE "TenantPlan" AS ENUM ('DEVELOPER', 'PROFESSIONAL', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'PLATFORM_ADMIN', 'SCHOOL_ADMIN', 'SCHOOL_STAFF', 'AGENCY_OWNER', 'AGENCY_COUNSELOR', 'FINANCE_USER');

-- CreateEnum
CREATE TYPE "SchoolVerificationStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "AgencyVerificationStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED', 'REVIEW');

-- CreateEnum
CREATE TYPE "CourseCategory" AS ENUM ('ELICOS', 'VET_CERTIFICATE', 'VET_DIPLOMA', 'HIGH_SCHOOL');

-- CreateEnum
CREATE TYPE "CourseQualification" AS ENUM ('CERTIFICATE_I', 'CERTIFICATE_II', 'CERTIFICATE_III', 'CERTIFICATE_IV', 'DIPLOMA', 'ADVANCED_DIPLOMA', 'DEGREE', 'MASTERS', 'DOCTORATE', 'HIGH_SCHOOL', 'EnglishLanguage');

-- CreateEnum
CREATE TYPE "CourseDeliveryMode" AS ENUM ('ONLINE', 'BLENDED', 'ON_CAMPUS', 'WORKPLACE');

-- CreateEnum
CREATE TYPE "FeePeriod" AS ENUM ('PER_YEAR', 'PER_HALF_YEAR', 'PER_SEMESTER', 'PER_TERM', 'PER_COURSE', 'ONE_TIME', 'PER_UNIT');

-- CreateEnum
CREATE TYPE "FeeType" AS ENUM ('TUITION', 'ENROLLMENT', 'MATERIAL', 'OTHER_MANDATORY', 'OPTIONAL');

-- CreateEnum
CREATE TYPE "PromotionStatus" AS ENUM ('DRAFT', 'PENDING_VERIFICATION', 'SCHEDULED', 'ACTIVE', 'PAUSED', 'EXPIRED', 'REJECTED');

-- CreateEnum
CREATE TYPE "PromotionDiscountType" AS ENUM ('PERCENTAGE', 'AMOUNT', 'MATERIAL_FEE_WAIVER');

-- CreateEnum
CREATE TYPE "PromotionVerificationStatus" AS ENUM ('NOT_REQUIRED', 'PENDING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "DiscountStackPolicy" AS ENUM ('BEST_ELIGIBLE', 'EXPLICIT', 'NONE');

-- CreateEnum
CREATE TYPE "CommissionStatus" AS ENUM ('DRAFT', 'PENDING_APPROVAL', 'ACTIVE', 'EXPIRED', 'TERMINATED');

-- CreateEnum
CREATE TYPE "CommissionType" AS ENUM ('PERCENTAGE', 'FIXED_AMOUNT');

-- CreateEnum
CREATE TYPE "StudentConsentPurpose" AS ENUM ('LEADS', 'MARKETING', 'COURSE_APPLICATION', 'FOLLOW_UP');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'QUOTE_PREPARED', 'APPLICATION_IN_PROGRESS', 'SUBMITTED_TO_SCHOOL', 'OFFER_RECEIVED', 'ACCEPTED', 'ENROLLED', 'CLOSED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'SUBMITTED', 'UNDER_REVIEW', 'OFFERED', 'ACCEPTED', 'ENROLLED', 'WITHDRAWN', 'CLOSED');

-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('DRAFT', 'SENT', 'ACCEPTED', 'REJECTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('SCHOOL_REGISTRATION', 'COURSE_DOCUMENTATION', 'PROMOTION_VERIFICATION', 'AGENCY_AGREEMENT', 'STUDENT_DOCUMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'PASSWORD_CHANGE', 'ROLE_CHANGE', 'TENANT_SUSPEND', 'TENANT_REACTIVATE', 'PUBLISH_PROMOTION', 'VERIFY_PROMOTION', 'UPLOAD_DOCUMENT', 'VERIFY_DOCUMENT', 'CREATE_QUOTE', 'UPDATE_QUOTE', 'GENERATE_PDF', 'APPROVE_COMMISSION', 'TOGGLE_PROMOTION');

-- CreateTable
CREATE TABLE "Tenant" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "plan" "TenantPlan" NOT NULL DEFAULT 'DEVELOPER',
    "status" "TenantStatus" NOT NULL DEFAULT 'ACTIVE',
    "branding" JSONB,
    "settings" JSONB,
    "subscription_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TenantMembership" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "permission" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "invitedBy" TEXT,
    "invitedAt" TIMESTAMP(3),
    "acceptedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TenantMembership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "fullName" TEXT NOT NULL,
    "phone" TEXT,
    "avatarUrl" TEXT,
    "tenantId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TenantSubscription" (
    "id" TEXT NOT NULL,
    "tenant_subscription_tenant_id" TEXT NOT NULL,
    "status" "TenantStatus" NOT NULL DEFAULT 'ACTIVE',
    "billingCycle" TEXT NOT NULL DEFAULT 'MONTHLY',
    "amount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'AUD',
    "seats" INTEGER NOT NULL DEFAULT 1,
    "startsAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endsAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TenantSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatformSetting" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT NOT NULL,

    CONSTRAINT "PlatformSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolProfile" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "schoolId" TEXT,
    "legalName" TEXT NOT NULL,
    "tradingName" TEXT,
    "registrationNumber" TEXT,
    "cricosCode" TEXT,
    "taxFileNumber" TEXT,
    "verificationStatus" "SchoolVerificationStatus" NOT NULL DEFAULT 'PENDING',
    "verificationNotes" TEXT,
    "verifiedBy" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "deactivationReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchoolProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgencyProfile" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "agencyId" TEXT,
    "legalName" TEXT NOT NULL,
    "tradingName" TEXT,
    "regulatoryNumber" TEXT,
    "acn" TEXT,
    "ABN" TEXT,
    "verificationStatus" "AgencyVerificationStatus" NOT NULL DEFAULT 'PENDING',
    "verificationNotes" TEXT,
    "verifiedBy" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "deactivationReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgencyProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgencyContact" (
    "id" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "role" TEXT,
    "primary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AgencyContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProviderRegistration" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "registrationType" TEXT NOT NULL,
    "licenseNumber" TEXT NOT NULL,
    "registrationNumber" TEXT,
    "expiresAt" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProviderRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campus" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'Australia',
    "timezone" TEXT NOT NULL DEFAULT 'Australia/Sydney',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "CourseCategory" NOT NULL,
    "qualification" "CourseQualification" NOT NULL,
    "deliveryMode" "CourseDeliveryMode" NOT NULL,
    "durationMonths" INTEGER,
    "description" TEXT,
    "entryRequirements" TEXT,
    "internationalStudents" BOOLEAN NOT NULL DEFAULT true,
    "cricosCourseCode" TEXT,
    "status" "CourseStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "archivedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseCampus" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "campusId" TEXT NOT NULL,
    "effectiveDate" TIMESTAMP(3),
    "expiresDate" TIMESTAMP(3),

    CONSTRAINT "CourseCampus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseIntake" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "intakeLabel" TEXT NOT NULL,
    "description" TEXT,
    "availableSeats" INTEGER DEFAULT 1,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseIntake_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseFee" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "campusId" TEXT,
    "feeType" "FeeType" NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'AUD',
    "period" "FeePeriod" NOT NULL,
    "description" TEXT,
    "effectiveDate" TIMESTAMP(3),
    "expiredDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseFee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricingHistory" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "changedById" TEXT NOT NULL,
    "changedByName" TEXT NOT NULL,
    "changedByType" "UserRole" NOT NULL,
    "summary" JSONB NOT NULL,
    "changes" JSONB NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PricingHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promotion" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "discountType" "PromotionDiscountType" NOT NULL,
    "discountValue" DECIMAL(65,30) NOT NULL,
    "maxDiscount" DECIMAL(65,30),
    "minEligibleFee" DECIMAL(65,30),
    "stackPolicy" "DiscountStackPolicy" NOT NULL DEFAULT 'BEST_ELIGIBLE',
    "terms" TEXT,
    "internalNotes" TEXT,
    "documentId" TEXT,
    "status" "PromotionStatus" NOT NULL DEFAULT 'DRAFT',
    "verificationStatus" "PromotionVerificationStatus" NOT NULL DEFAULT 'NOT_REQUIRED',
    "verifiedById" TEXT,
    "verifiedByName" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "rejectedById" TEXT,
    "rejectedByName" TEXT,
    "rejectedAt" TIMESTAMP(3),
    "scheduleEnabled" BOOLEAN NOT NULL DEFAULT false,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "effectiveDate" TIMESTAMP(3),
    "expiredDate" TIMESTAMP(3),
    "planPrice" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Promotion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromotionCourse" (
    "id" TEXT NOT NULL,
    "promotionId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "campuses" TEXT[],

    CONSTRAINT "PromotionCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromotionCampus" (
    "id" TEXT NOT NULL,
    "promotionId" TEXT NOT NULL,
    "campusId" TEXT NOT NULL,

    CONSTRAINT "PromotionCampus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromotionDocument" (
    "id" TEXT NOT NULL,
    "promotionId" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "reviewedBy" TEXT,
    "reviewedByName" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PromotionDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgencyCommissionAgreement" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "agreementReference" TEXT,
    "commissionType" "CommissionType" NOT NULL,
    "commissionValue" DECIMAL(65,30) NOT NULL,
    "commissionBasis" TEXT,
    "basisJson" JSONB,
    "effectiveStart" TIMESTAMP(3) NOT NULL,
    "effectiveEnd" TIMESTAMP(3),
    "eligibleIntakes" TEXT[],
    "paymentMilestones" JSONB,
    "minimumSpend" DECIMAL(65,30),
    "documentId" TEXT,
    "status" "CommissionStatus" NOT NULL DEFAULT 'DRAFT',
    "notes" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgencyCommissionAgreement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommissionRule" (
    "id" TEXT NOT NULL,
    "agreementId" TEXT NOT NULL,
    "courseId" TEXT,
    "campusId" TEXT,
    "rate" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'AUD',
    "basis" TEXT,
    "effectiveStart" TIMESTAMP(3) NOT NULL,
    "effectiveEnd" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommissionRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "nationality" TEXT,
    "country" TEXT,
    "studyLevel" TEXT,
    "preferredCourse" TEXT,
    "preferredLocation" TEXT,
    "preferredIntake" TEXT,
    "assignedCounselorId" TEXT,
    "consentGiven" BOOLEAN NOT NULL DEFAULT false,
    "consentAt" TIMESTAMP(3),
    "consentVersion" INTEGER NOT NULL DEFAULT 1,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentConsent" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "purpose" "StudentConsentPurpose" NOT NULL,
    "givenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" INTEGER NOT NULL DEFAULT 1,
    "expiresAt" TIMESTAMP(3),
    "revokeAt" TIMESTAMP(3),
    "notes" TEXT,

    CONSTRAINT "StudentConsent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "stageHistory" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "notes" TEXT,
    "assignedCounselorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "leadId" TEXT,
    "courseId" TEXT NOT NULL,
    "intakeId" TEXT,
    "quoteId" TEXT,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'NEW',
    "stageHistory" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "notes" TEXT,
    "submittedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "quoteRef" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "studentId" TEXT,
    "schoolId" TEXT NOT NULL,
    "campusId" TEXT,
    "intakeId" TEXT,
    "pricingSnapshotId" TEXT,
    "eligibleDiscounts" JSONB,
    "totalEstimate" DECIMAL(65,30) NOT NULL,
    "commissionEligible" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "status" "QuoteStatus" NOT NULL DEFAULT 'DRAFT',
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validUntil" TIMESTAMP(3) NOT NULL,
    "feeValidityDate" TIMESTAMP(3),
    "feeAcknowledgement" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuoteItem" (
    "id" TEXT NOT NULL,
    "quoteId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "campusId" TEXT,
    "itemType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'AUD',
    "period" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuoteItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuotePricingSnapshot" (
    "id" TEXT NOT NULL,
    "quoteId" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "snapshotData" JSONB NOT NULL,
    "snapshottedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuotePricingSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "docType" "DocumentType" NOT NULL,
    "name" TEXT NOT NULL,
    "storageKey" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "mimeGroup" TEXT,
    "sizeBytes" INTEGER NOT NULL,
    "checksum" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedBy" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "verificationNotes" TEXT,
    "status" "DocumentStatus" NOT NULL DEFAULT 'PENDING',
    "expiresAt" TIMESTAMP(3),
    "uploadedById" TEXT NOT NULL,
    "uploadedByName" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "schoolId" TEXT,
    "campusId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgencySavedCourse" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "savedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AgencySavedCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolAgencyRelationship" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "agreedFrom" TIMESTAMP(3),
    "agreedUntil" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchoolAgencyRelationship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "data" JSONB,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "userId" TEXT,
    "action" "AuditAction" NOT NULL,
    "entityType" TEXT,
    "entityId" TEXT,
    "changes" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgencyCommissionRelationship" (
    "id" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AgencyCommissionRelationship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_quoteAgreements" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_quoteAgreements_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_documentApplications" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_documentApplications_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_documentQuotes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_documentQuotes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_documentStudents" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_documentStudents_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_slug_key" ON "Tenant"("slug");

-- CreateIndex
CREATE INDEX "TenantMembership_tenantId_status_idx" ON "TenantMembership"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "TenantMembership_tenantId_userId_key" ON "TenantMembership"("tenantId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TenantSubscription_tenant_subscription_tenant_id_key" ON "TenantSubscription"("tenant_subscription_tenant_id");

-- CreateIndex
CREATE INDEX "TenantSubscription_tenant_subscription_tenant_id_idx" ON "TenantSubscription"("tenant_subscription_tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "PlatformSetting_key_key" ON "PlatformSetting"("key");

-- CreateIndex
CREATE UNIQUE INDEX "PlatformSetting_tenantId_key" ON "PlatformSetting"("tenantId");

-- CreateIndex
CREATE INDEX "PlatformSetting_tenantId_idx" ON "PlatformSetting"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolProfile_schoolId_key" ON "SchoolProfile"("schoolId");

-- CreateIndex
CREATE UNIQUE INDEX "AgencyProfile_agencyId_key" ON "AgencyProfile"("agencyId");

-- CreateIndex
CREATE INDEX "AgencyProfile_tenantId_idx" ON "AgencyProfile"("tenantId");

-- CreateIndex
CREATE INDEX "AgencyContact_agencyId_idx" ON "AgencyContact"("agencyId");

-- CreateIndex
CREATE UNIQUE INDEX "AgencyContact_agencyId_email_key" ON "AgencyContact"("agencyId", "email");

-- CreateIndex
CREATE INDEX "ProviderRegistration_schoolId_idx" ON "ProviderRegistration"("schoolId");

-- CreateIndex
CREATE INDEX "Campus_schoolId_idx" ON "Campus"("schoolId");

-- CreateIndex
CREATE UNIQUE INDEX "Campus_schoolId_name_key" ON "Campus"("schoolId", "name");

-- CreateIndex
CREATE INDEX "Course_schoolId_idx" ON "Course"("schoolId");

-- CreateIndex
CREATE INDEX "Course_status_idx" ON "Course"("status");

-- CreateIndex
CREATE INDEX "Course_category_qualification_idx" ON "Course"("category", "qualification");

-- CreateIndex
CREATE INDEX "Course_internationalStudents_idx" ON "Course"("internationalStudents");

-- CreateIndex
CREATE UNIQUE INDEX "Course_schoolId_code_key" ON "Course"("schoolId", "code");

-- CreateIndex
CREATE INDEX "CourseCampus_courseId_idx" ON "CourseCampus"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseCampus_courseId_campusId_key" ON "CourseCampus"("courseId", "campusId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseIntake_intakeLabel_key" ON "CourseIntake"("intakeLabel");

-- CreateIndex
CREATE INDEX "CourseIntake_courseId_status_idx" ON "CourseIntake"("courseId", "status");

-- CreateIndex
CREATE INDEX "CourseIntake_year_month_idx" ON "CourseIntake"("year", "month");

-- CreateIndex
CREATE INDEX "CourseFee_courseId_idx" ON "CourseFee"("courseId");

-- CreateIndex
CREATE INDEX "CourseFee_feeType_idx" ON "CourseFee"("feeType");

-- CreateIndex
CREATE INDEX "CourseFee_effectiveDate_idx" ON "CourseFee"("effectiveDate");

-- CreateIndex
CREATE INDEX "CourseFee_expiredDate_idx" ON "CourseFee"("expiredDate");

-- CreateIndex
CREATE UNIQUE INDEX "CourseFee_courseId_campusId_feeType_period_key" ON "CourseFee"("courseId", "campusId", "feeType", "period");

-- CreateIndex
CREATE INDEX "PricingHistory_courseId_version_idx" ON "PricingHistory"("courseId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "PricingHistory_courseId_version_key" ON "PricingHistory"("courseId", "version");

-- CreateIndex
CREATE INDEX "Promotion_status_idx" ON "Promotion"("status");

-- CreateIndex
CREATE INDEX "Promotion_startTime_endTime_idx" ON "Promotion"("startTime", "endTime");

-- CreateIndex
CREATE INDEX "Promotion_effectiveDate_expiredDate_idx" ON "Promotion"("effectiveDate", "expiredDate");

-- CreateIndex
CREATE INDEX "PromotionCourse_promotionId_idx" ON "PromotionCourse"("promotionId");

-- CreateIndex
CREATE INDEX "PromotionCourse_courseId_idx" ON "PromotionCourse"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "PromotionCourse_promotionId_courseId_key" ON "PromotionCourse"("promotionId", "courseId");

-- CreateIndex
CREATE INDEX "PromotionCampus_promotionId_idx" ON "PromotionCampus"("promotionId");

-- CreateIndex
CREATE UNIQUE INDEX "PromotionCampus_promotionId_campusId_key" ON "PromotionCampus"("promotionId", "campusId");

-- CreateIndex
CREATE UNIQUE INDEX "PromotionDocument_promotionId_key" ON "PromotionDocument"("promotionId");

-- CreateIndex
CREATE INDEX "PromotionDocument_promotionId_idx" ON "PromotionDocument"("promotionId");

-- CreateIndex
CREATE INDEX "AgencyCommissionAgreement_tenantId_agencyId_status_idx" ON "AgencyCommissionAgreement"("tenantId", "agencyId", "status");

-- CreateIndex
CREATE INDEX "AgencyCommissionAgreement_effectiveStart_effectiveEnd_idx" ON "AgencyCommissionAgreement"("effectiveStart", "effectiveEnd");

-- CreateIndex
CREATE INDEX "AgencyCommissionAgreement_schoolId_idx" ON "AgencyCommissionAgreement"("schoolId");

-- CreateIndex
CREATE UNIQUE INDEX "AgencyCommissionAgreement_tenantId_agencyId_schoolId_effect_key" ON "AgencyCommissionAgreement"("tenantId", "agencyId", "schoolId", "effectiveStart");

-- CreateIndex
CREATE INDEX "CommissionRule_agreementId_idx" ON "CommissionRule"("agreementId");

-- CreateIndex
CREATE INDEX "CommissionRule_courseId_idx" ON "CommissionRule"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "CommissionRule_agreementId_courseId_campusId_key" ON "CommissionRule"("agreementId", "courseId", "campusId");

-- CreateIndex
CREATE INDEX "Student_tenantId_idx" ON "Student"("tenantId");

-- CreateIndex
CREATE INDEX "Student_consentGiven_idx" ON "Student"("consentGiven");

-- CreateIndex
CREATE UNIQUE INDEX "StudentConsent_studentId_purpose_key" ON "StudentConsent"("studentId", "purpose");

-- CreateIndex
CREATE INDEX "Lead_tenantId_status_idx" ON "Lead"("tenantId", "status");

-- CreateIndex
CREATE INDEX "Lead_studentId_idx" ON "Lead"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Lead_tenantId_studentId_key" ON "Lead"("tenantId", "studentId");

-- CreateIndex
CREATE INDEX "Application_tenantId_status_idx" ON "Application"("tenantId", "status");

-- CreateIndex
CREATE INDEX "Application_courseId_intakeId_idx" ON "Application"("courseId", "intakeId");

-- CreateIndex
CREATE INDEX "Application_studentId_idx" ON "Application"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Application_tenantId_studentId_courseId_key" ON "Application"("tenantId", "studentId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Quote_quoteRef_key" ON "Quote"("quoteRef");

-- CreateIndex
CREATE UNIQUE INDEX "Quote_pricingSnapshotId_key" ON "Quote"("pricingSnapshotId");

-- CreateIndex
CREATE INDEX "Quote_tenantId_status_idx" ON "Quote"("tenantId", "status");

-- CreateIndex
CREATE INDEX "Quote_agencyId_idx" ON "Quote"("agencyId");

-- CreateIndex
CREATE INDEX "Quote_studentId_idx" ON "Quote"("studentId");

-- CreateIndex
CREATE INDEX "Quote_validUntil_idx" ON "Quote"("validUntil");

-- CreateIndex
CREATE UNIQUE INDEX "QuoteItem_quoteId_description_key" ON "QuoteItem"("quoteId", "description");

-- CreateIndex
CREATE UNIQUE INDEX "QuotePricingSnapshot_quoteId_key" ON "QuotePricingSnapshot"("quoteId");

-- CreateIndex
CREATE INDEX "QuotePricingSnapshot_quoteId_idx" ON "QuotePricingSnapshot"("quoteId");

-- CreateIndex
CREATE UNIQUE INDEX "QuotePricingSnapshot_quoteId_version_key" ON "QuotePricingSnapshot"("quoteId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "Document_storageKey_key" ON "Document"("storageKey");

-- CreateIndex
CREATE INDEX "Document_tenantId_idx" ON "Document"("tenantId");

-- CreateIndex
CREATE INDEX "Document_docType_status_idx" ON "Document"("docType", "status");

-- CreateIndex
CREATE INDEX "Document_expiresAt_idx" ON "Document"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "AgencySavedCourse_agencyId_key" ON "AgencySavedCourse"("agencyId");

-- CreateIndex
CREATE UNIQUE INDEX "AgencySavedCourse_schoolId_key" ON "AgencySavedCourse"("schoolId");

-- CreateIndex
CREATE INDEX "AgencySavedCourse_tenantId_agencyId_idx" ON "AgencySavedCourse"("tenantId", "agencyId");

-- CreateIndex
CREATE UNIQUE INDEX "AgencySavedCourse_tenantId_agencyId_schoolId_courseId_key" ON "AgencySavedCourse"("tenantId", "agencyId", "schoolId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolAgencyRelationship_schoolId_key" ON "SchoolAgencyRelationship"("schoolId");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolAgencyRelationship_agencyId_key" ON "SchoolAgencyRelationship"("agencyId");

-- CreateIndex
CREATE INDEX "SchoolAgencyRelationship_schoolId_idx" ON "SchoolAgencyRelationship"("schoolId");

-- CreateIndex
CREATE INDEX "SchoolAgencyRelationship_agencyId_idx" ON "SchoolAgencyRelationship"("agencyId");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolAgencyRelationship_schoolId_agencyId_key" ON "SchoolAgencyRelationship"("schoolId", "agencyId");

-- CreateIndex
CREATE INDEX "Notification_tenantId_userId_read_idx" ON "Notification"("tenantId", "userId", "read");

-- CreateIndex
CREATE INDEX "AuditLog_tenantId_action_idx" ON "AuditLog"("tenantId", "action");

-- CreateIndex
CREATE INDEX "AuditLog_tenantId_createdAt_idx" ON "AuditLog"("tenantId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_entityType_entityId_idx" ON "AuditLog"("entityType", "entityId");

-- CreateIndex
CREATE UNIQUE INDEX "AgencyCommissionRelationship_agencyId_key" ON "AgencyCommissionRelationship"("agencyId");

-- CreateIndex
CREATE UNIQUE INDEX "AgencyCommissionRelationship_schoolId_key" ON "AgencyCommissionRelationship"("schoolId");

-- CreateIndex
CREATE UNIQUE INDEX "AgencyCommissionRelationship_agencyId_schoolId_key" ON "AgencyCommissionRelationship"("agencyId", "schoolId");

-- CreateIndex
CREATE INDEX "_quoteAgreements_B_index" ON "_quoteAgreements"("B");

-- CreateIndex
CREATE INDEX "_documentApplications_B_index" ON "_documentApplications"("B");

-- CreateIndex
CREATE INDEX "_documentQuotes_B_index" ON "_documentQuotes"("B");

-- CreateIndex
CREATE INDEX "_documentStudents_B_index" ON "_documentStudents"("B");

-- AddForeignKey
ALTER TABLE "TenantMembership" ADD CONSTRAINT "TenantMembership_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenantMembership" ADD CONSTRAINT "TenantMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenantSubscription" ADD CONSTRAINT "TenantSubscription_tenant_subscription_tenant_id_fkey" FOREIGN KEY ("tenant_subscription_tenant_id") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatformSetting" ADD CONSTRAINT "PlatformSetting_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolProfile" ADD CONSTRAINT "SchoolProfile_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyProfile" ADD CONSTRAINT "AgencyProfile_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyContact" ADD CONSTRAINT "AgencyContact_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "AgencyProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderRegistration" ADD CONSTRAINT "ProviderRegistration_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "SchoolProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campus" ADD CONSTRAINT "Campus_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "SchoolProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "SchoolProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseCampus" ADD CONSTRAINT "CourseCampus_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseCampus" ADD CONSTRAINT "CourseCampus_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "Campus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseIntake" ADD CONSTRAINT "CourseIntake_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseFee" ADD CONSTRAINT "CourseFee_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseFee" ADD CONSTRAINT "CourseFee_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "Campus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PricingHistory" ADD CONSTRAINT "PricingHistory_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionCourse" ADD CONSTRAINT "PromotionCourse_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionCourse" ADD CONSTRAINT "PromotionCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionCampus" ADD CONSTRAINT "PromotionCampus_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionCampus" ADD CONSTRAINT "PromotionCampus_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "Campus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionDocument" ADD CONSTRAINT "PromotionDocument_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionDocument" ADD CONSTRAINT "PromotionDocument_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyCommissionAgreement" ADD CONSTRAINT "AgencyCommissionAgreement_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyCommissionAgreement" ADD CONSTRAINT "AgencyCommissionAgreement_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "AgencyProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyCommissionAgreement" ADD CONSTRAINT "AgencyCommissionAgreement_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "SchoolProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyCommissionAgreement" ADD CONSTRAINT "AgencyCommissionAgreement_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionRule" ADD CONSTRAINT "CommissionRule_agreementId_fkey" FOREIGN KEY ("agreementId") REFERENCES "AgencyCommissionAgreement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionRule" ADD CONSTRAINT "CommissionRule_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionRule" ADD CONSTRAINT "CommissionRule_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "Campus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentConsent" ADD CONSTRAINT "StudentConsent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "AgencyProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_intakeId_fkey" FOREIGN KEY ("intakeId") REFERENCES "CourseIntake"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "AgencyProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "SchoolProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "Campus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_intakeId_fkey" FOREIGN KEY ("intakeId") REFERENCES "CourseIntake"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteItem" ADD CONSTRAINT "QuoteItem_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuotePricingSnapshot" ADD CONSTRAINT "QuotePricingSnapshot_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "SchoolProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "Campus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencySavedCourse" ADD CONSTRAINT "AgencySavedCourse_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencySavedCourse" ADD CONSTRAINT "AgencySavedCourse_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "AgencyProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencySavedCourse" ADD CONSTRAINT "AgencySavedCourse_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "SchoolProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencySavedCourse" ADD CONSTRAINT "AgencySavedCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolAgencyRelationship" ADD CONSTRAINT "SchoolAgencyRelationship_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "SchoolProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolAgencyRelationship" ADD CONSTRAINT "SchoolAgencyRelationship_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "AgencyProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolAgencyRelationship" ADD CONSTRAINT "SchoolAgencyRelationship_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyCommissionRelationship" ADD CONSTRAINT "AgencyCommissionRelationship_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "AgencyProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyCommissionRelationship" ADD CONSTRAINT "AgencyCommissionRelationship_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "SchoolProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_quoteAgreements" ADD CONSTRAINT "_quoteAgreements_A_fkey" FOREIGN KEY ("A") REFERENCES "AgencyCommissionAgreement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_quoteAgreements" ADD CONSTRAINT "_quoteAgreements_B_fkey" FOREIGN KEY ("B") REFERENCES "Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_documentApplications" ADD CONSTRAINT "_documentApplications_A_fkey" FOREIGN KEY ("A") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_documentApplications" ADD CONSTRAINT "_documentApplications_B_fkey" FOREIGN KEY ("B") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_documentQuotes" ADD CONSTRAINT "_documentQuotes_A_fkey" FOREIGN KEY ("A") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_documentQuotes" ADD CONSTRAINT "_documentQuotes_B_fkey" FOREIGN KEY ("B") REFERENCES "Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_documentStudents" ADD CONSTRAINT "_documentStudents_A_fkey" FOREIGN KEY ("A") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_documentStudents" ADD CONSTRAINT "_documentStudents_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
