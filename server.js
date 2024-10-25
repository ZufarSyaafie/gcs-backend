const express = require("express");
const http = require("http");
const cors = require("cors");
const { setupWebsocket, generateRandomData } = require("./websocket");

const app = express();
app.use(
	cors({
		origin: "*",
		methods: ["GET"],
	})
);

app.options("*", cors());

const server = http.createServer(app);

const io = require("socket.io")(server, {});
setupWebsocket(io);

app.get("/", (req, res) => {
	const data = generateRandomData();
	res.json(data);
});

server.listen(5555, () => {
	console.log("Server started on http://localhost:5555");
});
