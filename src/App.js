import React, { useState } from 'react';
import './App.css';
import User from './pages/user';
import Map from './pages/map';

function App() {
  const [chatInput, setChatInput] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleChatInputChange = (input) => {
    setChatInput(input);
  };

  const handleCoordinatesChange = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  return (
    <div className="App">
      <div className="split-container">
        <div className="left-pane">
          <User chatInput={chatInput} onCoordinatesChange={handleCoordinatesChange} />
        </div>
        <div className="right-pane">
          <Map latitude={latitude} longitude={longitude} onChatInputChange={handleChatInputChange} />
        </div>
      </div>
    </div>
  );
}

export default App;
