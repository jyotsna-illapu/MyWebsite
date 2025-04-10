const board = document.getElementById("board")
const message = document.getElementById("message")
const resetButton = document.getElementById("reset")
const cells = document.querySelectorAll(".cell")
let currentPlayer = "X"
let gameBoard = ["", "", "", "", "", "", "", "", ""]
let gameActive = true

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function checkWin() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameActive = false
      message.textContent = `${currentPlayer} wins!`
      return
    }
  }
  if (!gameBoard.includes("")) {
    gameActive = false
    message.textContent = "It's a draw!"
  }
}

function handleClick(event) {
  if (!gameActive) return
  const cell = event.target
  const index = cell.getAttribute("data-index")
  if (gameBoard[index] === "") {
    gameBoard[index] = currentPlayer
    cell.textContent = currentPlayer
    checkWin()
    currentPlayer = currentPlayer === "X" ? "O" : "X"
  }
}

function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""]
  cells.forEach((cell) => (cell.textContent = ""))
  currentPlayer = "X"
  gameActive = true
  message.textContent = ""
}

board.addEventListener("click", handleClick)
resetButton.addEventListener("click", resetGame)
