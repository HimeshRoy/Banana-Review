import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tmdb, endpoints } from "../services/tmdb";
import TrailerModal from "./TrailerModal";
import { motion } from "framer-motion";
import { IoStar } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const Hero = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedTrailer, setSelectedTrailer] = useState(null);

  const handleTrailer = async (movieId) => {
  try {
    const res = await tmdb.get(
      endpoints.movieVideos(movieId)
    );

    const trailer = res.data.results.find(
      (video) => video.type === "Trailer"
    );

    if (trailer) {
      setSelectedTrailer(trailer.key);
      setIsModalOpen(true);
    }

  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    const fetchHeroMovies = async () => {
      try {
        const res = await tmdb.get(endpoints.trending);

        setMovies(res.data.results.slice(0, 5));
      } catch (error) {
        console.log(error);
      }
    };

    fetchHeroMovies();
  }, []);

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      loop={true}
      className="h-screen"
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <section
            className="relative h-screen bg-cover bg-center"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70"></div>

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative z-10 flex flex-col justify-center h-full px-8 md:px-20 max-w-3xl"
            >
              <p className="text-yellow-400 text-lg mb-3 font-semibold tracking-wider">
                🍌 Trending Now
              </p>

              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                {movie.title}
              </h1>

              <p className="text-gray-300 text-lg leading-relaxed mb-8 line-clamp-4">
                {movie.overview}
              </p>

              <p className="text-yellow-400 font-bold text-lg mb-6 flex items-center gap-2">
                <IoStar/> {movie.vote_average.toFixed(1)}
              </p>

              {/* Buttons */}
              <div className="flex gap-4 flex-wrap">
                <button
                 onClick={() => handleTrailer(movie.id)}
                  className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold hover:scale-105 transition"
                >
                  ▶ Watch Trailer
                </button>

                <button
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-3 rounded-lg font-bold hover:bg-white/20 transition"
                >
                  More Info
                </button>
              </div>
            </motion.div>
          </section>
        </SwiperSlide>
      ))}
      <TrailerModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  trailerKey={selectedTrailer}
/>
    </Swiper>
  );
};

export default Hero;
