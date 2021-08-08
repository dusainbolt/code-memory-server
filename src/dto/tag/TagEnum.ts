import { registerEnumType } from '@nestjs/graphql';

export enum TagStatus {
  HIDE,
  ACTIVE,
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

export enum TagType {
  SYSTEM,
  ADDITION,
}

registerEnumType(TagType, {
  name: 'TagType',
  description: 'The TagType.',
  valuesMap: {
    SYSTEM: {
      deprecationReason: 'This is tag system note special in blog',
    },
    ADDITION: {
      deprecationReason: 'This is tag addition',
    },
  },
});
