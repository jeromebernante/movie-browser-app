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
    <main>
      <section className="relative">
        <div className="absolute inset-0 h-[calc(100vh-70px)]">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover object-top opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent h-[calc(100vh-70px)]" />
        </div>
      </section>

      <section className="relative container mx-auto">
        <div className="h-80"></div>
        <div className="px-4 max-w-5xl w-full mx-auto">
          <div className="bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-800 p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Poster */}
            <div className="flex justify-center md:justify-start">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.name}
                className="rounded-lg shadow-lg w-full max-w-[250px] md:max-w-none"
              />
            </div>
            {/* Details */}
            <div className="md:col-span-2 space-y-4">
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
              <p className="text-gray-400 mb-2">
                Rating: ⭐ {movie.vote_average} / 10
              </p>

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
              <p className="text-gray-400 mb-2">
                Release Date: {movie.release_date}
              </p>
              {/* Overview */}
              <p className="leading-relaxed">{movie.overview}</p>
            </div>
          </div>
        </div>


      </section>
    </main>
  );
};

export default MovieDetails;
