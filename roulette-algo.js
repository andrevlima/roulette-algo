/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Roulette {
    constructor() {
        this.bets = [];
        this._lastBets = [];

        const getBetsMap = () => {
            const betsMap = {};
            this.bets.forEach((bet) => {
                bet.positions.forEach((pos) => {
                    const { odds,chip } = bet;
                    betsMap[pos] = betsMap[pos] || [];
                    betsMap[pos].push({
                        odds, chip
                    });
                });
            })
            return betsMap;
        }

        const insertBet = (positions, chip) => {
            const odds = 36 / positions.length;
            this.bets.push({ chip, odds, positions });
        }

        this.getBets = (position) => {
            return getBetsMap()[position] || [];
        }

        this.putOn = {
            quarter: (chip, n1, n2, n3, n4) => {
                insertBet([n1, n2, n3, n4], chip);
            },
            double: (chip, n1, n2) => {
                insertBet([n1, n2], chip);
            },
            single: (chip, n) => {
                insertBet([n], chip);
            },
            zero: (chip) => {
                insertBet([0], chip);
            },
            reds: (chip) => {
                insertBet([1, 3, 5, 7, 9, 12,
                    14, 16, 18, 19, 21, 23,
                    25, 27, 30, 32, 34, 36], chip);
            },
            blacks: (chip) => {
                insertBet([2, 4, 6, 8, 10, 11,
                    13, 15, 17, 20, 22, 24,
                    26, 28, 29, 31, 33, 35], chip);
            },
            firstTwelve: (chip) => {
                insertBet([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], chip)
            },
            secondTwelve: (chip) => {
                insertBet([13, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], chip)
            },
            thirdTwelve: (chip) => {
                insertBet([25, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36], chip)
            },
            firstLine: (chip) => {
                insertBet([1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34], chip)
            },
            secondLine: (chip) => {
                insertBet([2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35], chip)
            },
            thirdLine: (chip) => {
                insertBet([3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36], chip)
            },
            leftHalf: (chip) => {
                insertBet([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], chip)
            },
            rightHalf: (chip) => {
                insertBet([19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36], chip)
            },
            even: (chip) => {
                insertBet([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36], chip)
            },
            odd: (chip) => {
                insertBet([1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35], chip)
            }
        }
    }

    getAllBets() {
        return this.bets;
    }

    cleanBets() {
        this._lastBets = this.bets;
        this.bets = [];
    }

    lastBetsMade() {
        this._lastBets;
    }

    redoLastBets() {
        this.bets = this._lastBets;
    }

    doubleBets() {
        const originalBets = [...this.bets];
        originalBets.forEach((bet) => {
            this.bets.push(Object.assign({}, bet));
        });
    }

    spin() {
        const number = getRandomInt(0, 36);
        const wonBets = this.getBets(number);
        const betsMade = this.getAllBets();
        const spent = betsMade.reduce((curr, bet) => {
            return curr + bet.chip.value;
        }, 0);
        const gain = wonBets.reduce((curr, bet) => {
            return curr + bet.chip.value * bet.odds;
        }, 0);
        const total = gain - spent;
        const totalSign = total > 0 ? '+' : total > 0 ? '-' : '';

        console.log(`Lucky number is: ${number}`);
        console.log(`Chips Bet: ${betsMade.length}`);
        console.log(`\tSpent: ${spent}`);
        console.log(`\tReceived: ${gain}`);
        console.log(`\tBalance: ${totalSign}${total}`);

        this.cleanBets();

        return {
            number, wonBets, betsMade, spent, gain, total,
            received: gain,
            balance: total,
            hasLost: total < 0,
            hasWon: total > 0,
            hasDraw: total == 0,
        }
    }
}

class Chip {
    constructor(value) {
        this.value = value;
    }
}

exports.Roulette = Roulette;
exports.Chip = Chip;