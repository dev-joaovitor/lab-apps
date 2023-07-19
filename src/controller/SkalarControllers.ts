import { Request, Response } from "express";
import pdf from "pdf-parse";
import { SkalarData, skalarFormat } from "../utils/skalarFormat";
import { skalarSender } from "../utils/skalarSender";


export async function storeSkalarAnalysis(req: Request, res: Response) {

    return;
};

export async function extractSkalarData(req: Request, res: Response) {
    const fileName = Object.keys(req.files)[0];
    const file = req.files[fileName];

    const resultData = {};

    const sample = [
        '10IWIWInitialWash6,57', '11A1TTracer311,50',
        '12WTWWash6,57',         '13A1DDrift312,70',
        '14WTWWash6,57',         '15A2S13037,33',
        '16A3S26061,29',         '17A4S3120124,65',
        '18A5S4180154,99',       '19A6S5240237,92',
        '110A7S6300313,82',      '111A7DDrift314,53',
        '112WTWWash6,57',        '113A8Ubwc145,41',
        '114A9Ubwc242,64',       '115A10Ubwc345,80',
        '116A11U-ODCOMP-OD04-912-145,24',     '117A12U-odfim-od47-171-161,22',
        '118A13U-odfim-od11-341-223,95',     '119A14DDrift314,84',
        '120WTWWash6,57',        '121A15U-ODCOMP-OD54-2-143,09',
        '122A16U-pA-eCh1541-1000-59,99',      '123A17U-bra-bRa2-938-170,26',
        '124A18U-pA-eCh1512-15-156,38',     '125A19DDrift306,20',
        '126A20WWash6,57',       '127A19U-pA-eCh1502-1700-308,80',
        '128A20U-ODCOMP-OD04-912-64,50',      '129A21U-bra-bRA1-1138-201,86',
        '130A22U-pA-eCh2503-1000-181,27',     '131A23DDrift183,85',
        '132WTWWash6,57',        '133EEEndRun6,57'
      ]

      const skalarData: SkalarData[] = skalarFormat(sample);

      const resusu = await skalarSender(skalarData);

      console.log(resusu);

    pdf(file).then((res: any) => {
        // raw parsed text from pdf
        const text = res.text;
        console.log(text)
        console.log("\n\n")
    
        // only the tests filtered
        const allTests = text.split("\n").slice(42);
        console.log(allTests)
        console.log("\n\n")
    
    }).finally(() => {
        return res.status(200).json({ status: "success", message: "Dados coletados com sucesso!" });
    })
};