# Roulette Algorithm

Full algorithmn of european roulette.

First of all import `/roulette-algo.js` to your module and then instanciate a new `Roulette`:

```js
import { Roulette, Chip } from 'roulette-algo';

const roulette = new Roulette();
```
### Betting
All possible bets are on `putOn` object provided in roulette instance, take the example:

```js
roulette.putOn.reds(new Chip(1)); // Puts chip 1 on reds
roulette.putOn.zero(new Chip(1)); // Puts chip 1 on zero
roulette.putOn.single(new Chip(10), 15); // Puts a chip 10 on number 15
roulette.putOn.rightHalf(new Chip(2), 15); // Puts a chip 2 on numbers 19-36
roulette.putOn.firstTwelve(new Chip(2), 15); // Puts a chip 2 on numbers 1-12 (1st dozen)
roulette.putOn.double(new Chip(2), 1, 2); // Puts a chip 2 on middle of 1 and 2
roulette.putOn.quarter(new Chip(10), 17, 20, 16, 19); // Puts a chip 10 on middle of 17, 20, 16 and 19

// and so on...
```
### Spin 
Finally, you just need to `spin()` the roulette and get the results:

```js
const results = roulette.spin();
```

Results is an object returned by the roulette with all results of the "round":

```js
results.number // Roulette drawn number
results.spent; // Amount of chips spent
results.received; // All chips received includes the ones you bet
results.balance; // received - spent (Can be negative)
results.hasWon // Boolean, if balance is positive
results.hasLost // Boolean, if balance is negative
results.hasDraw // Boolean, if balance is zero
results.wonBets // List of won bets made
```

More than this, the roulette also provide extra features such as the possibility to redo the last bets and double the current ones.

### Redo Last Bets

Copies the last bets of the last spin you did:
```js
roulette.redoLastBets();
```

### Double

Doubles the current bets:
```js
roulette.redoLastBets();
```


## Tests

All tests are under folder `/tests`, every test instanciate a `Roulette` and run tests over this.
Tests are integrated with Mocha. 

Don't forget to install modules needed first:
```bash
npm i
```
To run tests use
```bash
npm test
```


## Compatibily

All the code is made using ECMAScript 6+, if you intend to run it on older versions you may need transpiler like Babel 


## Next Objectives

- Include all JS Docs
- Run tests automatically
- Include out-of-box retro compactibilty with Babel
- Bets by player with full distinction 
