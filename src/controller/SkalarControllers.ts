import { Request, Response } from "express";
import pdf from "pdf-parse";
import { skalarPatternValidation, skalarData } from "../utils/skalarPatternValidation";


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
        '126A20WWash6,57',       '127A19U-pA-eCh3502-1000-308,80',
        '128A20U-ODCOMP-OD04-912-64,50',      '129A21U-bra-bRA1-1138-201,86',
        '130A22U-pA-eCh2503-1000-181,27',     '131A23DDrift183,85',
        '132WTWWash6,57',        '133EEEndRun6,57'
      ]

      const skalarObjectArray = skalarPatternValidation(sample);

    //   const tetet = await new Promise<string>((resolve, reject) => {
    //     let i = 0;
      
    //     const int = setInterval(() => {
    //       if (i === skalarObjectArray.length) {
    //         clearInterval(int);
    //         return resolve("done");
    //     }
  
    //       const b = skalarObjectArray[i];
    //       // { skalarType, skalarEquipment, skalarBatchNo, skalarValue }
  
    //       console.log(b)
    //       i++;
    //     }, 2000)
    //   })

    //   console.log(tetet)

    pdf(file).then((res: any) => {
        // // raw parsed text from pdf
        // const text = res.text;
        // console.log(text)
        // console.log("\n\n")
    
        // // only the tests filtered
        // const allTests = text.split("\n").slice(42);
        // console.log(allTests)
        // console.log("\n\n")
        
        // // only the "U" sample type tests
        // const u_Tests = allTests.map((str: string) => str.slice(str.indexOf("U"))).filter(value => value.length > 2);
        // console.log(u_Tests)
        // console.log("\n\n")

        // // array of strings transformed in array
        // const newArr = u_Tests.map((str: string) => str.toUpperCase().slice(1).split(""));
        // console.log(newArr)
        // console.log("\n\n")

        // // final test object fill with => key = sample id && value = fan-results
        // newArr.map((item: string[]) => resultData[item.slice(0,4).join("")] = parseFloat(item.slice(4).join("").replace(",",".")));
        // console.log(resultData)
        // console.log("\n\n")
    
    }).finally(() => {
        // return res.status(200).json({ status: "success", message: JSON.stringify(resultData) });
        return res.status(200).json({ status: "success", message: JSON.stringify({ ":D": ":)"}) });
    })
};