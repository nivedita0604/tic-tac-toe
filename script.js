const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
let cirlceTurn
const winningMessageElement = document.getElementById('winningmessage')
const X_class ="x"
const Circle_class="circle"
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const WINNIG_COMBINATION=[
 [0,1,2],
 [3,4,5],
 [6,7,8],
 [0,3,6],
 [1,4,7],
 [2,5,8],
 [0,4,8],
 [2,4,6]
]


startgame()

restartButton.addEventListener('click', startgame)

function startgame() {
    cirlceTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_class)
        cell.classList.remove(Circle_class)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click',handleClick, {once: true})
    })
    setboardHoverclass()
    winningMessageElement.classList.remove('show')
    
}

function handleClick(e)
{
    const cell = e.target
    const currentClass = cirlceTurn ? Circle_class: X_class
    placdemark(cell, currentClass)
    if (CheckWin(currentClass)){
        endgame(false)

    }
    else if(isDraw()){
        endgame(true)
    }
    else{
        swapTurns()
        setboardHoverclass()

    }
    //check for draw
    //check for win
    //switch turns
   

}

function endgame(draw){
    if (draw){
        winningMessageTextElement.innerText = "Draw!!"

    }
    else{
        winningMessageTextElement.innerText = `${cirlceTurn ? "O's" : "X's"} Wins!!`
    }
    winningMessageElement.classList.add('show')
}
function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_class) || cell.classList.contains(Circle_class)
    })
}
function placdemark(cell,currentClass)
{
    cell.classList.add(currentClass)
}
function swapTurns(){
    cirlceTurn = !cirlceTurn
}
function setboardHoverclass(){
 board.classList.remove(X_class)
 board.classList.remove(Circle_class)
 if(cirlceTurn){
     board.classList.add(Circle_class)

 }
 else{
    board.classList.add(X_class)
 }
}

function CheckWin(currentClass){
   return WINNIG_COMBINATION.some(combination =>{
     return combination.every(index =>{
         return cellElements[index].classList.contains(currentClass)
     })
   })
}