const extractDataSkalar = async () => {
    const resultAreaBody = document.querySelector("table#file-result tbody");
    const resultAreaHead = document.querySelector("table#file-result thead");
    
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


    const theadTr = document.createElement("tr");
    const theadTh1 = document.createElement("th");
    const theadTh2 = document.createElement("th");

    if (json.status === "error") {
        theadTh1.textContent = "Erro";
        theadTr.appendChild(theadTh1);
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.textContent = json.message;
        tr.append(td);
        resultAreaBody.append(tr);
    }

    
    if (json.status === "success") {
        theadTh1.textContent = "ID";
        theadTh2.textContent = "Resultado";
        theadTr.append(...[theadTh1, theadTh2]);

        for (let [key, value] of Object.entries(JSON.parse(json?.message))) {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            td1.textContent = key;
            td2.textContent = value;
            tr.append(...[td1,td2]);
            resultAreaBody.append(tr);
        }
    }
    resultAreaHead.append(theadTr);
}

export default extractDataSkalar;