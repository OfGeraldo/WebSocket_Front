import React, { useState } from 'react';
import './App.css';
import useWebSocket from 'react-use-websocket';

function App() {

  const [numero,setNumero] = useState(0);

  const { lastJsonMessage } = useWebSocket('ws://localhost:4000', {
    onOpen: () => console.log(`Connected to App WS`),
    onMessage: () => {
      if (lastJsonMessage) {
        console.log(lastJsonMessage);
        setNumero(lastJsonMessage.temp);
      }
    },
    onError: (event) => { console.error(event); },
    shouldReconnect: (closeEvent) => true,
    reconnectInterval: 3000
  });

  return (
    <div className="App">
      <header className="App-header">
        {numero}
      </header>
    </div>
  );
}

export default App;
