import mqttClient from "./mqttClient";

export default function mqttPublish(topic: string, data: object) {
    mqttClient.publish(topic, JSON.stringify({ step: 10 }), () => console.log("Reseted"));

    return new Promise((res, rej) => {
        setTimeout(() => {
            mqttClient.publish(topic, JSON.stringify(data), (err) => {
                err ? rej(err) : res(`Dados enviados para o Athena MES!`);
            });
        }, 1000 * 30);
    })
}