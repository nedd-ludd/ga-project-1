const gridHeight = 6
const gridWidth = 7
// let testArrays = []

function arraysFromGrid(width = 3, height = 3) {
  const sum = width * height
  //rows
  
  makeRows()

  function makeRows(){
    const rowsArray = []
    for (let i = 0; i < height; i++) {
      rowsArray.push([])
    }
    for (let i = 1; i < sum + 1; i++) {
      rowsArray[Math.floor(i / width)].push(i - 1)
      // console.log(rows)

    }
    console.log(rowsArray)
  }
  //columns
  //diags
  //diags
  // duplicates
}

arraysFromGrid()