import React from 'react';
import { useContext, useState } from 'react';
import axios from 'axios';

// contexts
import { GameDifficultyContext, ModalContext, ScoresContext, TimerContext } from '../../contexts/index';

// // styles
import './ScoreForm.sass';

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
      setScores(result);
    } catch (error) {
      console.log(error.message);
    }

    setIsLoading(false);
  }


  // handles leaderboard entry submit
  const handleSubmit = async (event: any) => {
    console.log("ahdjfkdskjfhjkdls")
    event.preventDefault();

    setIsLoading(true);

    const newScore = {
      playerName,
      secondsElapsed,
      gameDifficulty,
      gameCompletionTime: secondsElapsed
    };

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
    <div className="sfMain">
      <div>
        {isLoading ? "Loading" : null}
        {errorMessage ? <p>{errorMessage}</p> : null}
        {isComplete ? <p>Score Submitted!</p> : null}
      </div>

      <div className="sfFormContainer">
        <form onSubmit={handleSubmit}>
          <input className="sfInput" type="text" name="name" placeholder="Enter your name here..." onChange={e => setPlayerName(e.target.value)} />
          <button onClick={handleSubmit} className="sfButton" type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}