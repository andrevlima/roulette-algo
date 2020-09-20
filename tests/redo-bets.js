import { Roulette, Chip } from '../roulette-algo';
import * as Assert from 'assert';

const roulette = new Roulette();

roulette.putOn.rightHalf(new Chip(5));
roulette.spin();
roulette.redoLastBets();
var result = roulette.spin();
Assert.equal(result.spent, 5, "Wrong spent");