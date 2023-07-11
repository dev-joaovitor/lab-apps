const skalarForm = document.querySelector("#upload-skalar-form");
const resultArea = document.querySelector("#file-result");

const extractData = async () => {
    const file = document.querySelector("#skalar-file-inp").files;

    const formData = new FormData();

    Object.keys(file).forEach(key => {
        formData.append(file.item(key).name, file.item(key));
    });

    const res = await fetch("/api/extract-skalar-data", {
        method: "post",
        body: formData,
    });

    const json = await res.json();

    resultArea.textContent = json?.message;

    console.log(json);
}

skalarForm.addEventListener("submit", (e) => {
    e.preventDefault();
    extractData();
})