const extractDataAlcolyzer = async (body) => {
    const res = await fetch("/api/extract-alcolyzer-data", {
        method: "post",
        body: body,
    });
    const json = await res.json();

    console.log(json);

    return json.message;
}

export default extractDataAlcolyzer;