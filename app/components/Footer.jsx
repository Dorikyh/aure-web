const Footer = () => {
    return (
        <footer className="bg-white shadow dark:bg-gray-800">
            <div className="w-full max-w-screen-xl mx-auto md:py-8 p-8">
                <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                    <a href="/" className="flex items-center space-x-2 sm:mb-0 mb-6">
                        <img src="/aure.png" className="h-8" alt="Aure Logo" />
                        <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">Aure</span>
                    </a>
                    <ul className="flex items-center justify-center mb-0 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="/" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="/terms" className="hover:underline me-4 md:me-6">Terms</a>
                        </li>
                        <li>
                            <a href="/status" className="hover:underline me-4 md:me-6">Status</a>
                        </li>
                        <li>
                            <a href="/dashboard" className="hover:underline">Dashboard</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 text-center dark:text-gray-400">© 2025 <a href="https://dorikyh.pw/" className="hover:underline">Dorikyh</a>. All Rights Reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;
