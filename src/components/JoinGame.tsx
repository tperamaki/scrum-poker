'use client';

import { useContext, useState } from 'react';
import { GameContext } from './Game';
import { joinGame } from '../network';
import { Button } from './Buttons';

export default function JoinGame() {
  const [newPlayerName, setNewPlayerName] = useState<string>('');
  const { id, refreshCounter, setPlayerName } = useContext(GameContext);
  return (
    <form
      onSubmit={() => {
        refreshCounter();
        joinGame(id, newPlayerName);
        setPlayerName(newPlayerName);
      }}
    >
      <label htmlFor="playerNameInput">Your name</label>
      <div className="flex gap-4">
        <input
          id="playerNameInput"
          className="dark:bg-neutral-500 p-2 rounded-sm"
          onChange={(val) => {
            setNewPlayerName(val.currentTarget.value);
          }}
          required
        />
        <Button>Join</Button>
      </div>
    </form>
  );
}
