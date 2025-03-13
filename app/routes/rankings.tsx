// app/routes/rankings.tsx
import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData, useNavigate, useSearchParams } from '@remix-run/react';
import Layout from '~/components/Layout';
import Ranking, { RankingItem } from '~/components/Ranking';

type LoaderData = {
  userRanking: RankingItem[];
  guildRanking: RankingItem[];
  currentPage: number;
  limit: number;
  advanced: boolean;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page')) || 1;
  const limit = Math.min(Number(url.searchParams.get('limit')) || 5, 20);
  const advanced = url.searchParams.get('advanced') === 'true';

  // Fetch ranking de usuarios (por defecto usando "votes")
  const userRes = await fetch(`https://us.mysrv.us/lb/votes?limit=${limit}${advanced ? `&page=${page}` : ''}`);
  if (!userRes.ok) throw new Response("Error fetching user ranking", { status: userRes.status });
  const userRanking = await userRes.json();

  // Fetch ranking de servidores (guilds)
  const guildRes = await fetch(`https://us.mysrv.us/popular_servers?limit=${limit}${advanced ? `&page=${page}` : ''}`);
  if (!guildRes.ok) throw new Response("Error fetching guild ranking", { status: guildRes.status });
  const guildRanking = await guildRes.json();

  return json<LoaderData>({ userRanking, guildRanking, currentPage: page, limit, advanced });
};

export default function RankingsPage() {
  const { userRanking, guildRanking, currentPage, limit, advanced } = useLoaderData<LoaderData>();
  const navigate = useNavigate();

  const handlePrevious = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      navigate(`?page=${newPage}&limit=${limit}&advanced=${advanced}`);
    }
  };

  const handleNext = () => {
    // Se asume que si se recibe una página completa, hay siguiente
    if (userRanking.length === limit && guildRanking.length === limit) {
      const newPage = currentPage + 1;
      navigate(`?page=${newPage}&limit=${limit}&advanced=${advanced}`);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-5xl font-extrabold mb-8 text-center">Rankings</h1>
        {/* Ranking de Usuarios */}
        <Ranking
          ranking={userRanking}
          type="users"
          limit={10}
          currentPage={currentPage}
          advanced={false}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
        {/* Ranking de Servidores */}
        <Ranking
          ranking={guildRanking}
          type="guilds"
          limit={limit}
          currentPage={currentPage}
          advanced={advanced}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>
    </Layout>
  );
}
