import extractDataSkalar from "./utils/extractDataSkalar.js";

const skalarForm = document.querySelector("#upload-skalar-form");

skalarForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const result = document.querySelectorAll("#file-result p");
    
    if (result.length) {
        for (const node of result) {
            node.parentNode.removeChild(node);
        }
    }
    extractDataSkalar();
});