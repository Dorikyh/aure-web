import React, { useEffect } from 'react';
import Layout from '../components/Layout';

function Terms() {
    useEffect(() => {
        document.title = "Terms - Aure";
    }, []);

    return (
        <Layout>
            <div className='dark:bg-gray-900 dark:text-gray-400 text-gray-900'>
                <div>
                    <h2 className='dark:text-white text-5xl font-semibold mb-2' id='tos'>Terms and Conditions</h2>
                    <p>
                        By using the Aure Discord bot, you agree to comply with and be bound by the following Terms of Service (ToS). Please read these terms carefully before using the bot.
                    </p>
                    <ol>
                        <li className='my-6'>
                            <h3 className='text-2xl dark:text-white font-semibold'>Acceptance of Terms</h3>
                            <p>
                                By accessing or using the Aure bot, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree with any part of these terms, you may not use the bot.
                            </p>
                        </li>
                        <li className='my-6'>
                            <h3 className='text-2xl dark:text-white font-semibold'>Termination of Service</h3>
                            <p>
                                Aure reserves the right to terminate, suspend, or restrict access to the bot and its services at any time for any reason without prior notice, including but not limited to violations of these terms.
                            </p>
                        </li>
                        <li className='my-6'>
                            <h3 className='text-2xl dark:text-white font-semibold'>Changes to Terms</h3>
                            <p>
                                We may update or modify these terms at any time. Users are responsible for regularly reviewing the terms. Continued use of the bot after changes constitutes acceptance of the modified terms.
                            </p>
                        </li>
                    </ol>
                    <hr className='my-6 border-gray-700 rounded-lg' />
                </div>
                <div id='privacy'>
                    <h2 className='dark:text-white text-5xl font-semibold mb-2'>Privacy Terms</h2>
                    <p>
                        These Privacy Terms describe how we collect, use, and share personal information when you use the Aure Discord bot. Please read this policy carefully before using the bot.
                    </p>
                    <ol>
                        <li className='my-6'>
                            <h3 className='text-2xl dark:text-white font-semibold'>Information We Collect</h3>
                            <p>
                                Aure may access a range of basic information through the Discord API; however, this does not imply that such data is used or stored. The only information we collect, store, and use is as follows:
                            </p>
                            <ul className='mt-4 list-disc ml-6'>
                                <li>
                                    <strong>Command Logs and Error Records:</strong> When you execute any command, the command along with a timestamp is recorded in our database. In case an error occurs, the error details are also logged.
                                </li>
                                <li>
                                    <strong>Autopost and Webhook Data:</strong> For autopost and webhooks, we only store the webhook URL, the cooldown period, the category, and the subcategory.
                                </li>
                                <li>
                                    <strong>Server Rankings:</strong> The top 10 servers with the most Aure users are displayed on our main page.
                                </li>
                                <li>
                                    <strong>Saved Posts:</strong> The <code>/save</code> command allows users to access their saved posts organized by category. Access to these saved posts is strictly limited to the user who created them.
                                </li>
                            </ul>
                        </li>
                        <li className='my-3'>
                            <h3 className='text-2xl dark:text-white font-semibold'>Confidentiality and Data Protection</h3>
                            <p >
                                At Aure, privacy and data security are our top priorities. All information the bot has access to is not shared with any company, business, or individual. The collected data is stored exclusively on our server, and no one else has access to it.</p>
                                <p className="mt-2">Under no circumstances do we sell, lend, or transfer any information to third parties. We do not use the data for commercial purposes or any purpose beyond the bot's functionality. The stored information is strictly used to enhance the user experience and ensure Aure operates correctly.</p>

<p className="mt-2">Your privacy is sacred, and we are committed to protecting it with the highest standards of security and confidentiality.</p>
                        </li>
                    </ol>
                </div>
            </div>
        </Layout>
    );
}

export default Terms;
