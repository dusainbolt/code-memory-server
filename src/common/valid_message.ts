import { ValidationArguments } from 'class-validator';

export const ERROR_VALIDATE = 'CM_ERROR';

export const ERROR_CODE_HASH = 'CM_ERROR_401';

export const lengthMessage = (args: ValidationArguments) => {
    return `${ERROR_VALIDATE}_1,${args.constraints[0]},${args.constraints[1]},${args.property}, ${args.value}`;
};