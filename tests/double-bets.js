import { Roulette, Chip } from '../roulette-algo';
import * as Assert from 'assert';

const roulette = new Roulette();

roulette.putOn.rightHalf(new Chip(5));
roulette.doubleBets();
roulette.doubleBets();
roulette.doubleBets();

var result = roulette.spin();
Assert.equal(result.spent, 40, "Wrong spent");