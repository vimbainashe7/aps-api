import { IsISO8601, IsIn, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class QueueReminderDto {
  @IsUUID()
  schoolId!: string;

  @IsString()
  @MinLength(3)
  title!: string;

  @IsString()
  @MinLength(3)
  body!: string;

  @IsIn(['school', 'class', 'guardian', 'student'])
  audience!: 'school' | 'class' | 'guardian' | 'student';

  @IsOptional()
  @IsUUID()
  classId?: string;

  @IsOptional()
  @IsISO8601()
  scheduledFor?: string;
}

export class GenerateTimetableDto {
  @IsUUID()
  schoolId!: string;

  @IsString()
  @MinLength(3)
  academicTerm!: string;
}

export class GenerateReportCardsDto {
  @IsUUID()
  schoolId!: string;

  @IsString()
  @MinLength(3)
  reportingWindow!: string;
}
