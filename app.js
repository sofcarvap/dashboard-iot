const mqtt_server = "46007c7001d645688854c2d78ea54069.s1.eu.hivemq.cloud";
const mqtt_port = 8884;
const mqtt_user = "greenTech_Solutions";
const mqtt_password = "greenTech321!";
const topic = "greentech/horta/luminosidade";

const client = mqtt.connect(`wss://${mqtt_server}:${mqtt_port}/mqtt`, {
    username: mqtt_user,
    password: mqtt_password
});

client.on("connect", () => {
    console.log("Conectado ao broker MQTT");
    document.getElementById("status").innerText = "Conectado";
    document.getElementById("status").className = "badge bg-success";
    // Inscreve no tópico
    client.subscribe(topic, (erro) => {
        if (erro) {
            console.log("Erro ao inscrever no tópico" , erro);
        } else {
            console.log("Inscrito no tópico:", topic);
        }
    });
});

client.on("message", (topic, message) => {
    const agora = new Date();
    const horario = agora.toLocaleTimeString("pt-BR");
    const texto = message.toString();
    console.log("Mensagem recebida:", texto);
    document.getElementById("mensagem").innerText = horario+ " - Luminosidade em LUX - "+ texto;
});