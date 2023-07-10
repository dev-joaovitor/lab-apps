export let column = 1,
           row = 1,
           completedColumns = [],
           last = [1,1],
           node = false,
           toEdit = false;

export const weights = { "p1": [], "p2": [], "p3": [], "p4": [] }

export function addWeight(value) {
    if (completedColumns.length === 4 && node === false) return;

    document.querySelector("p#weight-table-result span").textContent = "";
    
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

export function deleteColumn(columnNode) {
    if (toEdit) return;

    document.querySelector(`.current-cell`)?.classList.remove("current-cell");

    column = parseInt(columnNode.id.split("p").slice(1));
    row = 1;

    weights[columnNode.id] = [];

    for (let i = 1; i < 21; i++) {
        document.getElementById(`${column}-${i}`).textContent = "";
    }

    completedColumns.splice(completedColumns.indexOf(column), 1);

    return document.getElementById(`${column}-${row}`).className = "current-cell";
}

const cookies = {},
      c = document.cookie.split(/[=;\s]/g).filter(e => e);

for (let i = 0; i < c.length; i+=2) cookies[c[i]] = JSON.parse(decodeURIComponent(c[i+1]));

document.querySelector("#table-information span").textContent = `Lote: ${cookies.form.batchNo} | Equip.: ${cookies.form.equipment}`;

if (cookies.weights) {
    for (let key in cookies.weights) {
        for (let value of cookies.weights[key]) {
            if (value) addWeight(value);
        }
    }
}