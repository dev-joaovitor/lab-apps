import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import XLSX from "xlsx";
import { alcolyzerSender } from "../utils/alcolyzerSender";

const names = [
    "alcolyzerIdUnico", "N/A", "N/A", "alcolyzerCondicaoDensidade",
    "alcolyzerAlcool_v", "alcolyzerDensidade", "alcolyzerAlcool_w",
    "alcolyzerExtratoReal", "alcolyzerExtratoAparente", "alcolyzerExtratoOriginal",
    "alcolyzerRDF", "alcolyzerADF", "alcolyzerCalorias"
];


export async function extractAlcolyzerData(req: Request, res: Response) {
    const files = req.files;
    const file = files["xlsFile"] as UploadedFile;
    const workbook = XLSX.read(file.data);
    const result = {}

    for (const sheet of workbook.SheetNames) {
        const sheet2json = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
        const valuesColumn = sheet2json[sheet2json.length - 1];

        let i = 0;
        for (let [_, value] of Object.entries(valuesColumn)) {
            if (names[i] !== "N/A") {
                result[names[i]] = parseFloat(value) || value;
            }
            i++;
        }
    }

    const mqttRes = await alcolyzerSender({...req.body, ...result})

    return res.status(200).json({ status: "success", message: mqttRes })
}