import mqttPublish from "mqtt/mqttPublish";
import { SkalarData } from "./skalarFormat";
import { myDataSource } from "../server-datasource";
import { productivePoints } from "../entity/productivePoints.entity";

export const skalarSender = (skalarData: SkalarData[]) => {
    console.log(skalarData);
    const aux = {
        ODCOMP: ["1111", 100],
        ODFIM: ["2222", 200],
        BRA: ["3333", 300],
        PA: ["4444", 400]
    };

    return new Promise<string>(async (res, rej) => {
        let index = 0;

        const interval = setInterval(async () => {
            if (index === skalarData.length) {
                clearInterval(interval);
                return res("ok");
            }

            const {
                skalarType, skalarEquipment,
                skalarBatchNo, skalarValue
            } = skalarData[index];

            console.log(skalarData[index]);
            
            const productivePoint = (await myDataSource.getRepository(productivePoints).findOneBy({ equipment: skalarEquipment })).productivePoint;

            const payload = {
                step: aux[skalarType][1],
                skalarEquipment: productivePoint,
                skalarBatchNo,
                skalarValue
            }
            
            
            const topic = `/soda/laboratorio/${aux[skalarType][0]}`;

            console.log({ payload, topic });

            // mqttPublish(topic, payload)
            index++;
        }, 5000)
    })
};