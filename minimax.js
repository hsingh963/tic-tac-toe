// region setup start
const X_CLASS = 'X';
const CIRCLE_CLASS = 'O';
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
const cells=document.querySelectorAll('.cell');
cells.forEach(element => {
    element.addEventListener('click',handleClick,{once:true});
});

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
// region setup ends

function Start(){
    //debugger;
    currentClass=X_CLASS;
}

function Reset(){
    cells.forEach(element => {
        element.classList='cell';
        element.innerText='';
    });
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

    //check winner
    if (checkWin(currentClass) ){
        alert( 'winner is : '+ currentClass );
    }
    // check if moves are available
    if (!(checkMoves())){
        alert('no moves left')
    }
    
    //swap classes 
    currentClass=swap(currentClass);
    console.log(currentClass);
    nextTurn();

}





// parms > node , depth , maximizing player
function minimax(board,depth,isMaxPlayer){
    if (getScore(currentClass)) return (getScore(currentClass));

    if (isMaxPlayer){
        var maxScore=-Infinity;
        for (let i=0;i<3;i++){
            for (let j=0;j<3;j++){
                //check if the spot is avail
                if(board[i][j]==''){
                    board[i][j]=X_CLASS;
                    let score=minimax(board,depth+1,false);
                    board[i][j]='';
                    if (score>maxScore) maxScore=score; 
                }
            }
        }
        return maxScore;
    }
    else{
        var maxScore=Infinity;
        for (let i=0;i<3;i++){
            for (let j=0;j<3;j++){
                //check if the spot is avail
                if(board[i][j]==''){
                    board[i][j]=CIRCLE_CLASS;
                    let score=minimax(board,depth+1,true);
                    board[i][j]='';
                    if (score<maxScore) maxScore=score; 
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

function nextTurn(){
    let available=[];
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if (board[i][j]==''){
                available.push({i,j});
            }
        }
    }    
    var move = available[Math.floor(Math.random()*available.length)];
    board[move.i][move.j]=CIRCLE_CLASS;
    //show this in UI   
    //get key by value
    tbllookup.forEach((value,index)=>{
        console.log(value);
    })



    document.getElementById().innerText=currentClass;
    cell.classList.add(currentClass)
    currentClass=swap(currentClass);

}

function getScore(currentClass){
    if (currentClass==X_CLASS && checkWin(currentClass)){
        return 1;
    }
    if (currentClass==CIRCLE_CLASS && checkWin(currentClass)){
        return -1;
    }
    if (! checkMoves()) return 0;
    return null;
}