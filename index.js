const btn = document.querySelector('#btn');
const number1 = document.querySelector('#number-1');
const number2 = document.querySelector('#number-2');
const number3 = document.querySelector('#number-3');
const win = document.querySelector('.win')
const lose = document.querySelector('.lose')
const balance = document.querySelector('.balance__sum');
const plus = document.querySelector('.plus')
const minus = document.querySelector('.minus')
const bet = document.querySelector('.bet');
const getMoney = document.querySelector('.button-farm');
const moneyFarm = document.querySelector('.money-farm');
const moneyLose = document.querySelector('.money-lose');

const statsWin = document.querySelector('.stats-win')
const statsLose = document.querySelector('.stats-lose')
const slot__fruit_1 = document.querySelector('.slot__fruit-1');
const slot__fruit_2 = document.querySelector('.slot__fruit-2');
const slot__fruit_3 = document.querySelector('.slot__fruit-3');

const lemon = './assets/lemon.png'
const cherry = './assets/cherry.png'
const meelon = './assets/meelon.png'
const purple = './assets/purple.png'
const strawberry = './assets/strawberry.png'

const arrFruits = [lemon, cherry, meelon, purple, strawberry];

let betAmount = bet.textContent;
let pressed = true;
let multiplayer = 0;
balance.textContent = 1000;

plus.addEventListener('click', () => {
    bet.textContent = Number(bet.textContent) + 100
    betAmount = Number(betAmount) + 100
    console.log(balance.textContent)
    console.log(bet.textContent)
    console.log(betAmount)
})
minus.addEventListener('click', () => {

    let decrement = Number(bet.textContent) - 100;

    if (decrement < 0) {
        bet.textContent = 0;
    } else {
        bet.textContent = Number(bet.textContent) - 100
        betAmount = Number(betAmount) - 100
    }


})

function soundSpin() {
    let audio = new Audio();
    audio.src = "./assets/slot-machine-press-spin-button.mp3";
    audio.autoplay = true;
    audio.volume = 0.35;
}
function soundGetMoney() {
    let audio = new Audio();
    audio.src = "./assets/getMoney.mp3";
    audio.autoplay = true;
    audio.volume = 0.15;
}
function soundWin() {
    let audio = new Audio();
    audio.src = "./assets/win.mp3";
    audio.autoplay = true;
    audio.volume = 0.35;
}
function soundRoulette() {
    let audio = new Audio();
    audio.src = "./assets/mechanical_analog_ticking.mp3";
    audio.autoplay = true;
    audio.volume = 0.30;
}
function soundLose() {
    let audio = new Audio();
    audio.src = "./assets/lose.mp3";
    audio.autoplay = true;
    audio.volume = 0.1;
}

btn.addEventListener('click', () => {
    if (betAmount > balance.textContent) {
        lose.textContent = 'Not enough balance!'
        lose.classList.remove('hidden')
    } else if (betAmount == 0) {
        lose.textContent = 'Bet should be atleast 100$!'
        lose.classList.remove('hidden')
    } else {
        btn.disabled = true;
        let first = 0;
        let second = 0;
        let third = 0;
        let i = 0;
        soundSpin();
        soundRoulette();
        plus.disabled = true;
        minus.disabled = true;
        const interval = () => {
            win.classList.add('hidden')
            lose.classList.add('hidden')
            console.log(pressed)
            if (pressed) {
                moneyLose.textContent = `-${betAmount}$`;
                moneyLose.classList.add('active')
                setTimeout(() => {
                    moneyLose.classList.remove('active')
                }, 250)
                balance.textContent = balance.textContent - betAmount;
                pressed = false;
                console.log(pressed)
                const inter = setInterval(() => {
                    if (i < 25) {
                        i++
                        first = Math.floor(Math.random() * 5);
                        second = Math.floor(Math.random() * 5);
                        third = Math.floor(Math.random() * 5);

                        slot__fruit_1.src = arrFruits[first]
                        slot__fruit_2.src = arrFruits[second]
                        slot__fruit_3.src = arrFruits[third]
                    } else {
                        pressed = true;
                        winOrNot();
                        clearInterval(inter)
                    }
                }, 100);
            }
        }
        function winOrNot() {
            pressed = true;
            plus.disabled = false;
            minus.disabled = false;
            btn.disabled = false;
            if (first == second && second == third) {
                multiplayer = 20;
                win.textContent = `BIG WIN: ${Number(bet.textContent) * Number(multiplayer)}$!!!`
                balance.textContent = Number(balance.textContent) + multiplayer * bet.textContent
                win.classList.remove('hidden');
                soundWin();
                statsWin.textContent = Number(statsWin.textContent) + 1

            } else if (first == second || second == third || first == third) {
                multiplayer = 4;
                win.textContent = `You won: ${Number(bet.textContent) * Number(multiplayer)}$!`
                balance.textContent = Number(balance.textContent) + multiplayer * bet.textContent
                win.classList.remove('hidden');
                soundWin();
                statsWin.textContent = Number(statsWin.textContent) + 1
            } else {
                lose.textContent = 'You lose!'
                lose.classList.remove('hidden')
                soundLose();
                statsLose.textContent = Number(statsLose.textContent) + 1
            }
        }
        interval();
    }
})

getMoney.addEventListener('click', () => {
    moneyFarm.classList.add('active');
    balance.textContent = Number(balance.textContent) + 100;
    soundGetMoney();
    setTimeout(() => {
        moneyFarm.classList.remove('active');
    }, 150);
})