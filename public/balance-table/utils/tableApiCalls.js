export async function storeWeights(weights) {
    const res = await fetch("/api/store-weights", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(weights),
    }).catch(e => console.log(e))

    return await res.json();
}