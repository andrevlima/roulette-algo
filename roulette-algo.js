const { rando } = require("@nastyox/rando.js")

function getRandomInt(min, max) {    
    return rando(min, max);
}

class Roulette {
    constructor() {
        this.bets = [];
        this._lastBets = [];
        this._lastResults = null;
        this._spinsCounter = 0;

        const getBetsMap = () => {
            const betsMap = {};
            this.bets.forEach((bet) => {
                bet.positions.forEach((pos) => {
                    const { odds, chip } = bet;
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
            /** 
             * @param {Chip} chip
             * @param n1 1st number to place chip
             * @param n2 2nd number to place chip
             * @param n3 3rd number to place chip
             * @param n4 4th number to place chip
             */
            quarter: (chip, n1, n2, n3, n4) => {
                insertBet([n1, n2, n3, n4], chip);
            },
            /** 
             * @param {Chip} chip
             * @param n1 1st number to place chip
             * @param n2 2nd number to place chip
             */
            double: (chip, n1, n2) => {
                insertBet([n1, n2], chip);
            },
            /** 
             * @param {Chip} chip
             * @param n number to place chip
             */
            single: (chip, n) => {
                insertBet([n], chip);
            },
            /** @param {Chip} chip */
            zero: (chip) => {
                insertBet([0], chip);
            },
            /** @param {Chip} chip */
            reds: (chip) => {
                insertBet([1, 3, 5, 7, 9, 12,
                    14, 16, 18, 19, 21, 23,
                    25, 27, 30, 32, 34, 36], chip);
            },
            /** @param {Chip} chip */
            blacks: (chip) => {
                insertBet([2, 4, 6, 8, 10, 11,
                    13, 15, 17, 20, 22, 24,
                    26, 28, 29, 31, 33, 35], chip);
            },
            /** @param {Chip} chip */
            firstTwelve: (chip) => {
                insertBet([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], chip)
            },
            /** @param {Chip} chip */
            secondTwelve: (chip) => {
                insertBet([13, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], chip)
            },
            /** @param {Chip} chip */
            thirdTwelve: (chip) => {
                insertBet([25, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36], chip)
            },
            /** @param {Chip} chip */
            firstLine: (chip) => {
                insertBet([1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34], chip)
            },
            /** @param {Chip} chip */
            secondLine: (chip) => {
                insertBet([2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35], chip)
            },
            /** @param {Chip} chip */
            thirdLine: (chip) => {
                insertBet([3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36], chip)
            },
            /** @param {Chip} chip */
            leftHalf: (chip) => {
                insertBet([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], chip)
            },
            /** @param {Chip} chip */
            rightHalf: (chip) => {
                insertBet([19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36], chip)
            },
            /** @param {Chip} chip */
            even: (chip) => {
                insertBet([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36], chip)
            },
            /** @param {Chip} chip */
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
        return Object.assign({}, this._lastBets);
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

    results() {
        return this._lastResults;
    }

    logResults() {
        const totalSign = this._lastResults.total > 0 ? '+' : this._lastResults.total > 0 ? '-' : '';

        console.log(`=== Spin: ${this._spinsCounter} ===========`);
        console.log(`Lucky number is: ${this._lastResults.number}`);
        console.log(`Chips Bet: ${this._lastResults.betsMade.length}`);
        console.log(`\tSpent: ${this._lastResults.spent}`);
        console.log(`\tReceived: ${this._lastResults.received}`);
        console.log(`\tBalance: ${totalSign}${this._lastResults.total}`);
    }

    spin() {
        this._spinsCounter++;
        const number = getRandomInt(0, 36);
        const wonBets = this.getBets(number);
        const betsMade = this.getAllBets();
        const spent = betsMade.reduce((curr, bet) => {
            return curr + bet.chip.value;
        }, 0);
        const received = wonBets.reduce((curr, bet) => {
            return curr + bet.chip.value * bet.odds;
        }, 0);
        const total = received - spent;

        let result = {
            number, wonBets, betsMade, spent, total, received,
            hasLost: total < 0,
            hasWon: total > 0,
            hasDraw: total == 0,
        }

        this._lastResults = result;

        this.cleanBets();

        return result;
    }

    spinsCounter() {
        return this._spinsCounter;
    }
}

class Chip {
    constructor(value) {
        this.value = value;
    }
}

exports.Roulette = Roulette;
exports.Chip = Chip;
