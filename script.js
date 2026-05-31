let gameSeq = [];
let userSeq = [];
let highestScore = 0;
let music = new Audio("./assets/Game Music.wav");
let touchSound = new Audio("./assets/Tuch sound.wav");
let gameOverSound = new Audio("./assets/Game Over Sound.wav");

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if(started == false) {
        started = true;

        music.loop = true;
        music.play();
        levelUp();
    }
});

// flash btn

function gameFlash(btn) {
        btn.classList.add("flash");
        setTimeout(function() {
            btn.classList.remove("flash");
        }, 250);
    }

function userFlash(btn) {
        btn.classList.add("userFlash");
        setTimeout(function() {
            btn.classList.remove("userFlash");
        }, 250);
}

function levelUp() {
    userSeq = [];
    level++
    h2.innerText = `Level ${level}`;

    // random btn
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`); //ele access using class 
    // console.log(gameSeq);
    gameSeq.push(randColor);
    console.log(gameSeq);
    //flash btn 
    gameFlash(randBtn);
}

function checkAns(idx) {

    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
            } 
        } else {
            if(level > highestScore) {
                highestScore = level;
            }
            
            h2.innerHTML = `Game Over! Your score was <b>${level}<b/> <br> Press any key to start. <br> Highest score was ${highestScore}.`;
            
            gameOverSound.play();
            music.pause();
            music.currentTime = 0;

            document.querySelector("body").style.background = "red";

            setTimeout(function() {
                document.querySelector("body").style.background = "linear-gradient(135deg, #141e30,#243b55)";
            }, 150);
            reset();
        }
    }


function btnPress() {
    touchSound.currentTime = 0;
    touchSound.play();

    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
};


function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}