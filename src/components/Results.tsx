import { useContext, useMemo, type JSX } from 'react';
import { GameContext } from './Game';

const isSmallestInResultsArray = (
  results: [string, number][],
  value: number,
): boolean => {
  return !results.some(([_name, result]) => result < value);
};

const isLargestInResultsArray = (
  results: [string, number][],
  value: number,
): boolean => {
  return !results.some(([_name, result]) => result > value);
};

const calculateMedian = (results: [string, number][]): string => {
  const sortedResults = [...results].sort((a, b) => a[1] - b[1]);
  return sortedResults.length % 2 === 0
    ? `${(
        (sortedResults[sortedResults.length / 2 - 1]?.[1] +
          sortedResults[sortedResults.length / 2]?.[1]) /
        2
      ).toFixed(1)}`
    : `${sortedResults[Math.floor(sortedResults.length / 2)]?.[1]}`;
};

const calculateAverage = (results: [string, number][]): string =>
  (results.reduce((prev, cur) => prev + cur[1], 0) / results.length).toFixed(2);

export const Results = (): JSX.Element => {
  const { game } = useContext(GameContext);

  const results = useMemo(
    () =>
      Object.entries(game).filter(
        ([key, val]) =>
          key !== '__showResults' && key !== '__lastUpdated' && val >= 0,
      ),
    [game],
  );

  return (
    <div>
      <h3 className="text-3xl text-center mb-5">Results</h3>
      <div className="flex gap-2 justify-center">
        {results.map(([key, val], _i, arr) => (
          <div key={key} className="flex flex-col items-center gap-2">
            {key}
            <p
              className={`border border-solid border-slate-500 rounded-xl px-10 py-20 ${
                isLargestInResultsArray(arr, val)
                  ? 'bg-red-100 dark:bg-red-900'
                  : ''
              } ${
                isSmallestInResultsArray(arr, val)
                  ? 'bg-green-100! dark:bg-green-900!'
                  : ''
              }`}
            >
              {val}
            </p>
          </div>
        ))}
      </div>
      <div className="flex gap-2 justify-center mt-5">
        <div className="flex flex-col gap-2">
          <p>Median: {calculateMedian(results)}</p>
          <p>Average: {calculateAverage(results)}</p>
        </div>
      </div>
    </div>
  );
};
