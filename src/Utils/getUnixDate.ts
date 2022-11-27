function getUnixDate(string: string): number {
    const arrayToFetch = string.split(/[\(,\)]/);

    console.log('Got this value: ' + arrayToFetch[1]);
    return 0;
}

export default getUnixDate;