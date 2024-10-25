const express = require("express");
const http = require("http");
const cors = require("cors");
const { setupWebsocket, generateRandomData } = require("./websocket");

const app = express();
app.use(cors());

const server = http.createServer(app);

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "https://zufarsyaafie.github.io");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	next();
});

const io = require("socket.io")(server, {
	cors: {
		origin: "https://zufarsyaafie.github.io",
		methods: ["GET", "POST"],
	},
});
setupWebsocket(io);

app.get("/", (req, res) => {
	const data = generateRandomData();
	res.json(data);
});

server.listen(5555, () => {
	console.log("Server started on http://localhost:5555");
});
