import { registerEnumType } from '@nestjs/graphql';

export enum ProjectStatus {
  ACTIVE,
  INACTIVE,
}

registerEnumType(ProjectStatus, {
  name: 'ProjectStatus',
  description: 'The ProjectStatus.',
});