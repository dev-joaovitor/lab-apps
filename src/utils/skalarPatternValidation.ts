export interface skalarData {
    skalarType: string;
    skalarEquipment: string;
    skalarBatchNo: number;
    skalarValue: number;
}

export function skalarPatternValidation(strArr: string[]): skalarData[] {
    const patternRegex: RegExp = new RegExp(/-(\w+-){2}\d+-/gmi);

    // all string to uppercase
    const result: skalarData[] = strArr.map((str: string) => str.toUpperCase())

    // filter the pattern format
    .filter((str: string) => str.match(patternRegex))

    // split the filtered strings by => " - " and transform the values into an object
    .map((str: string) => {
        let splitted: any = str.split("-");
            splitted = splitted.slice(1);
        
        const data: skalarData = {
            skalarType: splitted[0],
            skalarEquipment: splitted[1],
            skalarBatchNo: parseInt(splitted[2]),
            skalarValue: parseFloat(splitted[3].replace(",",".")),
        }
        return data;
    });
    return result;
}