import extractDataAlcolyzer from "./utils/extractDataAlcolyzer.js";

const alcolyzerForm = document.querySelector("#upload-alcolyzer-form");
const alcolyzerInpFile = document.querySelector("#alcolyzer-file-inp");
const resultArea = document.querySelector("#file-result");

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

    resultArea.append(...result);
})