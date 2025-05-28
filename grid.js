const grid_data = Array(64).fill().map(() => []);
const grid_container = document.getElementById('grid');

grid_data.forEach((cloneElement, index) => {
    const cell_div = document.createElement('div');
    cell_div.classList.add('grid-square');
    grid_container.appendChild(cell_div);

    const x = index % 8;
    const y = Math.floor(index / 8); // super rough coordinate system

    if (( x + y) % 2 === 0) {
        cell_div.classList.add('light');
    } else {
        cell_div.classList.add('dark');
    }
})
