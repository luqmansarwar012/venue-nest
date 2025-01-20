import React, { useState, useEffect } from 'react';

function App() {
  const [ws, setWs] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [pingMessage, setPingMessage] = useState("");

const connectWebSocket = () => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoiNjc3NGYwZjBlMzljMGU5ODcwYWZiODNiIn0.Ge-UfhmRarwAe-IlK8ScBOxOolG1wCCZEAMM8a8byA0";
  const customer_id = "6774f0f0e39c0e9870afb83b"; 

  if (!token) {
    console.error("No token found. Please log in.");
    return;
  }

  // Pass the token in the Sec-WebSocket-Protocol header
  const socket = new WebSocket(`ws://0.0.0.0:8000/notification/websocket/${customer_id}`, token);

  socket.onopen = () => {
    console.log("WebSocket connected");
    setIsConnected(true);
  };

  socket.onmessage = (event) => {
    const message = event.data;
    if (message === "ping") {
      console.log("Received ping from server");
    } else {
      console.log("Message from server:", message);
    }
    setPingMessage(message);
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected");
    setIsConnected(false);
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  setWs(socket);
};

  const disconnectWebSocket = () => {
    if (ws) {
      ws.close();
      setIsConnected(false);
    }
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      disconnectWebSocket();
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Example</h1>
      <button onClick={connectWebSocket} disabled={isConnected}>
        Connect WebSocket
      </button>
      <button onClick={disconnectWebSocket} disabled={!isConnected}>
        Disconnect WebSocket
      </button>

      <div>
        <p>Connection Status: {isConnected ? "Connected" : "Disconnected"}</p>
        <p>Last message: {pingMessage}</p>
      </div>
    </div>
  );
}

export default App;
