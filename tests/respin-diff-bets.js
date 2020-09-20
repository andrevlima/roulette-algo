import { Roulette, Chip } from '../roulette-algo';
import * as Assert from 'assert';

const roulette = new Roulette();

roulette.putOn.rightHalf(new Chip(5));
var result = roulette.spin();
Assert.equal(result.spent, 5, "Wrong spent");
roulette.putOn.rightHalf(new Chip(2));
var result = roulette.spin();
Assert.equal(result.spent, 2, "Wrong spent");
