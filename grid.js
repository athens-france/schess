window.onload = function() {

const grid_data = Array(64).fill().map(() => []);
const grid_container = document.getElementById('grid');

const piece_positions = [
  'br','bn','bb','bq','bk','bb','bn','br',
  'bp','bp','bp','bp','bp','bp','bp','bp',
  null,null,null,null,null,null,null,null,
  null,null,null,null,null,null,null,null,
  null,null,null,null,null,null,null,null,
  null,null,null,null,null,null,null,null,
  'wp','wp','wp','wp','wp','wp','wp','wp',
  'wr','wn','wb','Boognish','wk','wb','wn','wr'
];

piece_positions.forEach((code, index) => {
  const x = index % 8;
  const y = Math.floor(index / 8);

  const cell_div = document.createElement('div');
  cell_div.classList.add('grid-square');
  if ((x + y) % 2 === 0) {
    cell_div.classList.add('light');
  } else {
    cell_div.classList.add('dark');
  }

  if (code) {
    const piece = document.createElement('img');
    piece.src = `pieces/${code}.png`;
    piece.classList.add('chess-piece');
    piece.setAttribute('data-piece', code);

    // manual drag handlers
    piece.addEventListener('mousedown', startDrag);

    cell_div.appendChild(piece);
  }

  grid_container.appendChild(cell_div);
});

}

