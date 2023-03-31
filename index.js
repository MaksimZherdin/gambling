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

btn.addEventListener('click', () => {
    if (betAmount > balance.textContent) {
        lose.textContent = 'Not enough balance!'
        lose.classList.remove('hidden')
    } else if (betAmount == 0) {
        lose.textContent = 'Bet should be atleast 100$!'
        lose.classList.remove('hidden')
    } else {
        let first = 0;
        let second = 0;
        let third = 0;
        let i = 0;
        const interval = () => {
            win.classList.add('hidden')
            lose.classList.add('hidden')
            console.log(pressed)
            if (pressed) {
                balance.textContent = balance.textContent - betAmount;
                pressed = false;
                console.log(pressed)
                const inter = setInterval(() => {
                    if (i < 15) {
                        i++
                        first = Math.floor(Math.random() * 10);
                        second = Math.floor(Math.random() * 10);
                        third = Math.floor(Math.random() * 10);
                        number1.textContent = first;
                        number2.textContent = second;
                        number3.textContent = third;
                    } else {
                        pressed = true;
                        winOrNot();
                        clearInterval(inter)
                    }
                }, 100);
            }
        }
        function winOrNot() {
            if (first == second && second == third) {
                multiplayer = 20;
                win.textContent = `BIG WIN: ${Number(bet.textContent) * Number(multiplayer)}$!!!`
                balance.textContent = Number(balance.textContent) + multiplayer * bet.textContent
                win.classList.remove('hidden')
                pressed = true;
            } else if (first == second || second == third || first == third) {
                multiplayer = 4;
                win.textContent = `You won: ${Number(bet.textContent) * Number(multiplayer)}$!`
                balance.textContent = Number(balance.textContent) + multiplayer * bet.textContent
                win.classList.remove('hidden');
                pressed = true;
            } else {
                lose.textContent = 'You lose!'
                lose.classList.remove('hidden')
                pressed = true;
            }
        }
        interval();
    }
})

getMoney.addEventListener('click', () => {
    moneyFarm.classList.add('active');
    balance.textContent = Number(balance.textContent) + 100;
    setTimeout(() => {
        moneyFarm.classList.remove('active');
    }, 150);
})