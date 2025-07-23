import {snakeCase} from './snakeCase';

export const normalizeStyleName = (funcName: string) => {
    return snakeCase(funcName?.replace('RuleFn', ''));
};
