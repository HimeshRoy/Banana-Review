import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { tmdb, endpoints } from "../services/tmdb";

import MovieCard from "../components/MovieCard";

const SearchPage = () => {
  const [movies, setMovies] = useState([]);

  const [searchParams] = useSearchParams();

  const query = searchParams.get("q");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await tmdb.get(
          endpoints.searchMovies(query)
        );

        setMovies(res.data.results);

      } catch (error) {
        console.log(error);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div className="bg-black text-white min-h-screen pt-32 px-6 md:px-10">

      <h1 className="text-4xl font-black mb-10">
        🔍 Results for "{query}"
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">

        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}

      </div>

    </div>
  );
};

export default SearchPage;