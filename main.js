import { addWeight, column, row, last, deleteWeight } from "./utils/tableFuncs.js";

const table = document.querySelector("table");
const addBtn = document.querySelector("#add-weight")

table.addEventListener("click", (e) => {
    console.log(`C${column}, R${row}`)
    console.log(last)
    deleteWeight(e.target);
})

addBtn.addEventListener("click", () => {
    addWeight(123213);
})