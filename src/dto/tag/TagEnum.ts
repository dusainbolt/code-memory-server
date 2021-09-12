import { registerEnumType } from '@nestjs/graphql';

export enum TagStatus {
  HIDE,
  ACTIVE,
}

export enum TagType {
  SYSTEM,
  ADDITION,
}

registerEnumType(TagStatus, {
  name: 'TagStatus',
  description: 'The TagStatus.',
});

registerEnumType(TagType, {
  name: 'TagType',
  description: 'The TagType.',
});
