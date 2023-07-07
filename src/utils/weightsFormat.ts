export default function weightsFormat(form: any, weights: object) {
    form = form[0];
    const payload = { "step": 101 };

    for (let key in form) payload[key] = form[key];

    for (let [key, arr] of Object.entries(weights)) {
        if (key !== "batchNo") {
            arr.map((weight: number, index: number) => {
                payload[`${key}_${index+1}`] = weight;
            });
        }
    }
    return payload;
}