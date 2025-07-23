import equal from 'fast-deep-equal';

export const isEqual = <T1, T2>(obj1: T1, obj2: T2): boolean => {
    if (typeof obj1 !== 'object' && typeof obj2 !== 'object') {
        return (obj1 as string) === (obj2 as string);
    }

    return equal(obj1, obj2);
};
