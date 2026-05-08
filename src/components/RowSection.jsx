import React, { useEffect, useState } from "react";
import { tmdb } from "../services/tmdb";
import MovieCard from "./MovieCard";
import { motion } from "framer-motion";

const RowSection = ({icon, title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await tmdb.get(fetchUrl);
        setMovies(res.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, [fetchUrl]);

  return (
    <section 
    initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="px-6 md:px-10 mb-12">

      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        {icon}
        {title}
      </h1>

      <div className="flex gap-6 overflow-x-auto py-2 scrollbar-hide">

        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}

      </div>
    </section>
  );
};

export default RowSection;