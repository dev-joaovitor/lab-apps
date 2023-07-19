import mqttClient from "./mqttClient";

export default async function mqttPublish(topic: string, data: object) {
    return new Promise(async (res, rej) => {
        mqttClient.publish(topic, JSON.stringify({ step: 10 }), function() {
            console.log("Reseted");
        });
        
        setTimeout(() => {
            mqttClient.publish(topic, JSON.stringify(data), (err) => {
                setTimeout(() => err ? rej(err) : res(`Dados enviados para o Athena MES!`), 1000*15);
            });
        }, 1000*10);
    })
}