export let column = 1,
           row = 1,
           last = [1,1],
           edit = false;

export function addWeight(value) {
    console.log(last)

    const cell = document.querySelector(`#C${column}-R${row}`);
          cell.textContent = value;
          cell.classList.remove("current-cell");
    console.log(cell)
    
    if (row === 20) {
        row = 1; column++;
    } else row++;
    
    if (edit === false) last = [column, row];
        else [column, row] = last;
    
    edit = false;

    document.querySelector(`#C${column}-R${row}`).className = "current-cell";

    return;
}

export function deleteWeight(node) {
    edit = true;
    document.querySelector(`#C${column}-R${row}`).classList.remove("current-cell");
    node.className = "current-cell";
}