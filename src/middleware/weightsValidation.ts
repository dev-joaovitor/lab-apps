export default function weightsValidation(weights: object) {
    for (let key in weights) {
        if (key === "p1" || key === "p3") {
            if (weights[key].length !== 20) return { "error": "Preencha a tabela antes de continuar" };
        } else if (key === "p2" || key === "p4") {
            if (weights[key].length !== 6) return { "error": "Preencha a tabela antes de continuar" };
        }
    }
    return 0;
};
