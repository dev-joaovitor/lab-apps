export default function formValidation(inputs: any) {
    const { userId, batchNo, waterDensity, equipment, nominalVolume } = inputs;

    if (userId < 90000000 || !userId) return { error: 1 };
    if (!batchNo)                     return { error: 2 };
    if (!waterDensity)                return { error: 3 };
    if (!equipment)                   return { error: 4 };
    if (!nominalVolume)               return { error: 5 };

    return { error: false };
}