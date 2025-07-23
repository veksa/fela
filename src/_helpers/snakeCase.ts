const re = /([0-9]+|([A-Z][a-z]+)|[a-z]+|([A-Z]+)(?![a-z]))/g;

export const snakeCase = (str: string) => {
    return (String(str ?? '').match(re) || [] as string[]).map(x => x.toLowerCase()).join('_');
};
