import mqtt from "mqtt";

const mqttClient = mqtt.connect("http://10.175.160.118");

export default mqttClient;