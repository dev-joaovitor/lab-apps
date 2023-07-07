import { storeWeights } from "./utils/tableApiCalls.js";
import { addWeight, deleteWeight, weights } from "./utils/tableFuncs.js";

const table = document.querySelector("table"),
      addBtn = document.querySelector("#add-weight"),
      sendWeights = document.querySelector("#send-weights"),
      tableInformation = document.querySelector("#table-information");

const cookies = {},
      c = document.cookie.split(/[=;\s]/g).filter(e => e);

for (let i = 0; i < c.length; i+=2) {
    cookies[c[i]] = JSON.parse(decodeURIComponent(c[i+1]));
}
tableInformation.textContent = `Lote: ${cookies.form.batchNo} | Equip.: ${cookies.form.equipment}`;

if (cookies.weights) {
    for (let key in cookies.weights) {
        for (let value of cookies.weights[key]) {
            if (value) addWeight(value);
        }
    }
}

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

    if (res.error) return tableError.textContent = res.error;

    document.cookie = "weights=; Max-age=-1";
})