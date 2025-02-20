import { useContext, type JSX } from 'react';
import { GameContext } from './Game';
import { kick } from '@/network';
import { Button } from './Buttons';

export const PlayerList = (): JSX.Element => {
  const { game, id, refreshCounter, setGame } = useContext(GameContext);
  const players = Object.entries(game).filter(
    ([key, _val]) => key !== '__showResults' && key !== '__lastUpdated',
  );

  return (
    <div className="mt-5">
      <div className="flex flex-row justify-between">
        <h3>Players</h3>
        <p title="Players ready / Total amount of players">
          ({players.filter(([_, val]) => val !== -1).length}/{players.length})
        </p>
      </div>
      <div className="flex flex-col items-between gap-2">
        {players.map(([key, val]) => (
          <div key={key} className="flex flex-row justify-between">
            <p
              className={`${
                val !== -1 ? 'text-green-600 dark:text-green-400' : ''
              }`}
            >
              {key}
            </p>
            <button
              title={`Kick player ${key}`}
              onClick={() => {
                refreshCounter();
                kick(id, key);
                setGame((game) => {
                  const newGame = { ...game };
                  delete newGame[key];
                  return newGame;
                });
              }}
              className="text-red-700 dark:text-red-300 rounded-sm border border-black px-2 ml-2 dark:border-white hover:bg-neutral-400 dark:hover:bg-neutral-600 transition-all duration-100 ease-in-out"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
