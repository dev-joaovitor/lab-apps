const extractDataSkalar = async () => {    
    const file = document.querySelector("#skalar-file-inp").files;
    const skalarResult = document.querySelector("#skalar-result");

    const formData = new FormData();

    Object.keys(file).forEach(key => {
        formData.append(file.item(key).name, file.item(key));
    });


    const h3 = document.createElement("h3");
    let h3Text = "Enviando, aguarde";

    const textAnim = setInterval(() => {
        if (h3Text.includes("....")) h3Text = "Enviando, aguarde";
        h3.textContent = h3Text;
        h3Text += ".";
    }, 300);

    skalarResult.append(h3);

    const res = await fetch("/api/extract-skalar-data", {
        method: "post",
        body: formData,
    });

    const json = await res.json();
    console.log(json);
    
    clearInterval(textAnim);

    h3.textContent = json.message;
}

export default extractDataSkalar;