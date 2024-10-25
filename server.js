const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");
const { setupWebsocket, generateRandomData } = require("./websocket");

const app = express();
app.use(cors());

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });
(async () => {
	await setupWebsocket(wss);
})();

app.get("/", async (req, res) => {
	const data = await generateRandomData();
	res.json(data);
});

server.listen(8080, () => {
	console.log("Server started on http://localhost:3001");
});
