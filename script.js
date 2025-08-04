const board = document.getElementById('chessboard');
const status = document.getElementById('status');

const initialBoard = [
  ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
  ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
  ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
];

let currentPlayer = 'white';
let selected = null;

function renderBoard() {
  board.innerHTML = '';
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.classList.add((row + col) % 2 === 0 ? 'white-cell' : 'black-cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.textContent = initialBoard[row][col];
      cell.addEventListener('click', handleCellClick);
      board.appendChild(cell);
    }
  }

  // Highlight the selected cell (after re-render)
  if (selected) {
    const index = selected.row * 8 + selected.col;
    board.children[index].classList.add('selected');
  }
}

function handleCellClick(e) {
  const row = parseInt(e.target.dataset.row);
  const col = parseInt(e.target.dataset.col);
  const clickedPiece = initialBoard[row][col];

  // Selecting your own piece
  if (clickedPiece && isCurrentPlayerPiece(clickedPiece)) {
    selected = { row, col, piece: clickedPiece };
    renderBoard();
    return;
  }

  // Moving selected piece to empty cell or capturing opponent
  if (selected && (selected.row !== row || selected.col !== col)) {
    const fromPiece = selected.piece;
    const toPiece = initialBoard[row][col];

    // Can only move to empty or opponent's piece
    if (!toPiece || isOpponentPiece(toPiece)) {
      // Move piece
      initialBoard[row][col] = fromPiece;
      initialBoard[selected.row][selected.col] = '';

      // Switch player
      currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
      status.textContent = `${capitalize(currentPlayer)}'s turn`;

      selected = null;
      renderBoard();
    }
  }
}

function isCurrentPlayerPiece(piece) {
  const code = piece.charCodeAt(0);
  return (currentPlayer === 'white' && code >= 9812 && code <= 9817) ||
         (currentPlayer === 'black' && code >= 9818 && code <= 9823);
}

function isOpponentPiece(piece) {
  return !isCurrentPlayerPiece(piece) && piece !== '';
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

renderBoard();
