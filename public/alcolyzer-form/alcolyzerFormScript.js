import { alcolyzerOptions } from "./utils/alcolyzerOptions.js";
import extractDataAlcolyzer from "./utils/extractDataAlcolyzer.js";

const alcolyzerForm = document.querySelector("#upload-alcolyzer-form"),
      alcolyzerInpFile = document.querySelector("#alcolyzer-file-inp"),
      resultArea = document.querySelector("#file-result"),
      selectFunctionalArea = document.querySelector("#select-functional-area"),
      selectEquipment = document.querySelector("#select-equipment");

alcolyzerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();
    
    formData.append("xlsFile", alcolyzerInpFile.files[0]);

    const resultP = document.querySelectorAll("#file-result p");
    
    if (resultP.length) {
        for (const node of resultP) {
            node.parentNode.removeChild(node);
        }
    }
    const result = await extractDataAlcolyzer(formData);

    if (result.length) return resultArea.append(...result);

    return resultArea.append(result);
});

selectFunctionalArea.addEventListener("change", async (e) => {
    const value = e.target.value;

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