import mqttPublish from "../mqtt/mqttPublish";
import { myDataSource } from "../server-datasource";
import { productivePoints } from "../entity/productivePoints.entity";

export const alcolyzerSender = async (data: any) => {
    const topic = "/soda/laboratorio/12492"
    let {
        functionalArea,
        alcolyzerEquipment,
        alcolyzerBatch,
        ...alcolyzerValues
    } = data;

    const steps = {
        "1332": 100,
        "1331": 200,
        "142": 300,
        "121": 400,
        "34": alcolyzerEquipment.includes("512") ? 550 : 500,
        "71": 600,
        "12": 700,
    }

    alcolyzerEquipment = (await myDataSource.getRepository(productivePoints).findOneBy({ equipment: alcolyzerEquipment })).productivePoint;

    const payload = {
        step: steps[functionalArea],
        alcolyzerBatch: parseInt(alcolyzerBatch),
        alcolyzerEquipment,
        ...alcolyzerValues
    }

    console.log(payload)

    const mqttRes = await mqttPublish(topic, payload);
    return mqttRes;
};