// server.js
const WebSocket = require("ws");

// Render (or other host) will supply PORT in env; fallback to 8765 locally
const port = parseInt(process.env.PORT || "8765", 10);

const wss = new WebSocket.Server({ port });

wss.on("connection", ws => {
  console.log("Client connected");
  // Send a welcome packet
  ws.send(JSON.stringify({ source: "server", message: "RO-EXEC tech" }));

  ws.on("message", msg => {
    console.log("Received from client:", msg);
    // Echo back the Lua script or other data
    ws.send(JSON.stringify({ source: "server", echo: msg }));
  });

  ws.on("close", () => console.log("Client disconnected"));
});

console.log(`WebSocket server listening on port ${port}`);
