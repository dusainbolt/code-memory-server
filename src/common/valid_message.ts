import { ValidationArguments } from 'class-validator';

export const ERROR_VALIDATE = 'CM_ERROR';

export const ERROR_CODE_HASH = 'CM_ERROR_401';

export const PREFIX_CODE_SYSTEM = 'MSG';

export const lengthMessage = (args: ValidationArguments) => {
  return `${ERROR_VALIDATE}_1,${args.constraints[0]},${args.constraints[1]},${args.property}, ${args.value}`;
};

export const MSG_SYSTEM = {
  MSG_LOGIN_ERROR: `${PREFIX_CODE_SYSTEM}_2`,
  TAG_NOT_ALLOW_TYPE: `${PREFIX_CODE_SYSTEM}_3`,
  UPDATE_NOT_DIFF: `${PREFIX_CODE_SYSTEM}_4`,
  ADD_SKILL_NOT_DIFF: `${PREFIX_CODE_SYSTEM}_5`,
};
