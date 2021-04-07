import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';

export const App: React.FC = () => {
  const [scores, setScores] = useState({});

  useEffect(() => {
    axios.get(`https://glacial-eyrie-20134.herokuapp.com/api/scores/intermediate`)
      .then(res => {
        const result = res.data;
        setScores(result);
      })
  })

  return (
    <div>
      {JSON.stringify(scores)}
    </div>
  );
}

export default App;
