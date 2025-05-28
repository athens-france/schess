let draggedPiece = null;

function startDrag(e) {
  e.preventDefault();
  draggedPiece = e.target;

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

  for (const square of squares) {
    const rect = square.getBoundingClientRect();
    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    ) {
      square.innerHTML = '';
      square.appendChild(draggedPiece);
      break;
    }
  }

  clone.remove();
  draggedPiece._clone = null;
  draggedPiece = null;

  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', endDrag);
}
