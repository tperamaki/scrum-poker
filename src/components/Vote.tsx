import { VoteButton } from './Buttons';

import type { JSX } from "react";

export const Vote = (): JSX.Element => {
  const cards = [0, 1, 2, 3, 5, 8, 13, 21];

  return (
    <div>
      <h3 className="text-3xl text-center mb-5">Vote</h3>
      <div className="flex gap-4 justify-center flex-col lg:flex-row lg:gap-2">
        {cards.map((val) => (
          <VoteButton key={val} value={val} buttonText={val.toString()} />
        ))}
      </div>
    </div>
  );
};
