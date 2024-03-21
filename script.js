// Para cada alteração na tabela:

// 1 - Verifciar se alguma linha está todalmente preenchida por x ou o;
// 2 - Verificar se alguma coluna está todalmente preenchida por x ou o;
// 3 Verificar se o intervalo ([0:0], [1:1], [2:2]) em que [linha:coluna], 
//está tocalmente ocupado por x ou o;
// 4 Verificar se o intervalo ([0:2], [1:1], [2:0]) em que [linha:coluna], 
//está tocalmente ocupado por x ou o

//     0   1   2
// 0 | x |   |   |
// 1 | o | x |   |
// 2 |   | o | x |

let tableGame = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

const simbols = {
  x: 'close',
  o: 'circle'
}

const score = {
  x: {wins: 0, looses: 0},
  o: {wins: 0, looses: 0}
}

const iconPath = 'imgs/'

let gameIsRunning = false;


// Mark the winner fields
function markFields(fields){
  /*
    fields (array of arrays): An array of fields 
    positions [row, colmn].
  */

  fields.forEach((field) => {
    let row = field[0];
    let col = field[1];
    document.querySelector(`#js-field-${row}${col}`)
      .classList.add('marked-field');
  });
}

// Check if player X or O 
// won in some line.
function checkLines(){

  // Check lines
  const sameLineCount = {
    x: [],
    o: []
  }

  for (let i = 0; i < 3; i++){

    // Reset count for each line
    sameLineCount.x = [];
    sameLineCount.o = [];
    
    for (let j = 0; j < 3; j++){
    
      if (tableGame[i][j]){
        let simb = tableGame[i][j];
        sameLineCount[simb].push([i, j]);

        if(sameLineCount.x.length === 3){
          return sameLineCount;

        } else if (sameLineCount.o.length === 3){
          return sameLineCount;
        }
      } 
    }
  }

  return sameLineCount;
}

// Check if player X or O 
// won in some column.
function checkColumns(){
  
  // Check lines
  const sameColumnCount = {
    x: [],
    o: []
  }

  for (let j = 0; j < 3; j++){

    // Reset count for each column
    sameColumnCount.x = [];
    sameColumnCount.o = [];

    for (let i = 0; i < 3; i++){
    
      if (tableGame[i][j]){
        let simb = tableGame[i][j];
        sameColumnCount[simb].push([i, j]);

        if(sameColumnCount.x.length === 3){
          return sameColumnCount;

        } else if (sameColumnCount.o.length === 3){
          return sameColumnCount;
        }
      }
    } 
  }
  return sameColumnCount;
}

// Check if player X or O 
// won in from left to right straight
function checkLeftRight(){

  // Check from left to right straight
  const leftRightCount = {
    x: [],
    o: []
  }

  for (let ij = 0; ij < 3; ij++){
   
    if (tableGame[ij][ij]){
      let simb = tableGame[ij][ij];
      leftRightCount[simb].push([ij, ij]);
    }
  }
  return leftRightCount;
}

// Check if player X or O 
// won in from right to left straight
function checkRightLeft(){

  // Check from right to left straight
  const rightLeftCount = {
    x: [],
    o: []
  }

  let j = 2;
  for (let i = 0; i < 3; i++){
    
    if (tableGame[i][j]){
      let simb = tableGame[i][j];
      rightLeftCount[simb].push([i, j]);
    }
    
    j--;
  }

  return rightLeftCount;
}


function checkWinner(){

  let checkLinesObj = checkLines();

  if (checkLinesObj.x.length === 3){
   
    markFields(checkLinesObj.x);
    return 'x'

  } else if (checkLinesObj.o.length === 3){
    markFields(checkLinesObj.o);
    return 'o'
  }

  
  let checkColumnsObj = checkColumns();

  if (checkColumnsObj.x.length === 3){
   
    markFields(checkColumnsObj.x);
    return 'x'
  } else if (checkColumnsObj.o.length === 3){
    markFields(checkColumnsObj.o);
    return 'o'
  }
  
  let checkLeftRightObj = checkLeftRight();

  if (checkLeftRightObj.x.length === 3){
   
    markFields(checkLeftRightObj.x);
    return 'x'
  } else if (checkLeftRightObj.o.length === 3){
    markFields(checkLeftRightObj.o);
    return 'o'
  }

  
  let checkRightLeftObj = checkRightLeft();

  if (checkRightLeftObj.x.length === 3){
   
    markFields(checkRightLeftObj.x);
    return 'x'
  } else if (checkRightLeftObj.o.length === 3){
    markFields(checkRightLeftObj.o);
    return 'o'
  }

  return null;
}


function setField(simbol, row, col){
  if (!tableGame[row][col]){
    tableGame[row][col] = simbol;
    console.log('Setado');
    return true;
  }
  console.log('NAO SETADO');
  return false;
}


function lockTable(){
  document.querySelectorAll('.js-field')
    .forEach((element) => {
      element.setAttribute('active', false)
    });
}

function unlockTable(){
  document.querySelectorAll('.js-field')
    .forEach((element) => {
      element.setAttribute('active', true)
    });
}

function cleanFields(){
  document.querySelectorAll('.js-field')
    .forEach((element => {
      element.innerHTML = '';
      element.classList.remove('marked-field')
    }))
}

function turnScreenOn(){
  document.querySelector('.player-turn-screen').classList.add('screen-on');

}

function turnScreenOff(){
  document.querySelector('.player-turn-screen').classList.remove('screen-on');
  
}

function setScreenTurn(playerSimb){
  document.querySelector('.player-turn-screen')
    .innerHTML = `<img class="screen-simbol-icon" src="${iconPath}/${simbols[playerSimb]}.svg">`
}

function updateScore(winner){
  if (winner === 'x'){
    score.x.wins ++;
    score.o.looses ++;

  } else if (winner === 'o'){
    score.o.wins ++;
    score.x.looses ++;
  }
}

function resetScore() {
  if (!gameIsRunning){
    score.x.wins = 0;
    score.o.looses = 0;

    score.o.wins = 0;
    score.x.looses = 0;

    showScore();
  }
}

function showScore(){

  document.querySelector('.js-x-wins')
    .innerText = score.x.wins;

  document.querySelector('.js-x-looses')
    .innerText = score.x.looses;

  document.querySelector('.js-o-wins')
    .innerText = score.o.wins;

  document.querySelector('.js-o-looses')
    .innerText = score.o.looses;
}


function startGame(){
  let player = 'x';

  gameIsRunning = true;

  setScreenTurn(player);

  turnScreenOn();
  document.querySelectorAll('.js-field')
  .forEach((element) => {
    element.addEventListener('click', () => {

      if (element.getAttribute('active') != 'false'){
        const positionStr = element.getAttribute('id');
        
        // Select position js-field-rowcolumn
        // Ex: js-field-01
        const row = Number(positionStr[9]);
        const col = Number(positionStr[10]);

        const checker = setField(player, row, col);

        if (checker){
          element.innerHTML = `<img class="simbol-icon" src="${iconPath}/${simbols[player]}.svg">`
        
          if (player === 'x'){
            player = 'o';

          } else if (player === 'o'){
            player = 'x';
          }

          setScreenTurn(player);

          const winner = checkWinner();

          if(winner){
            document.querySelector('.js-winner-alert')
              .innerText = 'WIN';

            updateScore(winner);

            showScore()

            setScreenTurn(winner);

            lockTable();
            return;
          }
        }
        
        showScore()
      } 
    })
  });
  showScore()
}

function restartGame(){

  gameIsRunning = false;

  tableGame = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]
  
  cleanFields();

  turnScreenOff();

  document.querySelector('.js-start-button')
    .classList.remove('toggled-button');

  document.querySelector('.js-winner-alert')
  .innerText = '';
}



const startButton = document.querySelector('.js-start-button');

startButton.addEventListener('click', () => {

  if (!startButton.classList.contains('toggled-button')){
    unlockTable();
    startGame();
    startButton.classList.add('toggled-button');
  }
});

const restartButton = document.querySelector('.js-restart-button');

restartButton.addEventListener('click', () => {
  restartGame();
});

const resetScoreButton = document.querySelector('.js-reset-score-button');

resetScoreButton.addEventListener('click', () => {
  resetScore();
});
