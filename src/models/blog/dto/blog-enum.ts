import { registerEnumType } from '@nestjs/graphql';

export enum BlogContentType {
  CODE,
  NORMAL,
}

registerEnumType(BlogContentType, {
  name: 'BlogContentType',
  description: 'The BlogContentType.',
  valuesMap: {
    CODE: {
      deprecationReason: 'This is type of content code',
    },
    NORMAL: {
      deprecationReason: 'This is type of content normal html normal',
    },
  },
});
