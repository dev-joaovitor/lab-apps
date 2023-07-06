import { storeWeights } from "./utils/tableApiCalls.js";
import { addWeight, column, row, last, deleteWeight, weights } from "./utils/tableFuncs.js";

const table = document.querySelector("table");
const addBtn = document.querySelector("#add-weight")
const sendWeights = document.querySelector("#send-weights");

const tableInformation = document.querySelector("#table-information");

const cookies = JSON.parse(decodeURIComponent(document.cookie.split("=")[1]));
tableInformation.textContent = `Lote: ${cookies.batchNo} | Equip.: ${cookies.equipment}`;


const tableError = document.querySelector("#table-error");


table.addEventListener("click", (e) => {
    if (e.target.nodeName === "TD" && !e.target.className) {
        deleteWeight(e.target);
    }
})

// mock delete
let count = 0;
addBtn.addEventListener("click", async () => {
    count++;
    addWeight(count);
});
 
sendWeights.addEventListener("click", async () => {
    const res = await storeWeights(weights);

    console.log(res.message);

    if (res.error) tableError.textContent = res.error;
})