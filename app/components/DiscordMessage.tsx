import React from "react";
import { FaDiscord, FaRobot, FaHeart, FaCheck } from "react-icons/fa";

interface DiscordMessageProps {
  username: string;
  avatarUrl: string;
  embedTitle: string;
  embedDescription: string;
  embedImage?: string;
  buttons?: { label: string; url: string }[];
}

const DiscordMessage: React.FC<DiscordMessageProps> = ({
  username,
  avatarUrl,
  embedTitle,
  embedDescription,
  embedImage,
  buttons = [],
}) => {
  return (
    <div className="bg-[#313338] p-4 rounded-lg max-w-md mx-auto text-white font-sans shadow-md border border-[#2b2d31]">
      {/* Usuario y Avatar */}
      <div className="flex items-center space-x-3">
        <img src={avatarUrl} alt="avatar" className="w-10 h-10 rounded-full" />
        <span className="font-semibold text-[#fff] flex ml-2 ">
          {username} <span className="text-[#fff] p-1 rounded bg-[#5865F2] text-sm flex">
            <FaCheck/>APP
            </span>
        </span>
      </div>

      {/* Embed */}
      <div className="mt-2 bg-[#2b2d31] rounded-lg p-3 border-l-4 border-[#5865F2]">
        <h3 className="text-[#fff] font-bold text-lg">{embedTitle}</h3>
        <p className="text-[#b9bbbe] text-sm">{embedDescription}</p>
        {embedImage && (
          <img
            src={embedImage}
            alt="embed"
            className="w-full rounded-lg mt-2 border border-[#202225]"
          />
        )}
      </div>

      {/* Botones */}
      {buttons.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {buttons.map((button, index) => (
            <a
              key={index}
              href={button.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#5865F2] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#4752c4] transition flex items-center gap-2"
            >
              <FaHeart />
              {button.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiscordMessage;
