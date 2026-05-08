import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { tmdb, endpoints } from "../services/tmdb";

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        // Movie Details
        const detailsRes = await tmdb.get(endpoints.movieDetails(id));

        setMovie(detailsRes.data);

        // Trailer
        const videoRes = await tmdb.get(endpoints.movieVideos(id));

        const trailerData = videoRes.data.results.find(
          (video) => video.type === "Trailer",
        );

        setTrailer(trailerData);

        // Cast
        const castRes = await tmdb.get(endpoints.movieCredits(id));

        setCast(castRes.data.cast.slice(0, 10));
      } catch (error) {
        console.log(error);
      }
      const similarRes = await tmdb.get(
  endpoints.similarMovies(id)
);

setSimilarMovies(similarRes.data.results);
    };

    fetchMovieData();
  }, [id]);

  if (!movie) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Backdrop */}
      <div
        className="relative h-[80vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end h-full px-6 md:px-20 pb-20 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            {movie.title}
          </h1>

          <p className="text-lg text-gray-300 mb-6">{movie.overview}</p>

          <div className="flex gap-6 flex-wrap mb-6">
            <p className="text-yellow-400 font-bold">
              ⭐ {movie.vote_average.toFixed(1)}
            </p>

            <p>📅 {movie.release_date}</p>

            <p>⏱ {movie.runtime} mins</p>
          </div>

          {/* Genres */}
          <div className="flex gap-3 flex-wrap">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-white/10 px-4 py-2 rounded-full"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Trailer */}
      {trailer && (
        <div className="px-6 md:px-20 py-16">
          <h2 className="text-4xl font-bold mb-8">🎬 Official Trailer</h2>

          <div className="aspect-video rounded-2xl overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Trailer"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Cast */}
      <div className="px-6 md:px-20 py-10">
        <h2 className="text-4xl font-bold mb-8">🎭 Top Cast</h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {cast.map((actor) => (
            <div key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt=""
                className="rounded-xl mb-3"
              />

              <h3 className="font-bold">{actor.name}</h3>

              <p className="text-gray-400 text-sm">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Movies */}
<div className="px-6 md:px-20 py-16">

  <h2 className="text-4xl font-bold mb-8">
    🍿 Similar Movies
  </h2>

  <div className="flex gap-6 overflow-x-scroll scrollbar-hide">

    {similarMovies.map((movie) => (
      <MovieCard
        key={movie.id}
        movie={movie}
      />
    ))}

  </div>
</div>

    </div>
  );
};

export default MovieDetails;
