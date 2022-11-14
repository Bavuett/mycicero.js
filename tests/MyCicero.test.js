const { MyCicero } = require('../dist/index');
let myCicero;

const date = new Date();

beforeEach(() => {
    myCicero = new MyCicero();
});

describe('MyCicero class creation', () => {
    it('should create a MyCicero instance', () => {
        expect(myCicero).toBeInstanceOf(MyCicero);
    });
});

describe('MyCicero class methods', () => {
    it('getSolutions() should resolve without errors', async () => {
        expect(await myCicero.getSolutions({
            departureLocation: {
                lat: 48.856614,
                lon: 2.3522219,
            },
            arrivalLocation: {
                lat: 48.856614,
                lon: 2.3522219,
            },
        }, {
            departureDate: date,
        })).resolves;
    });
});