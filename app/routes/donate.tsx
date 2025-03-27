import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { FaPaypal } from "react-icons/fa";

function Terms() {
    useEffect(() => {
        document.title = "Support Aure";
    }, []);

    return (
        <Layout>
            <div className="dark:bg-gray-900 dark:text-gray-400 text-gray-900 min-h-screen flex flex-col items-center py-10 px-4">
                <div className="max-w-3xl w-full">
                    <h2 className="dark:text-white text-6xl font-semibold mb-4 text-center">
                        Support Aure 💙
                    </h2>
                    <p className="text-lg">
                        Aure is a project born from my passion for creating useful tools for the community. Since day one, my goal has been to provide an accessible and fair solution for everyone, with no profit motive.
                    </p>
                    <p className="mt-4 text-lg">
                        However, to keep Aure running, I need to cover server costs and external services, including some paid APIs. If Aure has been helpful to you and you'd like to support the project, any contribution would be deeply appreciated. Every donation helps maintain the infrastructure and ensures that this tool remains available to everyone.
                    </p>

                    <div className="mt-8 text-center">
                        <a
                            href="https://www.paypal.me/dorikyh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-full transition-all shadow-lg transform hover:scale-105"
                        >
                            <FaPaypal className="mr-2 text-2xl" />
                            Donate with PayPal
                        </a>
                    </div>

                    <p className="mt-6 text-sm text-gray-500 text-center">
                        Thank you for being part of this initiative and for helping it continue to grow. 💖
                    </p>
                </div>
            </div>
        </Layout>
    );
}

export default Terms;
