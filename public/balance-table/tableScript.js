import { calcCriteria, storeWeights } from "./utils/tableApiCalls.js";
import { addWeight, deleteWeight, weights } from "./utils/tableFuncs.js";

const weightTable = document.querySelector("#weight-table"),
      addBtn = document.querySelector("#add-weight"),
      sendWeightsBtn = document.querySelector("#send-weights"),
      tableResult = document.querySelector("p#weight-table-result span"),
      calcCriteriaBtn = document.querySelector("#calc-criteria"),
      tableInformation = document.querySelector("#table-information"),
      criteriaIndividualVolume = document.querySelector("#criteria-individual-volume"),
      criteriaAverageVolume = document.querySelector("#criteria-average-volume");

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


weightTable.addEventListener("click", (e) => {
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


sendWeightsBtn.addEventListener("click", async () => {
    let msg = "Enviando";

    const textAnim = setInterval(() => {
        if (msg === "Enviando....") msg = "Enviando";
        tableResult.textContent = msg;
        msg += ".";
    }, 200);

    const res = await storeWeights(weights);

    console.log(res);
    clearInterval(textAnim);
    
    document.cookie = "weights=; Max-age=-1";

    return tableResult.textContent = res.sodaResult ?? res.error;
})

calcCriteriaBtn.addEventListener("click", async () => {
    criteriaIndividualVolume.removeAttribute("class");
    criteriaIndividualVolume.textContent = "-";

    criteriaAverageVolume.removeAttribute("class");
    criteriaAverageVolume.textContent = "-";

    const res = await calcCriteria(weights);

    if (res.error) return tableResult.textContent = res.error;

    const [CIV, CAV] = res;

    if (!CIV || !CAV) return;

    criteriaIndividualVolume.textContent = CIV;
    criteriaIndividualVolume.classList.add(`criteria-${CIV.toLowerCase()}`);

    criteriaAverageVolume.textContent = CAV;
    criteriaAverageVolume.classList.add(`criteria-${CIV.toLowerCase()}`);
})