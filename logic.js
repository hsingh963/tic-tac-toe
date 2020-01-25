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
// region setup ends



// parms > node , depth , maximizing player
function minimax(node,depth,isMaxPlayer){
    if (checkWin(currentClass)){
        
    }

    if (isMaxPlayer){

    }
}

function handleClick(e){
    //add the X or O to the cell
   // debugger;
    const cell=e.target;
    document.getElementById(cell.id).innerText=currentClass;
    cell.classList.add(currentClass)

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
    nextTurn(currentClass);

}

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

function nextTurn(currentClass){
    // assuming that current class is O i.e AI turn
    var bestMove
}