#HTML
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Smart Home Jogja</title>
  <link rel="stylesheet" href="style.css">
  <script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>
</head>
<body>

<h1>Dashboard Smart Home – Rumah Jogja</h1>

<div class="card">
  <h2>Kamar 1</h2>
  <p>Status Penghuni: <span id="occ1">-</span></p>
  <p>Lampu: <span id="lamp1">-</span></p>
  <button onclick="lampOn()">Nyalakan</button>
  <button onclick="lampOff()">Matikan</button>
</div>

<div class="card">
  <h2>Utilitas</h2>
  <p>Mesin Cuci: <span id="washer">-</span></p>
  <button onclick="washerOff()">Matikan Mesin Cuci</button>
</div>

<script src="script.js"></script>
</body>
</html>

#CSS
body {
  font-family: Arial, sans-serif;
  background: #f4f6f8;
  padding: 20px;
}

h1 {
  text-align: center;
}

.card {
  background: white;
  padding: 15px;
  margin: 15px auto;
  width: 300px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

button {
  margin: 5px;
  padding: 8px 12px;
  cursor: pointer;
}

#js.script
const broker = "wss://broker.hivemq.com:8884/mqtt";
const client = mqtt.connect(broker);

client.on("connect", () => {
  console.log("Connected to MQTT");
  client.subscribe("rumah/jogja01/kamar1/#");
  client.subscribe("rumah/jogja01/util/#");
});

client.on("message", (topic, message) => {
  const msg = message.toString();

  if (topic.includes("occupancy")) {
    document.getElementById("occ1").innerText =
      msg === "true" ? "Dihuni" : "Kosong";
  }

  if (topic.includes("lamp/status")) {
    document.getElementById("lamp1").innerText = msg;
  }
});

function lampOn() {
  client.publish("rumah/jogja01/kamar1/lamp/cmd", "ON");
}

function lampOff() {
  client.publish("rumah/jogja01/kamar1/lamp/cmd", "OFF");
}

function washerOff() {
  client.publish("rumah/jogja01/util/washer/cmd", "OFF");
}

