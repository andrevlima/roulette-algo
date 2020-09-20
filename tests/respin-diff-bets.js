import { Roulette, Chip } from '../roulette-algo';
import * as Assert from 'assert';

describe('Multiple spins in same roulette instance', function () {
    const roulette = new Roulette();
    it('Should bet with correct amount 5', function () {
        roulette.putOn.rightHalf(new Chip(5));
        var result = roulette.spin();
        Assert.equal(result.spent, 5);
    })
    it('Should spin without bets', function () {
        var result = roulette.spin();
        Assert.equal(result.spent, 0);
    })
    it('Should bet with correct amount 3', function () {    
        roulette.putOn.reds(new Chip(2));
        roulette.putOn.reds(new Chip(1));
        var result = roulette.spin();
        Assert.equal(result.spent, 3);
    })
})