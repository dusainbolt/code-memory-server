import { registerEnumType } from '@nestjs/graphql';

export enum WorkStatus {
  ACTIVE,
  INACTIVE,
}

registerEnumType(WorkStatus, {
  name: 'WorkStatus',
  description: 'The WorkStatus.',
});

export enum WorkType {
  LEARN,
  WORK,
  CERTIFICATE,
}


registerEnumType(WorkType, {
  name: 'WorkType',
  description: 'The WorkType.',
});
