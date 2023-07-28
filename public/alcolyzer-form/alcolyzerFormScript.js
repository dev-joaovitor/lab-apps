import { alcolyzerOptions } from "./utils/alcolyzerOptions.js";
import extractDataAlcolyzer from "./utils/extractDataAlcolyzer.js";

const alcolyzerForm = document.querySelector("#upload-alcolyzer-form"),
      alcolyzerInpFile = document.querySelector("#alcolyzer-file-inp"),
      resultArea = document.querySelector("#file-result"),
      selectFunctionalArea = document.querySelector("#select-functional-area"),
      selectEquipment = document.querySelector("#select-equipment"),
      batchNo = document.querySelector("#batchno-inp"),
      sendBtn = document.querySelector("#send-btn");


alcolyzerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const resultP = document.querySelectorAll("#file-result p");
    if (resultP.length) {
        for (const node of resultP) {
            node.parentNode.removeChild(node);
        }
    }

    const formValues = {
        "functionalArea": selectFunctionalArea.value,
        "alcolyzerEquipment": selectEquipment.value,
        "alcolyzerBatch": batchNo.value
    }

    const formData = new FormData();
    
    for (const [key, value] of Object.entries(formValues)){
        formData.append(key, value);
    }

    formData.append("xlsFile", alcolyzerInpFile.files[0]);

    const p = document.createElement("p");
    p.textContent = "Enviando";
    const sendInterval = setInterval(() => {
        if (p.textContent.includes("...")) return p.textContent = "Enviando";
        p.textContent += ".";
    }, 300);
    resultArea.append(p);
    
    const result = await extractDataAlcolyzer(formData);
    clearInterval(sendInterval);
    
    return p.textContent = result;
});


alcolyzerForm.addEventListener("change", (e) => {
    const formValues = [
        alcolyzerInpFile.value,
        selectFunctionalArea.value,
        selectEquipment.value,
        batchNo.value
    ]
    return sendBtn.disabled = !formValues.every(val => val);
})


selectFunctionalArea.addEventListener("change", async (e) => {
    let value = e.target.value;

    if (value.includes("133")) value = "133";

    const optionElements = [];
    const options = alcolyzerOptions[value];

    selectEquipment.innerHTML = "";

    for (const option of options){
        const optionElement = document.createElement("option");

        optionElement.textContent = option;
        optionElement.value = option;

        optionElements.push(optionElement);
    }

    selectEquipment.append(...optionElements);
})