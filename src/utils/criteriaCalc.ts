export default function criteriacalc(weights: { p1: [], p2: [], p3: [], p4: [] }, form: any) {
    form = form[0];
    const { p1, p2, p3, p4 } = weights;
    const { nominalVolume, individualTolerance, waterDensity } = form;

    const v = [];
    const d = [];
    const calcVolume = [];
    const indivAccCriteria = [];
    const di2Sample = [];
    const qnValue = nominalVolume - individualTolerance;

    for (let n = 0; n < 6; n++) {
      v.push((p1[n] - p2[n] - p3[n] + p4[n])/waterDensity);
      d.push((p1[n] - p3[n])/v[n]);
    }

    const avgD = d.reduce((prev, curr) => prev + curr)/6;

    for (let n = 0; n < 20; n++) {
      calcVolume.push((p1[n] - p3[n])/avgD);
      indivAccCriteria.push(calcVolume[n] > qnValue ? "OK" : "NOK");
    }

    const indivVolConformity = indivAccCriteria.every(e => e === "OK") ? "OK" : "NOK";
    const avgVolume = calcVolume.reduce((prev, curr) => prev + curr)/20;

    for (let n = 0; n < 20; n++) {
      di2Sample.push(Math.pow((calcVolume[n] - avgVolume), 2));
    }

    const diSum = di2Sample.reduce((prev, curr) => prev + curr)/19;
    const standardDeviation = Math.pow(diSum, 0.5);
    const avgVolCriteria = nominalVolume - (0.485 * standardDeviation);
    const avgVolConformity = avgVolume >= avgVolCriteria ? "OK" : "NOK";

    return [indivVolConformity, avgVolConformity];
}