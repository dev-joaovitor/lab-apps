import { addWeight, column, row, last, deleteWeight } from "./utils/tableFuncs.js";

const table = document.querySelector("table");
const addBtn = document.querySelector("#add-weight")

table.addEventListener("click", (e) => {
    console.log(e.target);

    if (e.target.nodeName === "TD" && !e.target.className) {
        deleteWeight(e.target);
    }
})

let count = 0;

addBtn.addEventListener("click", () => {
    count++;
    addWeight(count);
})