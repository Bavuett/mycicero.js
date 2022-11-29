function getScopes(meanOfTransport: string): number {
    switch (meanOfTransport) {
        case 'underground': {
            return 0;
        }
        case 'train': {
            return 1;
        }
        case 'bus': {
            return 0;
        }
        default: {
            return 0;
        }
    }
}

export default getScopes;