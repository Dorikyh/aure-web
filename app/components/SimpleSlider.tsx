// app/components/SimpleSlider.tsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export interface Server {
  name: string;
  member_count: number;
  icon: string;
  description?: string | null;
  banner?: string | null;
  tags?: string[];
}

interface SimpleSliderProps {
  servers: Server[];
}

const formatMembersCount = (count: number) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toLocaleString();
};

export default function SimpleSlider({ servers }: SimpleSliderProps) {
  return (
    <div className="max-w-7xl mx-auto relative">
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
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 h-[320px] flex flex-col">
              <div className="relative flex flex-col items-center text-center flex-grow">
                {/* Banner */}
                <img
                  src={server.banner || '/banner.jpeg'}
                  alt={`${server.name} banner`}
                  className="w-full h-24 object-cover rounded-lg brightness-75"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/banner.jpeg';
                  }}
                />

                {/* Server Icon */}
                <img
                  src={server.icon}
                  alt={server.name}
                  className="w-20 h-20 rounded-xl object-cover dark:border-purple-800 absolute top-16 left-1/2 transform -translate-x-1/2"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/public/aure.png';
                  }}
                />

                <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-14">
                  {server.name.slice(0, 19)}
                </h3>
                <p className="text-purple-600 dark:text-indigo-400 font-semibold mb-2">
                  {formatMembersCount(server.member_count)} members
                </p>

                {/* Tags (max 3) */}
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

                {/* Description */}
                <div className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 min-h-[30px]">
                  {server.description || ''}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Estilos globales para personalizar las flechas de navegación */}
      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev {
          width: 24px;
          height: 24px;
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}
