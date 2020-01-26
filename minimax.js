// region setup start
const X_CLASS = 'X'; //minimizing player
const CIRCLE_CLASS = 'O'; //maximizing player
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
var currentClass;
var board=[
    ['','',''],
    ['','',''],
    ['','','']
];
// Used defer to load js 
// can use document.ready --- issue was that is js loaded before DOM 
// then const cell=undefined 
const cells=document.querySelectorAll('.cell');


const tbllookup={
    0:[0,0],
    1:[0,1],
    2:[0,2],
    3:[1,0],
    4:[1,1],
    5:[1,2],
    6:[2,0],
    7:[2,1],
    8:[2,2]
}
const scores={
    X:10,
    O:-10,
    tie:0
}

// region setup ends

function Start(){
    //debugger;
    currentClass=X_CLASS;
    document.getElementById('btnStart').disabled =true;
    cells.forEach(element => {
        element.addEventListener('click',handleClick,{once:true});
    });
    // AI plays first
    nextTurn();
}

function Reset(){
    location.reload();
}

function handleClick(e){
    //add the X or O to the cell
   // debugger;
    const cell=e.target;
    document.getElementById(cell.id).innerText=currentClass;
    cell.classList.add(currentClass)
    //add human input to board
    var gg=tbllookup[cell.id];
    board[gg[0]][gg[1]]=currentClass;

    EndGame();
    //swap classes 
    currentClass=swap(currentClass);
    //console.log(currentClass);
    nextTurn();

}

// Only for the use of minimax algo using the backend board
function evaluateBoard(){
    let winner;
    // Horizontal Wins
    for(let i=0;i<3;i++){
        if(board[i][0]==board[i][1] && board[i][1]==board[i][2]){
            winner=board[i][0];
        }
    }

    // Vertical Wins
    for(let i=0;i<3;i++){
        if(board[0][i]==board[1][i] && board[1][i]==board[2][i]){
            winner=board[0][i];
        }
    }

    // Diagonal Wins
    if (board[0][0]==board[1][1] && board[1][1]==board[2][2] || board[0][2]==board[1][1] && board[1][1]==board[2][0]){
        winner=board[1][1];
    }

    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
        if (board[i][j] == '') {
            openSpots++;
        }
        }
    }
    if (winner == null && openSpots == 0) {
        return 'tie';
      } else {
        return winner;
    }


}

// parms > node , depth , maximizing player
function minimax(board,depth,isMaxPlayer){
    var value=evaluateBoard();
    if (value){
        return scores[value];
    }
     
    if (isMaxPlayer){
        // For maximizing player, worst score is -infinity 
        var maxScore=-Infinity;
        for (let i=0;i<3;i++){
            for (let j=0;j<3;j++){
                //check if the spot is avail
                if(board[i][j]==''){
                    board[i][j]=X_CLASS;
                    let score=minimax(board,depth+1,false);
                    board[i][j]='';
                    maxScore =  Math.max(score, maxScore);
                }
            }
        }
        return maxScore;
    }
    else{
         // For Minimizing player, worst score is +infinity 
        var maxScore=Infinity;
        for (let i=0;i<3;i++){
            for (let j=0;j<3;j++){
                //check if the spot is avail
                if(board[i][j]==''){
                    board[i][j]=CIRCLE_CLASS;
                    let score=minimax(board,depth+1,true);
                    board[i][j]='';
                    maxScore = Math.min(score, maxScore);
                }
            }
        }
        return maxScore;
    }
}


function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
          return cells[index].classList.contains(currentClass)
        })
      })
  }
          
function checkMoves(){
    var count=0;
    for(let i=0;i<9;i++){
       if(!(cells[i].classList.contains(X_CLASS) ||  cells[i].classList.contains(CIRCLE_CLASS))) {
        count++;
       }
    }
    if (count>0)return true;
    else return false;
}

function swap(currentClass){
    return currentClass==X_CLASS?currentClass=CIRCLE_CLASS:currentClass=X_CLASS;
}

//old one -- Random Spot is chosen
// function nextTurn(){
//     let available=[];
//     for(let i=0;i<3;i++){
//         for(let j=0;j<3;j++){
//             if (board[i][j]==''){
//                 available.push({i,j});
//             }
//         }
//     }    
//     var move = available[Math.floor(Math.random()*available.length)];
//     board[move.i][move.j]=CIRCLE_CLASS;
//     //show this in UI   
//     //get key by value
//     var id;
//     for (i=0;i<8;i++){
//         if(tbllookup[i][0]==move.i && tbllookup[i][1]==move.j ){
//             id=i;
//         }
//     }
//     document.getElementById(id).innerText=currentClass;
//     cells[id].classList.add(currentClass);
//     currentClass=swap(currentClass);

// }

//MIniMax one -- Algorithm Spot is chosen
function nextTurn(){
    EndGame();
    var bestScore=-Infinity;
    var bestMove;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(board[i][j]==''){
                board[i][j]=X_CLASS;
                let score = minimax(board,0,false);
                board[i][j]='';
                if(score>bestScore){
                    bestScore=score;
                    //bestMove={i:j};
                    bestMove=[i,j]
                }
            }
        }
    }    
    board[bestMove[0]][bestMove[1]]=X_CLASS;
    //show this in UI   
    //get key by value
    var id;
    for (i=0;i<9;i++){
        if(tbllookup[i][0]==bestMove[0] && tbllookup[i][1]==bestMove[1] ){
            id=i;
        }
    }
    //now we have cell id.. use it to add text in UI
    document.getElementById(id).innerText=currentClass;
    cells[id].classList.add(currentClass);
    //remove click event listner from current cell
    //Bug Fixed: Human can click on the cell set above
     document.getElementById(id).removeEventListener('click',handleClick)
    EndGame();
    currentClass=swap(currentClass);

}

// Check if there is any winner or tie
function EndGame(){
    //check winner
    if (checkWin(currentClass) ){
        cells.forEach(element=>{
            element.classList.add('disabled');
            element.removeEventListener('click',handleClick);
        })
        // document.getElementById('row').classList.add('disabled');
        alert( 'winner is : '+ currentClass );
      
    }
    // check if moves are available
    if (!(checkMoves())){
        cells.forEach(element=>{
            element.classList.add('disabled');
            element.removeEventListener('click',handleClick);
        })
        // document.getElementById('row').classList.add('disabled');
        alert('no moves left');
      
    }
}

