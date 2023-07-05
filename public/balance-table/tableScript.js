import { addWeight, column, row, last, deleteWeight, weights } from "./utils/tableFuncs.js";

const table = document.querySelector("table");
const addBtn = document.querySelector("#add-weight")
const sendWeights = document.querySelector("#send-weights");

table.addEventListener("click", (e) => {
    console.log(e.target);
    console.log(weights);

    if (e.target.nodeName === "TD" && !e.target.className) {
        deleteWeight(e.target);
    }
})

let count = 0;

addBtn.addEventListener("click", async () => {
    count++;
    addWeight(count);
});
 
sendWeights.addEventListener("click", async () => {
    console.log(weights);

    const res = await fetch("/api/store-weights", {
        method: "post",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(weights),
    }).catch(e => console.log(e))

    const result = await res.json()

    console.log(result.message);
})