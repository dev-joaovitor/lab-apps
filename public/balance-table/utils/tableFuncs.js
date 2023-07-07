export let column = 1,
           row = 1,
           completedColumns = [],
           last = [1,1],
           node = false,
           toEdit = false;
// TODO: change step to 100.....
export const weights = { "p1": [], "p2": [], "p3": [], "p4": [] }



export function addWeight(value) {
    if (completedColumns.length === 4 && node === false) return;
    
    const cell = document.getElementById(`${column}-${row}`);
    
    if (cell.textContent && toEdit === false) {
        if (cell.textContent === "-") return;
        
        row++
        if (row === 21) {
            row = 1;
            column++;
        }
        document.querySelector(`.current-cell`)?.classList.remove("current-cell");
        return addWeight(value);
    }
    
    toEdit = false;
    
    if (value !== "-") weights[`p${column}`].splice(row - 1, 0, value);

    document.cookie = "weights=" + encodeURIComponent(JSON.stringify(weights));
    cell.textContent = value;
    cell.classList.remove("current-cell");

    if (row === 20) {
        row = 1;
        if (!completedColumns.includes(column)) {
            completedColumns.push(column);
        }
        column++;
        console.log(completedColumns);
    } else row++;

    if ((column === 2 || column === 4) && row >= 7) {
        addWeight("-");
    }

    if (node) {
        [column, row] = last;
    } else last = [column, row];

    try {
        document.getElementById(`${column}-${row}`).className = "current-cell";
    } catch {(e) => {
        throw e;
    }}

    return node = false;
}



export function deleteWeight(selectedNode) {
    if (node) return;

    if (isNaN(parseFloat(selectedNode.textContent))) return;

    [column, row] = selectedNode.id.split("-");
    [column, row] = [parseInt(column), parseInt(row)];

    if ((column === 2 || column === 4) && row >= 7) return [column, row] = last;
    
    toEdit = true;

    weights[`p${column}`].splice(row - 1, 1);

    document.querySelector(`.current-cell`)?.classList.remove("current-cell");
    node = selectedNode;
    node.className = "current-cell";
    return;
}