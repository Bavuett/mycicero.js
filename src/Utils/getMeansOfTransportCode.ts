function getMeansOfTransportCode(meanOfTransport: string): number {
    switch (meanOfTransport) {
        case 'train': {
            return 1;
        }
        default: {
            return 0;
        }
    }
}

export default getMeansOfTransportCode;