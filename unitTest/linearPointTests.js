const calculateLinearPoint = require('../server/models/linearPoint');
const chai = require('chai');
const expect = chai.expect;

describe('calculateLinearPoint', () => {
    it('should return 6 when m=2, x=1, c=4', () => {
        const result = calculateLinearPoint(2, 1, 4);
        expect(result).to.equal(6);
    });

    it('should return 4 when m=2, x=0, c=4', () => {
        const result = calculateLinearPoint(2, 0, 4);
        expect(result).to.equal(4);
    });

    it('should return 2 when m=2, x=-1, c=4', () => {
        const result = calculateLinearPoint(2, -1, 4);
        expect(result).to.equal(2);
    });
});
