import { Body, Controller, Headers, Post } from '@nestjs/common';
import { GenerateReportCardsDto, GenerateTimetableDto, QueueReminderDto } from './dto/automation-job.dto';
import { AutomationService } from './automation.service';

@Controller('automation')
export class AutomationController {
  constructor(private readonly automationService: AutomationService) {}

  @Post('reminders')
  queueReminder(@Body() dto: QueueReminderDto, @Headers('x-membership-id') actorMembershipId = 'system') {
    return this.automationService.queueReminder(dto, actorMembershipId);
  }

  @Post('timetable')
  generateTimetable(@Body() dto: GenerateTimetableDto, @Headers('x-membership-id') actorMembershipId = 'system') {
    return this.automationService.generateTimetable(dto, actorMembershipId);
  }

  @Post('report-cards')
  generateReportCards(@Body() dto: GenerateReportCardsDto, @Headers('x-membership-id') actorMembershipId = 'system') {
    return this.automationService.generateReportCards(dto, actorMembershipId);
  }
}
