export function getParsedLastfmDate(parameters): string {
    console.log(parameters);
    const parseDate = (date: Date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return `from=${parseDate(parameters.from)}&to=${parseDate(parameters.to)}`;
}