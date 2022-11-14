function init() {
  //this is a start

  //TODO: create game grid
  const grid = document.querySelector(".grid")
  const gridHeight = 6
  const gridWidth = 7
  const gridCount = gridWidth * gridHeight
  const cells = []
  let winner = 0
  let boardFull = 0
  const players = ["red", "yellow"]
  let currentPlayer = "red"

  function createGrid() {
    let column = 0
    for (let index = 0; index < gridCount; index++) {
      const cell = document.createElement("div")
      cell.setAttribute("data-index", index)
      cell.dataset.row = Math.floor(index / 7)
      if (column === gridWidth) {
        column = 0
      }
      cell.dataset.column = column
      column ++
      cells.push(cell)
      grid.appendChild(cell)
    }
  }
  createGrid()


  function addToken(event) {
    cells[event.target.dataset.index].classList.add(currentPlayer)
    if (currentPlayer === "red") {
      currentPlayer = "yellow"
    } else {
      currentPlayer = "red"
    }
    console.log(event.target.dataset.index)
  }

  function checkForWinner(cells){
    // console.log("checked")
    return 0
  }

  function checkBoardFull(array){
    function hasToken(cell) {
      return cell.classList.length
    }
    const len = array.filter( cell => hasToken(cell)).length
    return (len >= gridCount)
  }

  function gameCycle(event){
    //maybe here is the place for cylce options
    // for example board full and no winner == draw
    // ???
    if (!winner || !boardFull) {
      addToken(event)
    }
    winner = checkForWinner()
    boardFull = checkBoardFull(cells)

  }
  cells.forEach(cell => addEventListener("click", gameCycle))
}
document.addEventListener("DOMContentLoaded", init)

// TODO: add data rows
// TODO: logic for if board is full
// TODO: choose player avatar
// TODO: add token to column from anywhere within that column
// TODO: no more tokens in a column when full ( dont have that problem with individual)

// cell.dataset.column = Math.ceil((index + 1) / 7)
// cell.dataset.column = index.toString().slice(-1)
// cell.dataset.column = Math.floor(index / 7)