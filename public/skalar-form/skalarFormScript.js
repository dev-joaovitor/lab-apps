import extractDataSkalar from "./utils/extractDataSkalar.js";

const skalarForm = document.querySelector("#upload-skalar-form");
const showPdfBtn = document.querySelector("#show-pdf-btn");
const skalarResult = document.querySelector("#skalar-result");

showPdfBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (skalarResult.childElementCount) {
        skalarResult.innerHTML = "";
    }

    const object = document.createElement("object");
    const file = document.querySelector("#skalar-file-inp").files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        object.data = reader.result;
        object.type = "application/pdf";
        skalarResult.append(object);
    }, false)

    if (file) reader.readAsDataURL(file);
})


skalarForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (skalarResult.childElementCount) {
        skalarResult.innerHTML = "";
    }

    extractDataSkalar();
});