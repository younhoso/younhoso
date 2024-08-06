export const snakeToCamel = (str: string) => str.replace(/(_\w)/g, k => k[1].toUpperCase());
