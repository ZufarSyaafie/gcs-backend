const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");
const { setupWebsocket, generateRandomData } = require("./websocket");

const app = express();
app.use(cors());

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });
setupWebsocket(wss);

app.get("/", (req, res) => {
	const data = generateRandomData();
	res.json(data);
});

server.listen(5555, () => {
	console.log("Server started on http://localhost:5555");
});
