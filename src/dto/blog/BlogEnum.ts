import { registerEnumType } from '@nestjs/graphql';

export enum BlogContentType {
  CODE,
  EDITOR,
  IMAGE,
  IFRAME,
}

registerEnumType(BlogContentType, {
  name: 'BlogContentType',
  description: 'The BlogContentType.',
});
