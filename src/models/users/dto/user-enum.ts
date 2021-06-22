import { registerEnumType } from '@nestjs/graphql';

export enum Role {
    USER,
    ADMIN,
}

registerEnumType(Role, {
    name: 'Role',
    description: 'The role of user',
    valuesMap: {
        USER: {
            deprecationReason: 'This is user',
        },
        ADMIN: {
            deprecationReason: 'This is admin',
        },
    },
});

export enum UserStatus {
    ACTIVE,
    INACTIVE,
    PAUSE,
    BLOCK,
}

registerEnumType(UserStatus, {
    name: 'UserStatus',
    description: 'The status of user',
    valuesMap: {
        ACTIVE: {
            deprecationReason: 'This is active',
        },
        INACTIVE: {
            deprecationReason: 'This is inactive',
        },
        PAUSE: {
            deprecationReason: 'This is pause',
        },
        BLOCK: {
            deprecationReason: 'This is block',
        },
    },
});

export enum Gender {
    MALE,
    FEMALE,
    OTHER,
}

registerEnumType(Gender, {
    name: 'Gender',
    description: 'The gender of user',
    valuesMap: {
        MALE: {
            deprecationReason: 'This is male',
        },
        FEMALE: {
            deprecationReason: 'This is female',
        },
        OTHER: {
            deprecationReason: 'This is ...',
        },
    },
});
