const column = 6
const height = 6
function cycleThroughColumn () {
  const statusArray = []
  for (let i = column; i < (column + height); i++) {
    if (i === column) {
      statusArray.push(i)
    } else {
      statusArray.push(statusArray[statusArray.length - 1] + 7)
    }
  }
}


if (winner) {
  setTimeout(() => {
    alert(`${winner} wins!`)
  }, 50)
}
if (boardFull) {
  alert("Match is a draw!")
}

//below add token and above check for winner

// function checkFour(array, player) {
//   let win = false
//   let accumulator = 0
//   for (const token of array) {
//     if (token === player) {
//       accumulator += 1
//     } else if (accumulator === 4) {
//       win = true
//       break
//     } else {
//       accumulator = 0
//     }
//   }
//   if (accumulator === 4) {
//     return true
//   } else {
//     return win
//   }
// }

//in check for winner above ninarow
  // if (checkFour(classArray, player)) {
  //   winner = player
  // }


      // console.log(cell)
    // console.log("here", event.target.dataset.index)

       // if (cells[event.target.dataset.index].classList.length){
    //   alert("This cell is full, please try another  : )")
    // } else {
    //   addToken(event)
    // }