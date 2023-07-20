import mqttClient from "./mqttClient";

export default async function mqttPublish(topic: string, data: object) {
    console.log(`\n${JSON.stringify({topic, data})}\n`);
    return new Promise(async (res, rej) => {
        console.log("Reseting");
        const resetInterval = setInterval(() => {
            mqttClient.publish(topic, JSON.stringify({ step: 10 }), function() {
                console.log("step: 10")
            });
        }, 2000)
        
        setTimeout(() => {
            clearInterval(resetInterval);
            mqttClient.publish(topic, JSON.stringify(data), (err) => {
                console.log("Data collected, wait 20 seconds until send another...")
                setTimeout(() => { err ? rej(err) : res(`Resolved!`) }, 1000*15);
            });
        }, 1000*20);
    })
}