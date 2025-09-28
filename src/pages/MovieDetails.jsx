import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovieDetails(id);
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) {
    return (
      <main className="flex items-center justify-center h-screen text-white">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="bg-gray-950 text-white min-h-screen px-6 py-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Poster */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg shadow-lg"
        />

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-400 mb-2">
            Release Date: {movie.release_date}
          </p>
          <p className="text-gray-400 mb-2">
            Rating: ⭐ {movie.vote_average} / 10
          </p>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 bg-red-800 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Overview */}
          <p className="leading-relaxed">{movie.overview}</p>
        </div>
      </div>
    </main>
  );
};

export default MovieDetails;
