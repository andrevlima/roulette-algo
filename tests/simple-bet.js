import { Roulette, Chip } from '../roulette-algo';
import * as Assert from 'assert';

describe('Simple Bet', function () {
    it('Should bet with correct amounts', function () {
        const roulette = new Roulette();

        roulette.putOn.rightHalf(new Chip(5));
        roulette.putOn.rightHalf(new Chip(2));
        const result = roulette.spin();
        Assert.equal(result.spent, 7);
    })
});