function botPick(){
    const botChoice = Math.random()
    
    if (botChoice < 1/3){
        return "Rock";
    } else if (botChoice >= 1/3 && botChoice < 2/3){
        return "Paper"
    } else if (botChoice >= 2/3){
        return "Scissors"
    }
}

let P1score = 0
let P2score = 0
/* кто кого бьёт */
const winner = { Rock: "Scissors", Paper: "Rock", Scissors: "Paper" };

let isAutoPlaying = false;
let IntervalId;

function autoPlay() {
    if (!isAutoPlaying) {
        IntervalId = setInterval(function(){
            const playerChoice = botPick();
            playGame(playerChoice)
        }, 1500);
        
        isAutoPlaying = true 

    } else {
        clearInterval(IntervalId)

        isAutoPlaying = false
    }
}

function playGame(playerChoice) {

    const botMove = botPick()
    
    // левая рука (игрок)
    const leftGroup = '.hands .rock, .hands .paper, .hands .scissors';
    const leftMap   = { Rock: '.hands .rock', Paper: '.hands .paper', Scissors: '.hands .scissors' };
    showOnly(leftGroup, leftMap[playerChoice]);

    // правая рука (бот)
    const rightGroup = '.hands .rockMir, .hands .paperMir, .hands .scissorsMir';
    const rightMap   = { Rock: '.hands .rockMir', Paper: '.hands .paperMir', Scissors: '.hands .scissorsMir' };
    showOnly(rightGroup, rightMap[botMove]);


    /* кто выиграл */

    if (playerChoice === botMove) {
        console.log("Ничья");
    } else if (winner[playerChoice] === botMove) {
        console.log("Вы выиграли");
        P1score++
        document.getElementById("P1score").textContent = P1score
    } else {
        console.log("Вы проиграли");
        P2score++
        document.getElementById("P2score").textContent = P2score
    }
}

/* хелпер, который помогает спрятать всю группу и показать ровно один элемент */
function showOnly(groupSelector, showSelector) {
    /* скрыть и снять анимацию */
    document.querySelectorAll(groupSelector).forEach(el =>{
        el.classList.add('is-hidden')
        el.classList.remove('bump')
    });
    /* показываем нужный элемент и перезапускаем анимацию */
    const target = document.querySelector(showSelector)
    if (target) {
        target.classList.remove('is-hidden')
        void target.offsetWidth;
        target.classList.add('bump')
    }
}

function bump(el){
    if (!el) return;
    el.classList.remove('bump')
    void el.offsetWidth;
    el.classList.add('bump')
}

window.playGame = playGame; 