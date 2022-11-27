function getMeansOfTransport(code: number): string {
    switch (code) {
        case 0: {
            return 'Underground';
        }
        case 1: {
            return 'Bus';
        }
        case 2: {
            return 'Train';
        }
        case 3: {
            return 'Bus';
        }
        case 15: {
            return 'Bus';
        }
        default: {
            return 'Unknown';
        }
    }
}

export default getMeansOfTransport;