const xClass='x'
const oClass='o'
const winningText=document.querySelector('[data-winning-message]')
const winningMessage=document.getElementById('winningMessage')
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements=document.querySelectorAll('[data-cell]')
const restartButton=document.getElementById('restart')
let oTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame(){
    oTurn=false
    cellElements.forEach(cell => {
        cell.classList.remove(xClass);
        cell.classList.remove(oClass);
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    
    })
    winningMessage.classList.remove('show')
}


function handleClick(e){
    const cell=e.target
    const currentClass=oTurn? oClass: xClass
    placeMark(cell, currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    }
    else if(isDraw()){
        endGame(true)
    }
    else{
        swapTurns()
    }
}
function endGame(draw){
    if(draw){
        winningText.innerText='Draw!'
    }
    else{
        winningText.innerHTML=`${oTurn ? "O" : "X"} Wins!`
    }
    winningMessage.classList.add('show')
}
function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(oClass)
    })
}
function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}
function swapTurns(){
    oTurn=!oTurn
}

function checkWin(currentClass){
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}