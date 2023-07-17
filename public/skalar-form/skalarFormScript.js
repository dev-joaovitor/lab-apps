import extractDataSkalar from "./utils/extractDataSkalar.js";

const skalarForm = document.querySelector("#upload-skalar-form");

skalarForm.addEventListener("submit", (e) => {
    e.preventDefault();
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