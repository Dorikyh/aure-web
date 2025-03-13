// app/components/Ranking.tsx
import React from 'react';

export type RankingItem = {
  // Para usuarios: se espera `username` y `item_count`
  // Para servidores (guilds): se espera `name`, `member_count` y `icon`
  username?: string;
  item_count?: number;
  name?: string;
  member_count?: number;
  icon?: string;
};

export type RankingProps = {
  ranking: RankingItem[];
  type: 'users' | 'guilds';
  limit: number;
  currentPage: number;
  advanced: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
};

export default function Ranking({
  ranking,
  type,
  limit,
  currentPage,
  advanced,
  onPrevious,
  onNext,
}: RankingProps) {
  const effectiveLimit = Math.min(limit, 20);

  return (
    <div className="text-gray-900 dark:text-gray-200 rounded-lg space-y-4">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-200 to-purple-300 bg-clip-text text-transparent">
          {type === 'guilds' ? "Top Aure Servers" : "Top Users"}
        </h2>
        {type === 'users' && (
          <div className="relative group">
            <select
              defaultValue="votes"
              className="appearance-none bg-gray-100 dark:bg-gray-800 border-0 py-2 pl-4 pr-8 rounded-xl text-sm font-medium focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all"
            >
              {['votes', 'credits', 'xp', 'orbs'].map((option) => (
                <option key={option} value={option} className="dark:bg-gray-800">
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        )}
      </div>

      <ul className="space-y-2">
        {ranking.length === 0 ? (
          <li className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <span className="text-gray-500 dark:text-gray-400">No data available</span>
          </li>
        ) : (
          ranking.map((item, index) => (
            <li
              key={`${type === 'guilds' ? item.name : item.username}-${index}`}
              className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group"
            >
              <div className="ml-4 flex items-center space-x-4">
                <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400 w-8">
                  #{(currentPage - 1) * effectiveLimit + index + 1}
                </span>
                {type === 'guilds' && item.icon && (
                  <img src={item.icon} alt={item.name} className="w-10 h-10 rounded-xl" />
                )}
                <span className="text-lg font-medium dark:text-gray-200">
                  {type === 'guilds'
                    ? item.name
                    : item.username?.charAt(0).toUpperCase() + item.username?.slice(1).toLowerCase()}
                </span>
              </div>
              <span className="text-lg font-semibold bg-indigo-100 dark:bg-indigo-600 mr-3 px-3 py-1 rounded-xl">
                {type === 'guilds'
                  ? `${item.member_count?.toLocaleString()} users`
                  : item.item_count?.toLocaleString() || 0}
              </span>
            </li>
          ))
        )}
      </ul>

      {advanced && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={onPrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-400">Page {currentPage}</span>
          <button
            onClick={onNext}
            disabled={ranking.length < effectiveLimit}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
