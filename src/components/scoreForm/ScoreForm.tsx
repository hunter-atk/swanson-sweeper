import React from 'react';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

// contexts
import { GameCompletionTimeContext, GameDifficultyContext, TimeframeContext, ScoresContext } from '../../contexts/index';

// // styles
// import './ScoreForm.sass';

export const ScoreForm: React.FC = () => {
  const { gameCompletionTime, setGameCompletionTime } = useContext(GameCompletionTimeContext);
  const { gameDifficulty } = useContext(GameDifficultyContext);
  const { setScores } = useContext(ScoresContext);
  const { timeframe } = useContext(TimeframeContext);
  const [playerName, setPlayerName] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (timeframe || gameDifficulty) {
      setGameCompletionTime(0);
      return;
    }
  }, [timeframe, gameDifficulty])

  // loads records in leaderboard db
  const loadScores = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`https://glacial-eyrie-20134.herokuapp.com/api/scores/${gameDifficulty}`)
      const result = response.data;
      setScores(result);
    } catch (error) {
      console.log(error.message);
    }

    setIsLoading(false);
  }


  // handles leaderboard entry submit
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setIsLoading(true);

    const newScore = {
      playerName,
      gameCompletionTime,
      gameDifficulty
    };

    try {
      await axios.post(`https://glacial-eyrie-20134.herokuapp.com/api/scores`, newScore)

      setIsComplete(true);
      loadScores();
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  }

  return (
    <div>
      <div>
        {isLoading ? "Loading" : "NOT Loading"}
        {errorMessage ? <p>{errorMessage}</p> : null}
        {isComplete ? <p>Score Submitted!</p> : null}
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Player Name:
            <input type="text" name="name" onChange={e => setPlayerName(e.target.value)} />
          </label>
          {/* <label>
            Game Duration:
            <input type="number" name="duration" onChange={e => setGameCompletionTime(Number(e.target.value))} />
          </label> */}
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}