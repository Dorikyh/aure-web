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
  userTotal: number;
  guildTotal: number;
  sortBy: string;
};

// Definimos un límite para la petición a la API
const API_LIMIT = 50;

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page')) || 1;
  const displayLimit = Math.min(Number(url.searchParams.get('limit')) || 10, 10); // Límite de visualización a 10
  const advanced = url.searchParams.get('advanced') === 'true';
  const sortBy = url.searchParams.get('sort') || 'votes';

  // Función para obtener datos y el total
  const fetchData = async (endpoint: string, currentLimit: number, currentPage: number) => {
    const res = await fetch(`${endpoint}?limit=${currentLimit}${advanced ? `&page=${currentPage}` : ''}`);
    if (!res.ok) {
      console.error(`Error fetching ${endpoint}:`, await res.text());
      throw new Response(`Error fetching ${endpoint}`, { status: res.status });
    }
    const data = await res.json();
    const totalRes = await fetch(endpoint.replace(/(\?.*)/, '/count'));
    if (!totalRes.ok) {
      console.error(`Error fetching count for ${endpoint}:`, await totalRes.text());
      throw new Response(`Error fetching count for ${endpoint}`, { status: totalRes.status });
    }
    const totalData = await totalRes.json();
    return { data, total: totalData.total };
  };

  // Fetch ranking de usuarios con el límite de la API
  try {
    const userResult = await fetchData(`https://us.mysrv.us/lb/${sortBy}`, API_LIMIT, page);
    const userRanking = userResult.data || [];
    const userTotal = userResult.total;

    // Fetch ranking de servidores
    const guildResult = await fetchData(`https://us.mysrv.us/popular_servers`, API_LIMIT, page);
    const guildRanking = guildResult.data || [];
    const guildTotal = guildResult.total;

    return json<LoaderData>({
      userRanking,
      guildRanking,
      currentPage: page,
      limit: displayLimit, // Usar el límite de visualización
      advanced,
      userTotal,
      guildTotal,
      sortBy,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return json<LoaderData>({
      userRanking: [],
      guildRanking: [],
      currentPage: page,
      limit: displayLimit, // Usar el límite de visualización
      advanced,
      userTotal: 0,
      guildTotal: 0,
      sortBy,
    });
  }
};

export default function RankingsPage() {
  const { userRanking, guildRanking, currentPage, limit, advanced, userTotal, guildTotal, sortBy } = useLoaderData<LoaderData>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handlePrevious = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      navigate(`?page=${newPage}&limit=${limit}&advanced=${advanced}&sort=${sortBy}`);
    }
  };

  const handleNext = () => {
    const newPage = currentPage + 1;
    navigate(`?page=${newPage}&limit=${limit}&advanced=${advanced}&sort=${sortBy}`);
  };

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', newSort);
    navigate(`?${params.toString()}`);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-5xl font-extrabold mb-8 text-center">Rankings</h1>
        {/* Ranking de Usuarios */}
        <Ranking
          ranking={userRanking.slice(0, limit)} // Mostrar solo el límite de visualización
          type="users"
          limit={20} // Pasamos el limite de visualizacion
          currentPage={currentPage}
          advanced={true}
          onPrevious={handlePrevious}
          onNext={handleNext}
          total={20}
          sortBy={sortBy}
          onSortChange={handleSortChange}
        />
        {/* Ranking de Servidores */}
        <Ranking
          ranking={guildRanking.slice(0, limit)}  // Mostrar solo el límite de visualización
          type="guilds"
          limit={limit}
          currentPage={currentPage}
          advanced={false}
          onPrevious={handlePrevious}
          onNext={handleNext}
          total={guildTotal}
        />
      </div>
    </Layout>
  );
}
