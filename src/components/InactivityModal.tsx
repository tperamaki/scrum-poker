'use client';

import { useContext, type JSX } from 'react';
import { GameContext } from './Game';
import { Button } from './Buttons';

export const InactivityModal = (): JSX.Element => {
  const { refreshCounter } = useContext(GameContext);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full p-10 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-500/75">
      <div className="flex justify-center">
        <div className="relative w-full max-w-2xl max-h-full">
          <div className="flex flex-col gap-5 bg-neutral-300 rounded-lg shadow-sm dark:bg-neutral-800 p-5">
            <h2 className="text-2xl">Inactive</h2>
            <p>Stopped refreshing due inactivity, click here to restart</p>
            <Button onClick={refreshCounter}>Im back!</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
