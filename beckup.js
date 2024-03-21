//     0   1   2
// 0 | x |   |   |
// 1 | o | x |   |
// 2 |   | o | x |

const tableGame = [
  ['x', 'x', 'o'],
  ['o', 'o', 'x'],
  ['', '', 'x']
]


// Para cada alteração na tabela:

// 1 - Verifciar se alguma linha está todalmente preenchida por x ou o;
// 2 - Verificar se alguma coluna está todalmente preenchida por x ou o;
// 3 Verificar se o intervalo ([0:0], [1:1], [2:2]) em que [linha:coluna], 
//está tocalmente ocupado por x ou o;
// 4 Verificar se o intervalo ([0:2], [1:1], [2:0]) em que [linha:coluna], 
//está tocalmente ocupado por x ou o

// Check if player X or O 
// won in some line.
function checkLines(){

  // Check lines
  const sameLineCount = {
    x: 0,
    o: 0
  }

  for (let i = 0; i < 3; i++){

    sameLineCount.x = 0;
    sameLineCount.o = 0;

    for (let j = 0; j < 3; j++){
    
      if (tableGame[i][j])
        sameLineCount[tableGame[i][j]] ++;
      
      if (sameLineCount.x === 3 ){
        console.log(`Player X won in ${[i+1]} line`);
        return 'x';  

      } else if(sameLineCount.o === 3){
        console.log(`Player O won in ${[i+1]} line`);
        return 'o'
      }
    }
  }

  return 'No winner'
}

// Check if player X or O 
// won in some column.
function checkColumns(){
  // Check lines
  const sameColumnCount = {
    0 : {x: 0, o: 0},
    1 : {x: 0, o: 0},
    2 : {x: 0, o: 0}
  }

  for (let i = 0; i < 3; i++){

    for (let j = 0; j < 3; j++){
      if (tableGame[i][j])
        sameColumnCount[j][tableGame[i][j]] ++;
    }
  }

  if
  
  console.log(sameColumnCount)

  return 'No winner'
}


console.log(checkLines());
console.log(checkColumns());