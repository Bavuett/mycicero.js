const { MyCicero } = require('../dist/index');
let myCicero;

beforeEach(() => {
    myCicero = new MyCicero();
});

describe('MyCicero class creation', () => {
    test('should create a MyCicero instance', () => {
        expect(myCicero).toBeInstanceOf(MyCicero);
    });
});

describe('MyCicero class methods', () => {
    test('getSolutions() should resolve without errors', () => {
        myCicero.getSolutions({
            locations: {
                departure: {
                    lat: 42.4477,
                    lon: 14.2080,
                },
                arrival: {
                    lat: 42.4738,
                    lon: 14.1925,
                },
            }, 
            dates: {
                departure: new Date(),
            }
        }).resolves;
    });

    test('getNearestStops() should resolve without errors', () => {
        myCicero.getNearestStops({
            location: {
                lat: 42.4477,
                lon: 14.2080,
            }
        }).resolves;
    });
});

describe('MyCicero class methods with wrong parameters', () => {
    test('getSolutions() with wrong mean of transport should fail', () => {
        myCicero.getSolutions({
            locations: {
                departure: {
                    lat: 42.4477,
                    lon: 14.2080,
                },
                arrival: {
                    lat: 42.4738,
                    lon: 14.1925,
                },
            }, 
            dates: {
                departure: new Date(),
            },
            meanOfTransport: 'anythingButTheRightValue',
        }).catch((error) => {
            expect(error).toBeInstanceOf(Error);
        });
    });

    test('getSolutions() with wrong or missing location should fail', () => {
        myCicero.getSolutions({
            location: {
                departure: {
                    lat: 42.4477,
                },
            },
            dates: {
                departure: new Date(),
            }
        }).catch((error) => {
            expect(error).toBeInstanceOf(Error);
        });
    });

    test("getSolutions() doesn't allow time paradoxes" , () => {
        myCicero.getSolutions({
            locations: {
                departure: {
                    lat: 42.4477,
                    lon: 14.2080,
                },
                arrival: {
                    lat: 42.4738,
                    lon: 14.1925,
                },
            }, 
            dates: {
                departure: new Date(166982450000),
                arrival: new Date(1669824492)
            }
        }).catch((error) => {
            expect(error).toBeInstanceOf(Error);
        });
    });

    test('getNearestStops() with wrong or missing location should fail', () => {
        myCicero.getNearestStops({
            location: {
                lat: 42.4477,
            },
        }).catch((error) => {
            expect(error).toBeInstanceOf(Error);
        });
    });
});