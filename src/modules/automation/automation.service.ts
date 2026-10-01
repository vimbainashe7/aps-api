import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { QUEUES } from '../../infrastructure/queue/queue.constants';
import { GenerateReportCardsDto, GenerateTimetableDto, QueueReminderDto } from './dto/automation-job.dto';

type QueuedAutomationJob = {
  jobId: string;
  queue: string;
  status: 'queued';
  payload: Record<string, unknown>;
};

@Injectable()
export class AutomationService {
  queueReminder(dto: QueueReminderDto, actorMembershipId: string): QueuedAutomationJob {
    return this.createJob(QUEUES.notifications, { ...dto, actorMembershipId });
  }

  generateTimetable(dto: GenerateTimetableDto, actorMembershipId: string): QueuedAutomationJob {
    return this.createJob('aps-timetable-generator', { ...dto, actorMembershipId });
  }

  generateReportCards(dto: GenerateReportCardsDto, actorMembershipId: string): QueuedAutomationJob {
    return this.createJob(QUEUES.samsPdfReports, { ...dto, actorMembershipId });
  }

  private createJob(queue: string, payload: Record<string, unknown>): QueuedAutomationJob {
    return {
      jobId: randomUUID(),
      queue,
      status: 'queued',
      payload
    };
  }
}
