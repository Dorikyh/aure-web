import { useSpring, animated } from '@react-spring/web';
import { Heart, Database, Send, Image } from "react-feather";
import SimpleSlider from "../components/SimpleSlider";
import FAQItem from "../components/FAQ";
import { useLoaderData } from "@remix-run/react";
import Layout from '../components/Layout';

export function loader() {
  return fetch("https://us.mysrv.us/stats")
    .then(response => response.json())
    .then(data => ({
      servers: data.bot.servers, // Número de servidores
      webhooks: data.autopost.active, // Número de webhooks activos
      todayCommands: data.commands.today, // Comandos usados hoy
    }))
    .catch(error => {
      console.error("Error fetching stats:", error);
      return { 
        servers: 0, 
        webhooks: 0, 
        todayCommands: 0
      };
    });
}


export default function Home() {
  const stats = useLoaderData();  // Usamos los datos cargados por el loader

  const animatedServers = useSpring({ number: stats.servers, from: { number: 0 } });
  const animatedWebhooks = useSpring({ number: stats.webhooks, from: { number: 0 } });
  const animatedTodayCommands = useSpring({ number: stats.todayCommands, from: { number: 0 } });

  const formatNumber = (number) => {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    }
    return number.toLocaleString('en-US');
  };

  const faqs = [
    {
      question: "Aure is an inappropriate bot?",
      answer: `Aure has a large number of different uses and among those are also NSFW functionalities, these functionalities can ONLY be used by users of legal age on 18+ channels, so you don't have to worry about your community being filled with inappropriate content.`,
    },
    {
      question: "What are credits for and how can I obtain them?",
      answer: `Credits are the global economy of Aure, with this you can have access to special features such as: generation of high resolution images or higher speed AutoPost channels.`,
    },
    {
      question: "How do I disable AutoPost?",
      answer: `To disable the constant and automatic sending of multimedia on a specific channel, you can go to the channel in question and use the /remove-autopost command. If you do not specify the channel, the channel where you executed the command will be selected.`,
    },
  ];

  return (
    <Layout>
      <div className="dark:bg-gray-900 text-gray-900">
        <section className="dark:text-white" id="about">
          <div className="lg:flex lg:h-screen items-center py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="bg-gradient-to-r dark:from-indigo-100 dark:to-indigo-500 from-indigo-400 to-indigo-700 bg-clip-text text-6xl font-extrabold text-transparent sm:text-7xl">
                Aure Discord Bot
              </h1>
              <p className="w-3/4 sm:w-5/6 mx-auto mt-4 temy-20xt-black dark:text-white text-black">
                Aure has access to millions of images, gifs, videos and audios of all categories for everyone, also with AI generation, for free.
              </p>
              <div className="mx-20 pt-8 sm:flex sm:flex-wrap sm:justify-center gap-4">
                <div className="mb-4 sm:mb-0">
                  <a
                    className="rounded-md bg-indigo-500 px-6 py-3 text-base font-medium text-white transition hover:bg-indigo-500 dark:hover:bg-indigo-400 block w-full sm:inline-block"
                    href="https://discord.com/oauth2/authorize?client_id=889540062956634164"
                  >
                    Add Aure
                  </a>
                </div>

                <div>
                  <a
                    className="rounded-md bg-gray-300 px-6 py-3 text-base font-medium text-indigo-500 transition hover:text-indigo-800/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75 block w-full sm:inline-block"
                    href="https://discord.gg/appnkdReFk"
                  >
                    Support Server
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="dark:text-white text-black" id="features">
          <h2 className="text-5xl font-extrabold sm:text-5xl text-center">
            What makes Aure <span className="bg-gradient-to-br from-blue-100 to-indigo-500 bg-clip-text text-transparent text-gradient-to-r dark:from-indigo-100 dark:to-indigo-500 font-extrabold">special</span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-center mx-auto max-w-3xl">
            Aure has a huge database, with gifs, images, audios and videos in SFW and NSFW in hundreds of categories, an economy system for minigames and more.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-2">
            {[
              { icon: <Database size={20} />, title: "Unlimited NSFW Database", description: "With the NSFW command you can access thousands of individual images in more than 30 different categories." },
              { icon: <Image size={20} />, title: "Unique AI Generation", description: "You can generate with artificial intelligence absolutely anything you can imagine, without censorship." },
              { icon: <Heart size={20} />, title: "Like content, save it for later", description: "Like content and access it later by category." },
              { icon: <Send size={20} />, title: "The widest webhook system", description: "Aure offers a customizable auto media posting system." }
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <span className="shrink-0 rounded-lg bg-gray-300 dark:bg-gray-800 p-4">
                  {feature.icon}
                </span>
                <div>
                  <h2 className="text-lg font-bold">{feature.title}</h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="my-20" id="stats">
          <div className="mx-auto max-w-screen-xl py-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-5xl text-gray-900 dark:text-white sm:text-6xl font-extrabold">
                Trusted by <span className="bg-gradient-to-br from-blue-100 to-indigo-500 bg-clip-text text-transparent text-gradient-to-r dark:from-indigo-100 dark:to-indigo-500 font-extrabold">@everyone</span>
              </h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                The following statistics updates in real-time every five seconds:
              </p>
            </div>
          </div>
          <div className="mt-0">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { label: "Times Used", animatedValue: animatedTodayCommands, key: "todayCommands" },
                { label: "Total Servers", animatedValue: animatedServers, key: "servers" },
                { label: "Webhooks", animatedValue: animatedWebhooks, key: "webhooks" }
              ].map(({ label, animatedValue, key }, index) => (
                <div key={index} className="flex flex-col rounded-xl bg-indigo-200 px-4 py-8 text-center dark:bg-gray-800">
                  <dt className="order-last text-lg font-medium text-gray-500 dark:text-white/75">{label}</dt>
                  <dd className="text-4xl font-extrabold text-indigo-600 dark:text-white">
                    <animated.span>
                      {animatedValue.number.to((n) => formatNumber(Math.round(n)))}
                    </animated.span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="dark:bg-gray-900 py-12 text-white" id="faq">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold">
              Frequently Asked Questions
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6">
              {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
