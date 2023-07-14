import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

const MB = 5;
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

export default function alcolyzerValidation(req: Request, res: Response, next: NextFunction) {
    const files = req.files;

    if (files === null) {
        return res.status(400).json({ status: "error", message: "Você deve incluir 1 arquivo antes de extrair os dados" });
    }

    const fileKeys = Object.keys(files);

    if (fileKeys[0] !== "xlsFile") {
        return res.status(400).json({ status: "error", message: "Algo deu errado, recarregue a página" })
    }

    if (fileKeys.length > 1) {
        return res.status(400).json({ status: "error", message: "Envie apenas 1 arquivo por vez" })
    }

    for (let key of fileKeys) {
        const file = files[key] as UploadedFile;

        if (!file.name.includes("xls")) {
            return res.status(400).json( { status: "error", message: "O arquivo deve estar em formato XLS" });
        }

        if (file.size > FILE_SIZE_LIMIT) {
            return res.status(400).json({ status: "error", message: `O arquivo ultrapassa o limite de tamanho de ${MB}mb` });
        }
    }
    next();
};
