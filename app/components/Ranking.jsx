// components/Ranking.tsx
import { useEffect, useState } from 'react';

const Ranking = ({ defaultType = 'votes' }) => {
  const [selectedType, setSelectedType] = useState(defaultType);
  const [ranking, setRanking] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://us.mysrv.us/lb/${selectedType}?limit=5`);
        const data = await response.json();
        setRanking(data);
      } catch (error) {
        console.error("Error fetching ranking:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRanking();
  }, [selectedType]);

  return (
    <div className="text-gray-900 dark:text-gray-200 rounded-lg space-y-4">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent">
          Top Rankings
        </h2>
        
        <div className="relative group">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="appearance-none bg-gray-100 dark:bg-gray-800 border-0 py-2 pl-4 pr-8 rounded-full text-sm font-medium focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all"
          >
            {['votes', 'credits', 'xp'].map((type) => (
              <option key={type} value={type} className="dark:bg-gray-800">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <ul className="space-y-2">
        {isLoading ? (
          <li className="text-center p-4">Cargando clasificación...</li>
        ) : ranking.length === 0 ? (
          <li className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <span className="text-gray-500 dark:text-gray-400">
              No hay datos disponibles
            </span>
          </li>
        ) : (
          ranking.map((user, index) => (
            <li
              key={`${user.username}-${index}`}
              className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group"
            >
              <div className="flex items-center space-x-4">
                <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400 w-8">
                  #{index + 1}
                </span>
                <span className="text-lg font-medium dark:text-gray-200">
                  {user.username}
                </span>
              </div>
              <span className="text-lg font-semibold bg-indigo-100 dark:bg-indigo-900 px-3 py-1 rounded-full">
                {user.item_count?.toLocaleString() || 0}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Ranking;