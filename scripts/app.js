function init() {
  const grid = document.querySelector(".grid")
  const gridHeight = 6
  const gridWidth = 7
  const gridCount = gridWidth * gridHeight
  const cells = []
  let winner = 0
  let boardFull = 0
  const players = { player1: "red", player2: "yellow" }
  let isP1 = true
  const idCoordinates = {}
  let testArrays = []

  function createGrid() {
    let column = 0
    for (let index = 0; index < gridCount; index++) {
      const cell = document.createElement("div")
      cell.setAttribute("data-index", index)
      // cell.dataset.row = Math.floor(index / 7)
      if (column === gridWidth) {
        column = 0
      }
      // cell.dataset.column = column
      idCoordinates[index] = [column,Math.floor(index / 7) ]
      column ++
      cells.push(cell)
      grid.appendChild(cell)
      
    }
  }
  createGrid()
  function createTestArrays(){
    const idKeys = Object.keys(idCoordinates)
    const columnArrays = []
    const rowArrays = []
  
    for (let i = 0; i < gridWidth; i++) {
      columnArrays.push([])
    }
    for (let i = 0; i < gridHeight; i++) {
      rowArrays.push([])
    }
    const diagCoords1 = [
      //hardcoded column & row pairs
      [[0,0], [1,1], [2,2], [3,3], [4,4], [5,5]],
      [[0,1], [1,2], [2,3], [3,4], [4,5]],
      [[0,2], [1,3], [2,4], [3,5]],
      [[1,0], [2,1], [3,2], [4,3], [5,4], [6,5]],
      [[2,0], [3,1], [4,2], [5,3], [6,4]], 
      [[3,0], [4,1], [5,2], [6,3]]
    ]
    const diagNumbers2 = [
      //hardcoded numbers
      ['6', '12', '18', '24', '30', '36'],
      ['5', '11', '17', '23', '29', '35'],
      ['4', '10', '16','22', '28'],
      ['3', '9', '15', '22'],
      ['13', '19', '25','31', '37'],
      ['20', '26', '32', '38']
    ]

    const diagArrays = []
    for (const array of diagCoords1) {
      let tempArray = []
      for (const pair of array) {
        for (const key of idKeys) {
          if (pair[0] === idCoordinates[key][0] && pair[1] === idCoordinates[key][1]) {
            tempArray.push(key)
          }
        }
      }
      diagArrays.push(tempArray)
      tempArray = []
    }

    
    for (let i = 0; i < columnArrays.length; i++) {
      for (const id of idKeys) {
        if (idCoordinates[id][0] === i){
          columnArrays[i].push(id)
        }
      }
    }

    for (let i = 0; i < rowArrays.length; i++) {
      for (const id of idKeys) {
        if (idCoordinates[id][1] === i){
          rowArrays[i].push(id)
        }
      }
    }

    //join all arrays in "testArrays"
    testArrays = rowArrays.concat(columnArrays, diagArrays, diagNumbers2)
  }
  createTestArrays()

  function addToken(event) {
    const turn = isP1 ? players.player1 : players.player2
    cells[event.target.dataset.index].classList.add(turn)
    isP1 = !isP1
  }

  function checkFour(array, player) {
    let win = false
    let accumulator = 0
    for (const token of array) {
      if (token === player) {
        accumulator += 1
      } else if (accumulator === 4) {
        win = true
        break
      } else {
        accumulator = 0
      }
    }
    if (accumulator === 4) {
      return true
    } else {
      return win
    }
  }

  function checkForWinner(player){
    for (const array of testArrays) {
      const classArray = []
      for (const item of array) {
        const cell = document.querySelector('[data-index="' + item + '"]')
        classArray.push(cell.className)
      }
      if (checkFour(classArray, player)) {
        winner = player
      }
    }
  }

  function checkBoardFull(array){
    const len = array.filter( cell => cell.classList.length).length
    return (len >= gridCount)
  }

  function gameCycle(event){
    // TODO if column not already full
    if (cells[event.target.dataset.index].classList.length){
      alert("This cell is full, please try another  : )")
    } else {
      addToken(event)
    }
    Object.keys(players).forEach(key =>checkForWinner(players[key]))
    checkBoardFull(cells)

    if (winner) {
      alert(`${winner} wins!`)
    }
    if (boardFull) {
      alert("Match is a draw!")
    }
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