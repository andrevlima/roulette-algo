import { Roulette, Chip } from './roulette-algo';

const roulette = new Roulette();

let balance = 5000;
let martingale = 0;
let apostas = 0;
let higherBalance = balance;
let jogada = 0;

while(true) {
    apostas++;

    if(balance > higherBalance) {
        jogada = apostas - 1; 
        higherBalance = balance;
    } 

    
    if(martingale >= 1) {
        roulette.putOn.rightHalf(new Chip( 5 * (martingale+2)));
        // roulette.putOn.reds(new Chip( 3 * (martingale+2) ));
        // roulette.putOn.even(new Chip(1 * (martingale+2)));
    } else {
        roulette.putOn.rightHalf(new Chip(5));
        // roulette.putOn.reds(new Chip(3));
        // roulette.putOn.even(new Chip(1));
    }

    
    console.log(`|== ${apostas} ====================|`)
    const result = roulette.spin();
    balance += result.total;
    console.log(`---------------------------`)
    if(martingale > 0) console.log(`Martingale Level: ${martingale}`);
    console.log(`Player Balance: ${balance}`);
    console.log(`---------------------------`)

    if(result.hasLost) {
       martingale++;
    } else if(result.hasWon) {
        martingale = 0;
    }

    console.log(`Higher Balance: ${higherBalance} - Jogada: ${jogada}`);

    
    if(result.spent * 2 > balance) {
        break;
    }
}

console.log(">> THE END >>>>>>>>>>>>>>>>");
