// app/routes/index.tsx
import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useSpring, animated } from '@react-spring/web';
import { Heart, Database, Send, Image, UserPlus, Activity, MessageCircle } from "react-feather";
import FAQItem from '~/components/FAQ';
import Layout from '~/components/Layout';
import Ranking from '~/components/Ranking';
import SimpleSlider, { Server } from '~/components/SimpleSlider';
import RotatingText from "~/components/RotatingText";

export const loader: LoaderFunction = async () => {
  try {
    // Fetch stats
    const statsResponse = await fetch("https://us.mysrv.us/stats");
    if (!statsResponse.ok) throw new Error("Error fetching stats");
    const statsData = await statsResponse.json();

    // Fetch ranking data (por defecto para usuarios con ranking "votes")
    const rankingResponse = await fetch("https://us.mysrv.us/lb/votes?limit=5");
    if (!rankingResponse.ok) throw new Error("Error fetching ranking");
    const rankingData = await rankingResponse.json();

    // Fetch popular servers (para el slider)
    const serversResponse = await fetch("https://us.mysrv.us/popular_servers");
    if (!serversResponse.ok) throw new Error("Error fetching servers");
    const serversData: Server[] = await serversResponse.json();

    return json({
      stats: {
        servers: statsData.bot.servers,
        webhooks: statsData.autopost.active,
        todayCommands: statsData.commands.today,
      },
      ranking: rankingData,
      servers: serversData,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return json({
      stats: { 
        servers: 0,
        webhooks: 0,
        todayCommands: 0,
      },
      ranking: [],
      servers: [],
    });
  }
};

export default function Home() {
  const { stats, ranking, servers } = useLoaderData<typeof loader>();

  const animatedServers = useSpring({ number: stats.servers, from: { number: 0 } });
  const animatedWebhooks = useSpring({ number: stats.webhooks, from: { number: 0 } });
  const animatedTodayCommands = useSpring({ number: stats.todayCommands, from: { number: 0 } });
  
  
  
  const heroSection = (
  <section className="dark:text-white min-h-screen flex items-center justify-center" id="about">
    <div className="mt-16 md:mt-0 w-full max-w-screen-lg px-4 mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        {/* Imagen - Orden 1 en móvil */}
        <div className="flex justify-center md:justify-end order-1">
          <img 
            src="/public/aure-512.png" 
            alt="Aure App" 
            className="w-64 h-64 md:w-80 md:h-80 rounded-5xl"
          />
        </div>

        {/* Texto y botones - Orden 2 en móvil */}
        <div className="md:text-left order-2">
          <div className="max-w-2xl mx-auto">
            <h1 className="dark:text-white font-extrabold text-transparent text-2xl md:text-5xl">
              The best app you can add,
            </h1>
            <h1 className="font-extrabold text-xl md:text-5xl flex items-baseline flex-wrap">
              <div className="flex">
                <span className="mr-1 md:mr-2 bg-gradient-to-r from-indigo-300 to-indigo-400 bg-clip-text text-transparent">
                  Aure
                </span>
                <span className="text-white dark:text-white mr-1 md:mr-2">
                  can
                </span>
                <div className="inline-block">
                  <RotatingText />
                </div>
              </div>
            </h1>
            
            <div className="pt-8 sm:flex gap-4 justify-center md:justify-start">
              <div className="mb-4 sm:mb-0">
                <a
                  className="flex px-4 rounded-lg bg-indigo-500 py-3 text-base font-medium text-white transition hover:bg-indigo-500 dark:hover:bg-indigo-400"
                  href="https://discord.com/oauth2/authorize?client_id=889540062956634164"
                >
                  <div className="mr-2">
                    <UserPlus />
                  </div>
                  Add Aure
                </a>
              </div>
              <div>
                <a
                  className="mb-4 px-4 rounded-lg py-3 bg-gray-300 text-base font-medium text-indigo-500 transition hover:text-indigo-800/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75 flex"
                  href="https://discord.gg/appnkdReFk"
                >
                  <div className="mr-2">
                    <MessageCircle />
                  </div>
                  Support
                </a>
              </div>
              <div>
                <a
                  className="px-4 py-3 rounded-lg bg-gray-300 text-base font-medium text-indigo-500 transition hover:text-indigo-800/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75 flex"
                  href="/status"
                >
                  <div className="mr-2">
                    <Activity />
                  </div>
                  Status
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);


  
  const formatNumber = (number: number) => {
    if (!number) return '0';
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    }
    return number.toLocaleString('en-US');
  };

  const faqs = [
    {
      question: "Is Aure an inappropriate bot?",
      answer: `Aure is a versatile bot designed for a wide range of functionalities, including NSFW features. However, these NSFW features are strictly limited to users who are 18 years or older and can only be used in designated 18+ channels. This ensures that your community remains safe and free from inappropriate content unless explicitly allowed.`,
    },
    {
      question: "What are credits used for, and how can I earn them?",
      answer: `Credits are Aure's global currency, enabling access to premium features such as high-resolution image generation and faster AutoPost channels. You can earn credits through various activities within the bot or by purchasing them directly.`,
    },
    {
      question: "How can I disable AutoPost in a channel?",
      answer: `To stop the automatic posting of multimedia content in a specific channel, use the /autopost remove command in that channel. If no channel is specified, the command will default to the channel where it was executed. This allows you to easily manage and control AutoPost functionality.`,
    },
  ];

  return (
    <Layout hero={heroSection}>
      <div className="dark:bg-gray-900 text-gray-900">
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
              ].map(({ label, animatedValue }, index) => (
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

        <section className="my-20" id="ranking">
          <div className="mx-auto max-w-7xl px-4">
            <Ranking ranking={ranking} type="users" limit={5} advanced={false} />
          </div>
        </section>

        <section className="my-20" id="serverss">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-center mb-6 text-5xl text-gray-900 dark:text-white sm:text-5xl font-extrabold">
              Top Servers
            </h2>
            <SimpleSlider servers={servers} />
          </div>
        </section>

        <section className="dark:bg-gray-900 py-12 text-white" id="faq">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-extrabold">Frequently Asked Questions</h2>
            <div className="mt-6 grid grid-cols-1 gap-3">
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
