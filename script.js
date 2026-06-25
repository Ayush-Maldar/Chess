const boardElement = document.getElementById("chessboard");
const statusElement = document.getElementById("status");

const game = new Chess();

let selectedSquare = null;

const pieceSymbols = {
wp: "♙",
wr: "♖",
wn: "♘",
wb: "♗",
wq: "♕",
wk: "♔",

bp: "♟",
br: "♜",
bn: "♞",
bb: "♝",
bq: "♛",
bk: "♚"
};

function renderBoard() {
boardElement.innerHTML = "";

const board = game.board();

for (let row = 0; row < 8; row++) {
for (let col = 0; col < 8; col++) {


  const cell = document.createElement("div");

  cell.classList.add("cell");
  cell.classList.add(
    (row + col) % 2 === 0
      ? "white-cell"
      : "black-cell"
  );

  const square =
    "abcdefgh"[col] + (8 - row);

  cell.dataset.square = square;

  const piece = board[row][col];

  if (piece) {
    cell.textContent =
      pieceSymbols[
        piece.color + piece.type
      ];
  }

  if (selectedSquare === square) {
    cell.classList.add("selected");
  }

  cell.addEventListener(
    "click",
    handleCellClick
  );

  boardElement.appendChild(cell);
}


}

updateStatus();
}

function handleCellClick(event) {

const square =
event.currentTarget.dataset.square;

const piece = game.get(square);

if (!selectedSquare) {


if (
  piece &&
  piece.color === game.turn()
) {
  selectedSquare = square;
  renderBoard();
}

return;


}

const move = game.move({
from: selectedSquare,
to: square,
promotion: "q"
});

if (move) {


selectedSquare = null;

renderBoard();

if (game.in_checkmate()) {
  const winner =
    game.turn() === "w"
      ? "Black"
      : "White";

  statusElement.textContent =
    winner + " wins by checkmate!";
}

return;


}

if (
piece &&
piece.color === game.turn()
) {
selectedSquare = square;
} else {
selectedSquare = null;
}

renderBoard();
}

function updateStatus() {

if (game.in_checkmate()) {
const winner =
game.turn() === "w"
? "Black"
: "White";


statusElement.textContent =
  winner + " wins by checkmate!";
return;


}

if (game.in_stalemate()) {
statusElement.textContent =
"Draw by stalemate";
return;
}

if (game.in_draw()) {
statusElement.textContent =
"Draw";
return;
}

let text =
game.turn() === "w"
? "White's turn"
: "Black's turn";

if (game.in_check()) {
text += " (Check)";
}

statusElement.textContent = text;
}

renderBoard();
