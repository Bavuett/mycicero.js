function getUnixDate(source: string): number {
    const unixDate: number = parseInt(source.replace('/Date(', '').replace(')/', ''));
    return unixDate;
}

export default getUnixDate;