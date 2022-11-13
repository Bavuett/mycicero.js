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
    it('should run without errors', () => {
        expect(async () => await myCicero.getSolutions(date)).not.toThrowError();
    });
});