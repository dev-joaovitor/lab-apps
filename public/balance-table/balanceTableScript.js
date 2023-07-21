import { calcCriteria, storeWeights } from "./utils/tableApiCalls.js";
import { addWeight, deleteColumn, deleteWeight, weights } from "./utils/tableFuncs.js";

const weightTable = document.querySelector("#weight-table"),
      sendWeightsBtn = document.querySelector("#send-weights"),
      tableResult = document.querySelector("p#weight-table-result span"),
      calcCriteriaBtn = document.querySelector("#calc-criteria"),
      criteriaIndividualVolume = document.querySelector("#criteria-individual-volume"),
      criteriaAverageVolume = document.querySelector("#criteria-average-volume"),
      resetBtn = document.querySelector("#reset-btn");

weightTable.addEventListener("click", (e) => {
    if (e.target.nodeName === "TD" && !e.target.className) {
        deleteWeight(e.target);
    }

    if (e.target.nodeName === "TH" && !e.target.className) {
        deleteColumn(e.target);
    }
})

const ws = new WebSocket("ws://localhost:9999");

ws.onopen = () => console.log("WebSocket connected");
ws.onclose = () => console.log("WebSocket disconnected");
ws.onerror = () => console.error("An error occurred trying to connect to WebSocket");
ws.onmessage = (msg) => {
    const value = parseFloat(msg.data);

    if (typeof value === "number") addWeight(value);
}

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
    tableResult.textContent = "";

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

    if (CIV === "OK" && CAV === "OK") sendWeightsBtn.disabled = false;
})

resetBtn.addEventListener("click", (e) => {
    if (!confirm('Seus dados serão apagados, deseja continuar?')) return;
    
    document.cookie = "form=; Max-age=-1; Path=/";
    document.cookie = "weights=; Max-age=-1";
    location.reload();
})