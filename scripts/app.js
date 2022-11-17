// const ninarow = require("ninarow")

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
      if (column === gridWidth) {
        column = 0
      }
      cell.setAttribute("column", column)
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
    return rowArrays.concat(columnArrays, diagArrays, diagNumbers2)
  }
  testArrays = createTestArrays()

  function addToken(cell) {
    const turn = isP1 ? players.player1 : players.player2
    cells[cell].classList.add(turn)
    isP1 = !isP1
  }

  function checkForWinner(player){
    for (const array of testArrays) {
      const classArray = []
      for (const item of array) {
        const cell = document.querySelector('[data-index="' + item + '"]')
        classArray.push(cell.className)
      }
      if (ninarow(classArray, 4, player)) {
        winner = player
      }
    }
  }

  function checkBoardFull(array){
    const len = array.filter( cell => cell.classList.length).length
    return (len >= gridCount)
  }


  function gameCycle(event){

    function getIDsFromColumn(column) {
      const array = []
      for (let i = column; i < (column + gridHeight); i++) {
        if (i === column) {
          array.push(i)
        } else {
          array.push(array[array.length - 1] + 7)
        }
      }
      return array
    }
    // returns false if no space left else which cell
    function getNextSpaceLeft(columnIds) {
      //initiate free cell as last in array 
      let freeCell = columnIds[columnIds.length - 1]

      // converts array of cell ids to actual null/ class values from game
      const tokenArray = columnIds.map(cell => document.querySelector('[data-index="' + cell + '"]').getAttribute("class" ))

      //filtered takes array of null and classes, filters nulls
      const filtered = tokenArray.filter(Boolean)

      function minIndex(array) {
        let min = 0
        if (!array.includes("red")) {
          min = array.indexOf("yellow")
        } else if (!array.includes("yellow")) {
          min = array.indexOf("red")
        } else {
          min = Math.min((array.indexOf("red")), (array.indexOf("yellow")))
        }
        return min
      } 

      if (filtered.length === columnIds.length) { //if
        freeCell = -1
      } else if (filtered.length === 1) {
        freeCell = columnIds[columnIds.length - 2]
      } else if (filtered.length > 1) {
        freeCell = columnIds[minIndex(tokenArray) - 1]
      } 
      return freeCell
    }

    const whichColumnClicked = event.target.getAttribute("column")
    const columnIds = getIDsFromColumn(parseInt(whichColumnClicked))
    const nextAvailableSpace = getNextSpaceLeft(columnIds)
 
    if (nextAvailableSpace < 0){
      alert("This column is full, please try another  : )")
    } else {
      addToken(nextAvailableSpace)
    }

    Object.keys(players).forEach(key =>checkForWinner(players[key]))
    checkBoardFull(cells)

    function gameFinish() {
      alert(`${winner} wins!`)
    }

    if (winner) {
      // buggy - alert comes before last token
      setTimeout(gameFinish, 100)
    }
    if (boardFull) {
      alert("Match is a draw!")
    }

  }
  cells.forEach(cell => cell.addEventListener("click", gameCycle))
}
document.addEventListener("DOMContentLoaded", init)


// function resetGame() {
//   cells.classList.remove("red")
//   cells.classList.remove("yellow")
//   location.reload()
// }
// setTimeout(resetGame, 3000)

// TODO: add data rows
// TODO: logic for if board is full
// TODO: choose player avatar
// TODO: add token to column from anywhere within that column
// TODO: no more tokens in a column when full ( dont have that problem with individual)

// cell.dataset.column = Math.ceil((index + 1) / 7)
// cell.dataset.column = index.toString().slice(-1)
// cell.dataset.column = Math.floor(index / 7)

//*//     