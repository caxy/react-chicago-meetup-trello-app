import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import TrelloBoard from './components/TrelloBoard/TrelloBoard';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h3>React Chicago Meetup - Trello App</h3>
      </div>
      <div className="App-intro">
        <TrelloBoard />
      </div>
    </div>
  );
}

export default App;
