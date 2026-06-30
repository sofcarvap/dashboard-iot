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

    console.log("Conectado!");

    document.getElementById("status").innerHTML = "🟢 Conectado";
    document.getElementById("status").className = "badge bg-success";

    client.subscribe(topic);

});

client.on("message", (topic, message) => {

    const lux = parseFloat(message.toString());

    const agora = new Date();

    document.getElementById("hora").innerHTML =
        "Atualizado: " + agora.toLocaleTimeString("pt-BR");

    document.getElementById("valorLux").innerHTML = lux.toFixed(0);

    document.getElementById("mensagem").innerHTML =
        agora.toLocaleTimeString("pt-BR") +
        " • Luminosidade: <b>" + lux + " LUX</b>";

    // barra de progresso
    // considerando máximo de 1000 lux
    let porcentagem = (lux / 1000) * 100;

    if (porcentagem > 100)
        porcentagem = 100;

    document.getElementById("barraLux").style.width =
        porcentagem + "%";

});

client.on("error", () => {

    document.getElementById("status").innerHTML = "🔴 Desconectado";
    document.getElementById("status").className = "badge bg-danger";

});