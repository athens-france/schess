
const board = Array.from({ length: 8 }, () => Array(8).fill(null));

class Piece {
  constructor(color, type) {
    this.color = color; // 'w' or 'b'
    this.type = type;   // 'p','r','n','b','q','k'
  }
  getLegalMoves(x, y, board) {
    return []; // by default theres no legal moves, which i guess kinda makes sense
  }
}

class Rook extends Piece {
  constructor(color) {
    super(color, 'r');
  }

  getLegalMoves(x, y, board) {
    const moves = [];
    // left, right, up, down
    const directions = [
      [1, 0], [-1, 0],
      [0, 1], [0, -1]
    ];
    // for each direction walk until u bump into someone
    for (const [dx, dy] of directions) {
      let cx = x + dx;
      let cy = y + dy;
      while (cx >= 0 && cx < 8 && cy >= 0 && cy < 8) {
        if (board[cy][cx] === null) {
          moves.push([cx, cy]); // empty square is valid
        } else {
          if (board[cy][cx].color !== this.color) {
            moves.push([cx, cy]); // if occupied, capture then stop
          }
          break;
        }
        cx += dx; // slide until bump or end of board
        cy += dy; // i used chat gpt for 15% of this ngl
      }
    }

    return moves;
  }
}

class Pawn extends Piece {
  constructor(color) {
    super(color, 'p');
  }

  getLegalMoves(x, y, board) {
    const moves = [];
    const dir = this.color === 'w' ? -1 : 1; // white moves up, black down

    // 1 forward
    if (y + dir >= 0 && y + dir < 8 && board[y + dir][x] === null) {
      moves.push([x, y + dir]);

      // 2 forward from start row
      if (
        (this.color === 'w' && y === 6) ||
        (this.color === 'b' && y === 1)
      ) {
        if (board[y + 2 * dir][x] === null) {
          moves.push([x, y + 2 * dir]);
        }
      }
    }

    // captures diagonally (left + right)
    // side note: add en passant later
    for (const dx of [-1, 1]) {
      const cx = x + dx;
      const cy = y + dir;
      if (cx >= 0 && cx < 8 && cy >= 0 && cy < 8) {
        if (board[cy][cx] && board[cy][cx].color !== this.color) {
          moves.push([cx, cy]);
        }
      }
    }

    return moves;
  }
}

function createPiece(code) {
  if (!code) return null;
  const color = code[0] === 'w' ? 'w' : 'b'; // color
  const type = code[1]; // piece type

  if (type === 'r') return new Rook(color);
  if (type === 'p') return new Pawn(color);
  return new Piece(color, type); // other types are just garbage for now
}

window.onload = function() {
  const grid_container = document.getElementById('grid');

  const piece_positions = [
    'br','bn','bb','bq','bk','bb','bn','br',
    'bp','bp','bp','bp','bp','bp','bp','bp',
    null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,
    'wp','wp','wp','wp','wp','wp','wp','wp',
    'wr','wn','wb','wq','wk','wb','wn','wr'
  ];

  piece_positions.forEach((code, index) => {
    const x = index % 8;
    const y = Math.floor(index / 8);

    const cell_div = document.createElement('div');
    cell_div.classList.add('grid-square', (x + y) % 2 === 0 ? 'light' : 'dark');

    if (code) {
      const pieceObj = createPiece(code);
      board[y][x] = pieceObj;

      const pieceImg = document.createElement('img');
      pieceImg.src = `pieces/${code}.png`;
      pieceImg.classList.add('chess-piece');
      pieceImg.setAttribute('data-x', x);
      pieceImg.setAttribute('data-y', y);

      pieceImg.addEventListener('mousedown', startDrag);
      cell_div.appendChild(pieceImg);
    }

    grid_container.appendChild(cell_div);
  });
};
