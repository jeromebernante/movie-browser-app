import { useEffect, useState } from "react";
import { getLatestMovies } from "../services/api";
import { Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getLatestMovies(page);
      setMovies(data.results);
    };
    fetchMovies();
  }, [page]);

  return (
    <main>
      <section className="container mx-auto">

        <h1 className="text-3xl font-bold mt-8">🎬 Latest Movies</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="rounded-lg overflow-hidden shadow-md bg-gray-900 hover:scale-105 transition-transform block"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover"
              />
              <div className="p-3 text-center">
                <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
                <p className="text-xs text-gray-400">{movie.release_date}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center items-center mt-8 gap-4">
          <button
            disabled={page === 1}
            onClick={() => {
              setPage((p) => Math.max(1, p - 1));
              window.scrollTo({ top: 0, behavior: "smooth" }); // scroll up
            }}
            className="px-4 py-2 bg-gray-800 rounded-lg hover:cursor-pointer hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          <span className="text-lg font-semibold">Page {page}</span>

          <button
            onClick={() => {
              setPage((p) => p + 1);
              window.scrollTo({ top: 0, behavior: "smooth" }); // scroll up
            }}
            className="px-4 py-2 bg-gray-800 rounded-lg hover:cursor-pointer hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </section>
      <div className="relative mt-8"></div>
    </main>
  );
};

export default Movies;
