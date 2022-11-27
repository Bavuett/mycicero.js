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
                    lat: 41.90249000000006,
                    lon: 12.496060000000057,
                },
                arrival: {
                    lat: 42.44785999527568,
                    lon: 14.208839989364549,
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