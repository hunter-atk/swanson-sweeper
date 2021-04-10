import React from 'react';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

// contexts
import { GameDifficultyContext, LeaderboardContext, ModalContext, ScoresContext, TimerContext } from '../../contexts/index';

// // styles
// import './ScoreForm.sass';

export const ScoreForm: React.FC = () => {
  const { gameDifficulty } = useContext(GameDifficultyContext);
  const { setType } = useContext(ModalContext);
  const { setScores } = useContext(ScoresContext);
  const { secondsElapsed } = useContext(TimerContext);
  const [playerName, setPlayerName] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // loads records in leaderboard db
  const loadScores = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`https://glacial-eyrie-20134.herokuapp.com/api/scores/${gameDifficulty}`)
      const result = response.data;
      console.log(result);
      setScores(result);
    } catch (error) {
      console.log(error.message);
    }

    setIsLoading(false);
  }


  // handles leaderboard entry submit
  const handleSubmit = async (event: any) => {
    console.log(secondsElapsed)
    event.preventDefault();

    setIsLoading(true);

    const newScore = {
      playerName,
      secondsElapsed,
      gameDifficulty,
      gameCompletionTime: secondsElapsed
    };

    console.log(newScore)

    try {
      await axios.post(`https://glacial-eyrie-20134.herokuapp.com/api/scores`, newScore)

      setIsComplete(true);
      loadScores();
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsLoading(false);
    setType('leaderboard');
  }

  return (
    <div>
      <div>
        {isLoading ? "Loading" : "NOT Loading"}
        {errorMessage ? <p>{errorMessage}</p> : null}
        {isComplete ? <p>Score Submitted!</p> : null}
      </div>

      <div>
        <h2>Enter your name to see how you stack up against other players on the Swanson Pyramid of Greatness!</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Player Name:
            <input type="text" name="name" onChange={e => setPlayerName(e.target.value)} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}