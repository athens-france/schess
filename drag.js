let draggedPiece = null;
let originalX = null;
let originalY = null;
let legalMoves = [];


function startDrag(e) {
  e.preventDefault(); // stop default browser dragging behavior 
  draggedPiece = e.target;

  originalX = parseInt(draggedPiece.getAttribute('data-x'));
  originalY = parseInt(draggedPiece.getAttribute('data-y'));
  const pieceObj = board[originalY][originalX];

  // calculate legal moves
  legalMoves = pieceObj.getLegalMoves(originalX, originalY, board);

  // highlight them
  document.querySelectorAll('.grid-square').forEach((sq, i) => {
    const sx = i % 8; // convert index to x coordinate
    const sy = Math.floor(i / 8); // convert index to y coordinate
    if (legalMoves.some(([lx, ly]) => lx === sx && ly === sy)) {
      sq.classList.add('highlight');
    }
  });

  // clone for dragging
  const clone = draggedPiece.cloneNode(true);
  clone.classList.add('dragging');
  clone.style.left = `${e.pageX}px`;
  clone.style.top = `${e.pageY}px`;
  document.body.appendChild(clone);

  draggedPiece._clone = clone;

  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', endDrag);
}

function onDrag(e) {
  if (!draggedPiece || !draggedPiece._clone) return;
  const clone = draggedPiece._clone;
  clone.style.left = `${e.pageX}px`;
  clone.style.top = `${e.pageY}px`;
}

function endDrag(e) {
  if (!draggedPiece || !draggedPiece._clone) return;

  const clone = draggedPiece._clone;
  const squares = document.querySelectorAll('.grid-square');

  let dropped = false; // tracks if move was valid
  for (const [i, square] of squares.entries()) {
    const rect = square.getBoundingClientRect();
    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    ) {
      const dropX = i % 8; // destination column
      const dropY = Math.floor(i / 8); // destination row

      // check legality
      if (legalMoves.some(([lx, ly]) => lx === dropX && ly === dropY)) {
        // update board state
        board[dropY][dropX] = board[originalY][originalX];
        board[originalY][originalX] = null;

        // update DOM: clear target square, append piece there
        square.innerHTML = '';
        square.appendChild(draggedPiece);
        draggedPiece.setAttribute('data-x', dropX);
        draggedPiece.setAttribute('data-y', dropY);

        dropped = true; 
      }
      break;
    }
  }

  if (!dropped) {
    // if dropped outside valid square, snapz backz
    const origIndex = originalY * 8 + originalX;
    squares[origIndex].appendChild(draggedPiece);
  }

  // gets rid of like everything
  clone.remove();
  draggedPiece._clone = null;
  draggedPiece = null;

  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', endDrag);
}
