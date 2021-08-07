import { registerEnumType } from '@nestjs/graphql';

export enum TagStatus {
  ACTIVE,
  HIDE,
}

registerEnumType(TagStatus, {
  name: 'TagStatus',
  description: 'The TagStatus.',
  valuesMap: {
    ACTIVE: {
      deprecationReason: 'This is type of tag show',
    },
    HIDE: {
      deprecationReason: 'This is type of tag hide',
    },
  },
});
