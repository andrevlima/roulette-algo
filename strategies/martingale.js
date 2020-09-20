import { Chip, Roulette } from '../roulette-algo';



class BalanceError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
const user = (() => {
    let balance = 5;

    const checkBalance = (chips) => {
        if (balance - chips < 0) throw new BalanceError(`No sufficient funds, current balance: ${balance}`);
        return true;
    }

    return {
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

while (true) {
    try {
        roulette.putOn.rightHalf(user.getChip(5));
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

}