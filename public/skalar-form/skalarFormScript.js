import extractDataSkalar from "./utils/extractDataSkalar.js";

const skalarForm = document.querySelector("#upload-skalar-form");
const showPdfBtn = document.querySelector("#show-pdf-btn");
const previewPdf = document.querySelector("#preview-pdf");

showPdfBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (previewPdf.childElementCount) {
        previewPdf.innerHTML = "";
    }

    const iframe = document.createElement("iframe");
    const file = document.querySelector("#skalar-file-inp").files[0];
    const reader = new FileReader();
    
    reader.addEventListener("load", () => {
        iframe.src = reader.result;
        previewPdf.append(iframe);
    }, false)

    if (file) reader.readAsDataURL(file);
})


skalarForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (previewPdf.childElementCount) {
        previewPdf.innerHTML = "";
    }

    const resultTbody = document.querySelectorAll("#file-result tbody tr");
    const resultThead = document.querySelectorAll("#file-result thead tr");
    
    if (resultThead.length) {
        for (const node of resultTbody) {
            node.parentNode.removeChild(node);
        }
        for (const node of resultThead) {
            node.parentNode.removeChild(node);
        }
    }

    extractDataSkalar();
});