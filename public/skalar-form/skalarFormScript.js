import extractData from "./utils/extractData.js";

const skalarForm = document.querySelector("#upload-skalar-form");

skalarForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const result = document.querySelectorAll("#file-result p");
    
    if (result.length) result[0].parentNode.removeChild(result[0]);

    extractData();
});