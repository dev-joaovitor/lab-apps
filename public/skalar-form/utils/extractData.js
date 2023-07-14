const extractData = async () => {
    const resultArea = document.querySelector("#file-result");
    
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

    console.log(json);

    if (json.status === "error") {
        const p = document.createElement("p");
        p.textContent = json.message;
        return resultArea.append(p);
    }

    for (let [key, value] of Object.entries(JSON.parse(json?.message))) {
        const p = document.createElement("p");
        p.textContent = `${key}: ${value}`;
        resultArea.append(p);
    }
}

export default extractData;