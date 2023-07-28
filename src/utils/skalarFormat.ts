export interface SkalarData {
    skalarType: string;
    skalarEquipment: string;
    skalarBatchNo: number;
    skalarValue: number;
}

export function skalarFormat(strArr: string[]): SkalarData[] {
    const patternRegex: RegExp = new RegExp(/-(\w+-){2}\d+-/gmi);

    // all string to uppercase
    const result: SkalarData[] = strArr.map((str: string) => {
        // const regExp: RegExp = new RegExp(/-(\w+-){2}\d+-/gmi);
        // console.log(str)
        return str.toUpperCase()
    })

    // filter the pattern format
    .filter((str: string) => str.match(patternRegex))

    // split the filtered strings by => " - " and transform the values into an object
    .map((str: string) => {
        console.log(str)
        let splitted: any = str.split("-");
            splitted = splitted.slice(1);

        const data: SkalarData = {
            skalarType: splitted[0],
            skalarEquipment: splitted[1],
            skalarBatchNo: parseInt(splitted[2]),
            skalarValue: parseFloat(splitted[splitted.length-1].replace(",",".")),
        }

        if (data.skalarType.includes("OD")){
            const odNum = parseInt(data.skalarEquipment.slice(2));

            if (odNum < 10){
                data.skalarEquipment = `OD0${odNum}`
            }
        }

        return data;
    });
    return result;
}