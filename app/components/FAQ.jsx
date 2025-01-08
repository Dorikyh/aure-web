import React from 'react';


const FAQItem = ({ question, answer }) => {
  return (
    <details className="group rounded-lg bg-gray-50 p-6 dark:bg-gray-800 [&_summary::-webkit-details-marker]:hidden mb-2">
      <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
        <h2 className="text-2xl font-semibold dark:text-gray-200">{question}</h2>
        <span className="relative size-5 shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
      </summary>
      <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-400">{answer}</p>
    </details>
  );
};

export default FAQItem;