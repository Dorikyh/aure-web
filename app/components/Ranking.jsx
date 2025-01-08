import React, { useState, useEffect } from "react";
import axios from "axios";

const Ranking = ({ type = "votes" }) => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    axios.get(`https://api.dorikyh.pw/bot/lb/${type}?limit=5`)
      .then(response => {
        setRanking(response.data);
      })
      .catch(error => {
        console.error("Error fetching the ranking data:", error);
      });
  }, [type]);

  return (
    <div className="text-gray-900 dark:text-gray-200 rounded-lg">
      <ul className="space-y-2">
        {ranking.map((user, index) => (
          <li
            key={index}
            className="text-center items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            <span className="text-xl">{index + 1}. {user.username}</span>
            <span className="font-bold">{user.item_count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ranking;