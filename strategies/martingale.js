import { Chip, Roulette } from '../roulette-algo';



class BalanceError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
const user = (() => {
    let balance = 45;

    const checkBalance = (chips) => {
        if (balance - chips < 0) throw new BalanceError(`No sufficient funds, current balance: ${balance}, needed: ${chips}`);
        return true;
    }

    return {
        withdraw(weight) {
            checkBalance(weight);
            balance -= weight;
        },
        getChip(weight) {
            checkBalance(weight);
            balance -= weight;
            return new Chip(weight);
        },
        updateBalance(weight) {
            return balance += weight;
        },
        log() {
            console.log(`------------------------`)
            console.log(`User Balance: ${balance}`)
            console.log(`------------------------`)
        }
    }
})();

const roulette = new Roulette();

let martingaleLevel = 0;
while (true) {
    console.log("\n");

    try {
        if(martingaleLevel > 0) {
            console.log(`[On martingale x${martingaleLevel}]`)
            roulette.redoLastBets();
            roulette.doubleBets();
            const totalNeeded = roulette.getAllBets().reduce((curr, bet) => {
                return curr + bet.chip.value * bet.odds;
            }, 0);
            user.withdraw(totalNeeded);
        } else {
            roulette.putOn.rightHalf(user.getChip(5));
        }
    } catch (ex) {
        if (ex instanceof BalanceError) {
            console.log(ex.message);
            break;
        }
    }

    roulette.spin();
    roulette.logResults();
    user.updateBalance(roulette.results().received);
    user.log();


    if(roulette.results().hasLost) {
        martingaleLevel++;
    } else if(roulette.results().hasWon){
        martingaleLevel = 0;
    }

}