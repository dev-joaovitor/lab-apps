import { Request, Response } from "express";
import pdf from "pdf-parse";


export async function storeSkalarAnalysis(req: Request, res: Response) {

    return;
};

export async function extractSkalarData(req: Request, res: Response) {
    const file = req.files[Object.keys(req.files)[0]];

    const resultData = {};

    let sample = ["fanod-32-32", "firocs-32-23", "FANBRA-BRA2-329"];

    console.log(sample.map(e => e.toUpperCase()).filter(e => e.includes("FAN")));


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
        return res.status(200).json({ status: "success", message: JSON.stringify({ ":)": ":D"}) });
    })
};