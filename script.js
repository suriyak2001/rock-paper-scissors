let score = JSON.parse(localStorage.getItem('score')) ||
{
  wins: 0,
  losses: 0,
  ties: 0
};

updateScore();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else if (isAutoPlaying) {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
  console.log(intervalId);
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScore();
}

document.querySelector('.js-rock-button')
 .addEventListener('click', () => {
  playGame('rock');
});
document.querySelector('.js-paper-button')
 .addEventListener('click', () => {
  playGame('paper');
});
document.querySelector('.js-scissors-button')
 .addEventListener('click', () => {
  playGame('scissors');
});
document.querySelector('.js-reset-button')
 .addEventListener('click', () => {
  resetScore();
});
document.querySelector('.js-autoplay-button')
 .addEventListener('click', () => {
  autoPlay();
});


document.body.addEventListener('keydown',
  (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'z') {
    resetScore();
  } else if (event.key === 'a') {
    autoPlay();
  }
});

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >=0 && randomNumber < 1/3){
      computerMove = 'rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
      computerMove = 'paper';
    } else if (randomNumber >= 2/3 && randomNumber < 1) {
    computerMove = 'scissors';
  }
  return computerMove;
}

function playGame(playerMove) {
  const computerMove =  pickComputerMove();

  let result = '';

  if (playerMove === 'rock') {
    if(computerMove === 'rock') {
      result = 'Tie';
    } else if (computerMove === 'paper') {
      result = 'You lose';
    } else if (computerMove === 'scissors') {
      result = 'You win'
    }

  } else if (playerMove === 'paper') {
    if(computerMove === 'rock') {
      result = 'You win';
    } else if (computerMove === 'paper') {
      result = 'Tie';
    } else if (computerMove === 'scissors') {
      result = 'You lose'
    }

  } else if (playerMove === 'scissors') {
    if(computerMove === 'rock') {
      result = 'You lose';
    } else if (computerMove === 'paper') {
      result = 'You win';
    } else if (computerMove === 'scissors') {
      result = 'Tie'
    }
  }
  
  document.querySelector('.js-result')
   .innerHTML = `${result}.`;

  document.querySelector('.js-moves')
   .innerHTML = `You <img src="images/${playerMove}-emoji.png" class="script-moves">------<img src="images/${computerMove}-emoji.png" class="script-moves"> computer`;

  if (result === 'You win') {
    score.wins++;
  } else if (result === 'You lose') {
    score.losses++;
  } else if (result === 'Tie') {
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScore();
}

function updateScore() {
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}.`;
}