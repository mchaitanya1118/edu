import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards';
import { MembershipService, CreateMembershipDto } from './memberships.service';

@Controller('tenants/:tenantId/memberships')
@UseGuards(JwtAuthGuard)
export class MembershipsController {
  constructor(private readonly service: MembershipService) {}

  @Get()
  async list(@Request() req: any) {
    const { tenantId } = req.params;
    return this.service.listByTenant(tenantId);
  }

  @Post()
  async create(@Request() req: any) {
    const { tenantId } = req.params;
    const { userId, role } = req.body as CreateMembershipDto;
    return this.service.create({ userId, role }, tenantId);
  }

  @Post(':membershipId/remove')
  async remove(@Request() req: any) {
    const { membershipId } = req.params;
    const { tenantId } = req.params;
    const target = await this.service.findById(membershipId);
    if (!target) throw new Error('membership not found');
    return this.service.remove(target.tenantId, target.userId);
  }
}
