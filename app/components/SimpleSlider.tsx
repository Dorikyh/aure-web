import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Server {
  name: string;
  member_count: number;
  icon: string;
  description?: string | null;
  banner?: string | null;
  tags?: string[];
}

const formatMembersCount = (count: number) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toLocaleString();
};

export default function ServersSlider() {
  const [servers, setServers] = useState<Server[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServers() {
      try {
        const response = await fetch('https://us.mysrv.us/popular_servers');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Server[] = await response.json();

        // Validate the response data
        if (!Array.isArray(data) || data.some(item => 
          typeof item.name !== 'string' || 
          typeof item.member_count !== 'number' ||
          typeof item.icon !== 'string'
        )) {
          throw new Error('Invalid data structure');
        }

        setServers(data);
      } catch (error: any) {
        setError(error.message);
      }
    }

    fetchServers();
  }, []);

  if (error) {
    return (
      <div className="p-4 text-red-500 text-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={15}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
          1280: { slidesPerView: 3 }
        }}
      >
        {servers.map((server, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <div className="flex flex-col items-center text-center">
              {/* Banner */}
              <img
                src={server.banner || '/banner.jpeg'}
                alt={`${server.name} banner`}
                className="w-full h-24 object-cover rounded-lg"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/banner.jpeg';
                }}
              />

              {/* Icono del servidor (posicionando encima del banner) */}
              <img
                src={server.icon}
                alt={server.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-purple-200 dark:border-purple-800 absolute top-20 left-1/2 transform -translate-x-1/2"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/public/aure.png';
                }}
              />

              <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-16">
                {server.name.slice(0, 20)}
              </h3>
              <p className="text-purple-600 dark:text-purple-400 font-semibold mb-2">
                {formatMembersCount(server.member_count)} members
              </p>

              {/* Etiquetas (máximo 3) */}
              {server.tags && (
            <div className="flex flex-wrap justify-center mb-4">
              {server.tags.slice(0, 3).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-3 py-1 m-1 text-xs bg-purple-200 dark:bg-purple-700 text-purple-700 dark:text-purple-200 rounded-full min-h-[32px] flex items-center justify-center"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

              {server.description && (
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                  {server.description}
                </p>
              )}
</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
