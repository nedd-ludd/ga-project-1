const testArray1 = [1,0,1,1,1,1,0]
const testArray2 = [1,0,0,0,0,1,1]

const width = 7
const height = 6

const testGrid3 = [
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [1,0,0,0,0,0,0],
  [1,2,0,0,1,0,1],
  [1,1,2,1,1,1,2],
  [1,1,2,2,2,1,2]
]

const diagCoords = [
  //column & row pairs
  [[0,0], [1,1], [2,2], [3,3], [4,4] [5,5]],
  [[0,1], [1,2], [2,3], [3,4], [4,5]],
  [[0,2], [1,3], [2,4], [3,5]],
  [[1,0], [2,1], [3,2], [4,3], [5,4], [6,5]],
  [[2,0], [3,1], [4,2], [5,3], [6,4]], 
  [[3,0], [4,1], [5,2], [6,3]]
]
function reverseColumn(columnNo) {
  return 7 - columnNo
}
function reverseRow(rowNo){
  return 5 - rowNo
}

const players = ["red", "yellow"]
checkTokens(testGrid3)

function makeArrayFromColumn(array, column) {
  const columnArray = []
  for (let j = 0; j <  height; j++) {
    columnArray.push(array[j][column])
  }
  return columnArray
}

function cycleThroughColumns(nestedArray, player) {
  for (let column = 0; column < width; column++) {
    const array = makeArrayFromColumn(nestedArray, column)
    if (checkFour(array, player)) {
      return true
    }
  }
}

function checkTokens(grid) {
  let winner = 0
  for (let i = 1; i < 3; i++) {
    const fourFound = cycleThroughColumns(grid, i)
    if (fourFound) {
      winner = fourFound
      break
    }
  }
  console.log(winner)
}

function checkFour(array, player) {
  console.log(array, player)
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
