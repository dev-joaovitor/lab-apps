import { Request, Response } from "express";
import pdf from "pdf-parse";


export async function storeSkalarAnalysis(req: Request, res: Response) {

    return;
};

export async function extractSkalarData(req: Request, res: Response) {
    const file = req.files[Object.keys(req.files)[0]];

    const resultData = {};

    pdf(file).then((res: any) => {
        // raw parsed text from pdf
        const text = res.text;
    
        // only the tests filtered
        const allTests = text.split("\n").slice(42);
    
        // only the "U" sample type tests
        const u_Tests = allTests.map((str: string) => str.slice(str.indexOf("U"))).filter(value => value.length > 2);
    
        // array of strings transformed in array
        const newArr = u_Tests.map((str: string) => str.toUpperCase().slice(1).split(""));

        // final test object fill with => key = sample id && value = fan-results
        newArr.map((item: string[]) => resultData[item.slice(0,4).join("")] = parseFloat(item.slice(4).join("").replace(",",".")));
    
    }).finally(() => {
        return res.status(200).json({ status: "success", message: JSON.stringify(resultData) });
    })
};