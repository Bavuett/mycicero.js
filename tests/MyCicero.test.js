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