import { Chip, Roulette } from '../roulette-algo';



class BalanceError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
const user = (() => {
    let balance = 1000;
    let higherBal = balance;

    const checkBalance = (chips) => {
        if (balance - chips < 0) throw new BalanceError(`No sufficient funds, current balance: ${balance}, needed: ${chips}`);
        return true;
    }

    return {
        withdraw(weight) {
            checkBalance(weight);
            balance -= weight;
        },
        balance() {
            return balance;
        },
        updateBalance(weight) {
            balance += weight;
            if(balance > higherBal) higherBal = balance;
        },
        log() {
            console.log(`------------------------`)
            console.log(`User Balance: ${balance}, Higher: ${higherBal}`)
            console.log(`------------------------`)
        }
    }
})();

const roulette = new Roulette();

let martingaleLevel = 0;
let direction = true;
while (true) {
    console.log("\n");

    const bet = () => {
        if(direction) {
            roulette.putOn.rightHalf(new Chip(1));
        } else {
            roulette.putOn.leftHalf(new Chip(1));
        }

        direction != direction;
    }

    try {
        if(martingaleLevel > 0) {
            console.log(`[On martingale x${martingaleLevel}]`)
            bet();
            
            for(let i = 0; i<martingaleLevel; i++) {
                roulette.doubleBets();
            }
            
            const totalNeeded = roulette.getAllBets().reduce((curr, bet) => {
                return curr + bet.chip.value;
            }, 0);
            user.withdraw(totalNeeded);
        } else {
            bet();
            user.withdraw(1);
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