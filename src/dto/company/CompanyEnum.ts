import { registerEnumType } from '@nestjs/graphql';

export enum CompanyStatus {
  ACTIVE,
  INACTIVE,
}

registerEnumType(CompanyStatus, {
  name: 'CompanyStatus',
  description: 'The CompanyStatus.',
});

export enum CompanyType {
  UNIVERSITY,
  COMPANY,
  CERTIFICATE,
}


registerEnumType(CompanyType, {
  name: 'CompanyType',
  description: 'The CompanyType.',
});
