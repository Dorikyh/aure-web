import { useState } from 'react';
import { UserPlus } from "react-feather";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img 
            src="/favicon.ico" 
            className="h-8" 
            alt="Aure Logo" 
          />
          <span className="self-center text-2xl font-extrabold whitespace-nowrap dark:text-white">
            Aure
          </span>
        </a>
        
<div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
  <a href="https://discord.com/oauth2/authorize?client_id=889540062956634164" 
    type="button" 
    className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-3 py-2 text-center font-semibold dark:bg-indigo-500 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 flex items-center"
  >
    <UserPlus width={18} height={18} className="mr-1" />
    Add
  </a>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            type="button" 
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky" 
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
            )}
          </button>
        </div>

        <div 
          className={`md:flexmd:hidden  md:w-auto md:order-1 w-full ${isOpen ? 'block' : 'hidden'}`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 mt-4 md:p-0 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-gray-50 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-lg">
            <li className="w-full md:w-auto">
              <a 
                href="#" 
                className="block py-2 px-3 text-white bg-indigo-700 rounded-lg md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-indigo-500" 
                aria-current="page"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
            </li>
            <li className="w-full md:w-auto">
              <a 
                href="/status" 
                className="block py-2 px-3 mt-1 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 rounded-lg dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                onClick={() => setIsOpen(false)}
              >
                Status
              </a>
            </li>
            <li className="w-full md:w-auto">
              <a 
                href="/stats" 
                className="block py-2 px-3 rounded-lg mt-1 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                onClick={() => setIsOpen(false)}
              >
                Stats
              </a>
            </li>
            <li className="w-full md:w-auto">
              <a 
                href="/support" 
                className="block py-2 px-3 mt-1 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 rounded-lg dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                onClick={() => setIsOpen(false)}
              >
                Support
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
