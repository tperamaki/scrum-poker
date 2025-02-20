'use client';
import {
  useEffect,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';
import { Vote } from './Vote';
import JoinGame from './JoinGame';
import { getGame, resetGame, showResults } from '@/network';
import { Results } from './Results';
import { PlayerList } from './PlayerList';
import { InactivityModal } from './InactivityModal';
import { Button } from './Buttons';

const INACTIVE_AFTER_MS = 5 * 60 * 1000;
const FETCH_INTERVAL_MS = 2 * 1000;

type GameContextType = {
  id: string;
  game: Record<string, number>;
  setGame: Dispatch<SetStateAction<Record<string, number>>>;
  playerName: string;
  setPlayerName: (game: string) => void;
  refreshCounter: () => void;
};

export const GameContext = createContext<GameContextType>({
  id: '',
  game: {},
  setGame: () => null,
  playerName: '',
  setPlayerName: () => null,
  refreshCounter: () => null,
});

export const Game = (props: { id: string }): JSX.Element => {
  const [lastUpdated, setLastUpdated] = useState<number>(0);
  const [game, setGame] = useState<Record<string, number>>({});
  const [playerName, setPlayerName] = useState<string>('');
  const [lastActive, setLastActive] = useState<number>(Date.now());
  const [inactive, setInactive] = useState<boolean>(false);
  const [urlCopied, setUrlCopied] = useState<boolean>(false);

  const refreshCounter = () => {
    setLastActive(Date.now());
  };

  const copyUrl = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    if (!urlCopied) {
      setUrlCopied(true);
      setTimeout(() => setUrlCopied(false), 5000);
    }
  }, [urlCopied]);

  useEffect(() => {
    setInactive(false);
    const interval = setInterval(() => {
      if (Date.now() - lastActive > INACTIVE_AFTER_MS) {
        setInactive(true);
        return;
      }
      getGame(props.id).then((game) => {
        if (game['__lastUpdated'] > lastUpdated) {
          setGame(game);
          setLastUpdated(game['__lastUpdated']);
        }
      });
    }, FETCH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [props.id, lastActive, lastUpdated]);

  useEffect(() => {
    if (game['__lastUpdated'] === lastUpdated) {
      setLastUpdated(Date.now());
    } else if (game['__lastUpdated'] > lastUpdated) {
      setLastUpdated(game['__lastUpdated']);
    }
  }, [game, lastUpdated]);

  return (
    <GameContext.Provider
      value={{
        id: props.id,
        game,
        setGame,
        playerName,
        setPlayerName,
        refreshCounter,
      }}
    >
      <h2 className="text-xl font-bold mt-5">Room ID: {props.id}</h2>
      <div className="flex flex-row gap-3">
        <div className="flex flex-col gap-3 my-5 min-w-[200px]">
          <Button
            className="p-2 rounded-sm border-2 border-black dark:border-white hover:bg-neutral-400 dark:hover:bg-neutral-600 transition-all duration-100 ease-in-out"
            onClick={copyUrl}
          >
            {urlCopied ? 'Copied!' : 'Copy URL to clipboard'}
          </Button>
          <Button
            className="p-2 rounded-sm border-2 border-black dark:border-white hover:bg-neutral-400 dark:hover:bg-neutral-600 transition-all duration-100 ease-in-out"
            onClick={() => {
              resetGame(props.id);
              setGame((game) =>
                Object.fromEntries(
                  Object.entries(game).map(([key, _value]) => [key, -1]),
                ),
              );
            }}
          >
            Reset game
          </Button>
          <Button
            className="p-2 rounded-sm border-2 border-black dark:border-white hover:bg-neutral-400 dark:hover:bg-neutral-600 transition-all duration-100 ease-in-out"
            onClick={() => {
              showResults(props.id);
              setGame((game) => {
                const newGame = { ...game };
                newGame['__showResults'] = 1;
                return newGame;
              });
            }}
          >
            Show results
          </Button>
          <PlayerList />
        </div>
        <div className="grow my-5 mx-10">
          {game.__showResults === 1 ? (
            <Results />
          ) : playerName === '' ? (
            <JoinGame />
          ) : (
            <Vote />
          )}
        </div>
      </div>
      {inactive && <InactivityModal />}
    </GameContext.Provider>
  );
};
