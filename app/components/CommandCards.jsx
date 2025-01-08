import React, { useState, useEffect } from "react";

const CommandCards = () => {
  const [commands, setCommands] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCommands();
  }, []);

  const fetchCommands = async () => {
    try {
      const response = await fetch("https://api.kotone.tech/commands");
      const data = await response.json();
      setCommands(data);
    } catch (error) {
      console.error("Error fetching commands:", error);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCommands = Array.isArray(commands)
    ? commands.filter((command) =>
        command.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search commands"
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="dark:bg-gray-600 font-semibold dark:text-white text-black bg-gray-300 rounded-md p-2 text-center sm:px-12 px-6"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 m-4">
        {filteredCommands.map((command, index) => (
          <div key={index} className="dark:bg-gray-700 sm:m-4 m-2 p-4 rounded-xl bg-gray-200">
            <h3 className="dark:text-white sm:text-2xl text-xl font-semibold text-gray-800">/{command.name}</h3>
            <p className="dark:text-gray-300 text-gray-700">{command.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommandCards;
