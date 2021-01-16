$(document).on('click', '.toggleMusicButton', function () {
    icon = $(this).find("i");
    icon.toggleClass('fa-volume-mute fa-volume-off');
    togglePlay();
});

//variables
var veg = document.querySelectorAll('.avocado');
var bowls = document.querySelectorAll('.bowl');
var timeUp = false;
var smashSound = new sound("assets/audio/smash.wav");
var gameMusic = new sound("assets/audio/gameMusic.wav");
var score = 0;

// function to get a random avocado appear in a hole
function randomVeg(veg) {
    var index = Math.floor(Math.random() * veg.length);
    var active = veg[index];
    return active;
}

// function to generate a random time for the avocado to stay up
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// function that makes an avocado to pop up
function popUp1() {
    var activeAvocado = randomAvocado(veg);
    var popUpTime = randomTime(1000, 2500);

    activeAvocado.classList.remove('down');
    console.log("continue");
    setTimeout(function () {
        activeAvocado.classList.add('down');
        console.log("cont-2");
        if (!timeUp) {
            popUp()
        }
    }, popUpTime);
}

function popUp2() {
    var activeTomato = randomTomato(veg);
    var popUpTime = randomTime(900, 2000);
    this.src = "assets/images/smash.png";
    activeTomato.classList.remove('down');
    console.log("continue");
    setTimeout(function () {
        activeTomato.classList.add('down');
        console.log("cont-2");
        if (!timeUp) {
            popUp()
        }
    }, popUpTime);
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

function startGame() {
    gameTimer();
    gameMusic.play();
    popUp1();
    setTimeout(() => timeUp = true, 15000); //show random moles for 30 seconds
    setTimeout(() => popUp2(), 3000);
}

function smash() {
    this.src = "assets/images/smash.png";
    smashSound.play();
    setTimeout(() => {
        this.src = "assets/images/avocado1.png";
    }, 650);
    score += 10;
    document.getElementById("score").innerHTML = score;
}

// function to play and pause game music
function togglePlay() {
return gameMusic.paused ? gameMusic.play() : gameMusic.stop();
}

//function to store highest score
function saveScore(score) {
    localStorage.highestScore = this.score;
}

//function to display timer
function gameTimer(){
    var seconds = document.getElementById("timer").textContent;
    var countdown = setInterval(function() {
    seconds--;
    document.getElementById("timer").textContent = seconds;
    if (seconds <= 0) clearInterval(countdown);
}, 1000);
}

//event listeners
avocados.forEach((item) => item.addEventListener("click", smash));
playMusic.addEventListener("click", togglePlay);
