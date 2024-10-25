let previousLat = Math.random() * 90;
let previousLon = Math.random() * 180;
let startTime = null;

async function setupWebsocket(wss) {
	wss.on("connection", (ws) => {
		ws.on("message", async (message) => {
			console.log(`Received message => ${message}`);
		});

		setInterval(async () => {
			const data = await generateRandomData();
			ws.send(JSON.stringify(data));
		}, 10000);
	});

	wss.on("close", () => {
		console.log("Client disconnected");
	});
}

async function generateRandomData() {
	if (startTime === null) {
		startTime = Date.now();
	}

	const latVariation = (Math.random() - 0.5) * 0.1;
	const lonVariation = (Math.random() - 0.5) * 0.1;

	previousLat = Math.max(0, Math.min(90, previousLat + latVariation));
	previousLon = Math.max(0, Math.min(180, previousLon + lonVariation));

	return {
		teamID: 212,
		time: Math.floor((Date.now() - startTime) / 1000),
		lat: previousLat,
		lon: previousLon,
		alt: Math.random() * 1000,
		yaw: Math.random() * 360,
		pitch: Math.random() * 180 - 90,
		roll: Math.random() * 360,
		voltage: Math.random() * 100,
		temperature: Math.random() * 40 + 10,
	};
}

module.exports = { setupWebsocket, generateRandomData };
