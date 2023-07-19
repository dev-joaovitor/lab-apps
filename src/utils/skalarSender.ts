import mqttPublish from "../mqtt/mqttPublish";
import { SkalarData } from "./skalarFormat";
import { myDataSource } from "../server-datasource";
import { productivePoints } from "../entity/productivePoints.entity";

export const skalarSender = async (skalarData: SkalarData[]) => {
    for (const skalarObj of skalarData) {
        const topic = `/soda/laboratorio/12399`;
        const {
            skalarType, skalarEquipment,
            skalarBatchNo, skalarValue
        } = skalarObj;

        const steps = {
            ODCOMP: 100,
            ODFIM: 200,
            BRA: skalarEquipment === "BRA1" ? 300 : 400,
            PA: 500
        };

        const productivePoint = (await myDataSource.getRepository(productivePoints).findOneBy({ equipment: skalarEquipment })).productivePoint;
        const payload = {
            step: steps[skalarType],
            skalarEquipment: productivePoint,
            skalarBatchNo,
            skalarValue
        }
        const mqttRes = await mqttPublish(topic, payload);
        console.log(mqttRes);
    }
    return "Ok";
};