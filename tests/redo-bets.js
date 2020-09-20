import { Roulette, Chip } from '../roulette-algo';
import * as Assert from 'assert';


describe('Redo Bet', function () {
    it('Should have same bets as the last spin', function () {
        const roulette = new Roulette();

        roulette.putOn.rightHalf(new Chip(5));
        roulette.putOn.reds(new Chip(5));
        roulette.spin();

        roulette.redoLastBets();
        var result = roulette.spin();
        
        Assert.equal(result.spent, 10);
    })
})