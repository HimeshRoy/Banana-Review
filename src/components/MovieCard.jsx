import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoStar } from "react-icons/io5";
const MovieCard = ({ movie }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.08,
        y: -10,
      }}
      transition={{ duration: 0.3 }}
      className="min-w-[180px] md:min-w-[220px]"
    >
      <Link
        to={`/movie/${movie.id}`}
        className="cursor-pointer block"
      >

        {/* Poster */}
        <div className="overflow-hidden rounded-2xl">

          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-[270px] md:h-[330px] object-cover"
          />

        </div>

        {/* Info */}
        <div className="mt-3">

          <h2 className="font-bold text-lg line-clamp-2">
            {movie.title}
          </h2>

          <p className="text-yellow-400 mt-1 flex items-center gap-2">
            <IoStar/> {movie.vote_average.toFixed(1)}
          </p>

        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;