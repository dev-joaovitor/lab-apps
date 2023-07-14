const extractDataAlcolyzer = async (body) => {

    const res = await fetch("/api/extract-alcolyzer-data", {
        method: "post",
        body: body,
    });

    const json = await res.json();

    console.log(json);

    if (json.status === "error") {
        const p = document.createElement("p");
        p.textContent = json.message;
        return p;
    }

    const ps = [];
    for (let [key, value] of Object.entries(JSON.parse(json?.message))) {
        const p = document.createElement("p");
        p.textContent = `${key}: ${value}`;
        ps.push(p);
    }
    return ps;
}

export default extractDataAlcolyzer;