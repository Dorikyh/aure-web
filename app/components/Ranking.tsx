import React from 'react';
import { Users, Star } from "react-feather";

export type RankingItem = {
  username?: string;
  item_count?: number;
  name?: string;
  member_count?: number;
  icon?: string;
  total?: number;
};

export type RankingProps = {
  ranking: RankingItem[];
  type: 'users' | 'guilds';
  limit: number;
  currentPage?: number;
  advanced?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  total?: number;
  sortBy?: string;
  onSortChange?: (sortBy: string) => void;
};

const getRibbonColor = (index: number) => {
  switch (index) {
    case 0: return 'bg-yellow-500 text-yellow-900'; // Oro
    case 1: return 'bg-gray-400 text-gray-800'; // Plata
    case 2: return 'bg-orange-400 text-orange-900'; // Bronce
    default: return 'bg-indigo-100 dark:bg-indigo-600 text-gray-900 dark:text-gray-200';
  }
};

export default function Ranking({
  ranking,
  type,
  limit,
  currentPage = 1,
  advanced = false,
  onPrevious,
  onNext,
  total,
  sortBy,
  onSortChange,
}: RankingProps) {
  const effectiveLimit = Math.min(limit, 20);

  return (
    <div className="text-gray-900 dark:text-gray-200 rounded-lg space-y-4">
      <div className="flex justify-between items-center px-2 mt-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-200 to-purple-300 bg-clip-text text-transparent">
          {type === 'guilds' ? "Popular Servers" : "Top Users"}
        </h2>
        {type === 'users' && onSortChange && (
          <div className="relative group">
            <select
              defaultValue={sortBy}
              className="appearance-none bg-gray-100 dark:bg-gray-800 border-0 py-2 pl-4 pr-8 rounded-xl text-sm font-medium focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all"
              onChange={(e) => onSortChange(e.target.value)}
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
        {(ranking || []).length === 0 ? (
          <li className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <span className="text-gray-500 dark:text-gray-400">No data available</span>
          </li>
        ) : (
          (ranking || []).map((item, index) => {
            const isTopThree = index < 3;
            const ribbonColor = getRibbonColor(index);

            let itemClass = "flex items-center justify-between p-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group";
            if (isTopThree) {
              itemClass += " bg-gray-100 dark:bg-gray-800";
            } else {
              itemClass += " bg-gray-100 dark:bg-gray-800";
            }

            let spanClass = "text-xl font-bold w-8 transition-colors";
            if (isTopThree) {
              spanClass += " text-indigo-600 dark:text-indigo-400";
            } else {
              spanClass += " text-indigo-600 dark:text-indigo-400";
            }

            let nameClass = "text-lg font-medium transition-colors";
            if (isTopThree) {
              nameClass += " dark:text-gray-200";
            } else {
              nameClass += " dark:text-gray-200";
            }

            let dataClass = "flex text-lg font-semibold mr-3 px-3 py-1 rounded-xl transition-colors " + ribbonColor;
            if (isTopThree) {
              dataClass += " shadow-md";
            }

            const displayName = type === 'guilds' ? (item.name ?? 'Unknown') : (item.username ?? 'Unknown');
            const displayCount = type === 'guilds' ? (item.member_count ?? 0) : (item.item_count ?? 0);

            return (
              <li
                key={`${type === 'guilds' ? item.name : item.username}-${index}`}
                className={itemClass}
              >
                <div className="ml-4 flex items-center space-x-4">
                  <span className={spanClass}>
                    {(currentPage - 1) * effectiveLimit + index + 1}
                  </span>
                  {type === 'guilds' && item.icon && (
                    <img src={item.icon} alt={item.name} className="w-10 h-10 rounded-xl" />
                  )}
                  <span className={nameClass}>
                    {type === 'guilds'
                      ? (item.name?.substring(0, 10) ?? 'Unknown')
                      : (item.username?.charAt(0).toUpperCase() + item.username?.slice(1).toLowerCase() ?? 'Unknown')}
                  </span>
                </div>
                <span className={dataClass}>
                  {type === 'guilds' ? (
                    <>
                      <Users className="mr-1" />
                      {` ${displayCount.toLocaleString()}`}
                    </>
                  ) : (
                    <>
                      <Star className="mr-1" />
                      {` ${displayCount.toLocaleString()}`}
                    </>
                  )}
                </span>
              </li>
            );
          })
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
            disabled={!total || currentPage * effectiveLimit >= total}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}