import { useEffect, useState } from "react";
import { getLatestTV } from "../services/api";
import { Link } from "react-router-dom";

const TvShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTV = async () => {
      const data = await getLatestTV(page);
      setTvShows(data.results);
    };
    fetchTV();
  }, [page]);

  return (
    <main className="bg-gray-950 text-white min-h-screen px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">📺 Latest TV Shows</h1>

      {/* ✅ TV Shows Grid (5x5 = 25 per page) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {tvShows.map((show) => (
          <Link
            key={show.id}
            to={`/tv/${show.id}`}
            className="rounded-lg overflow-hidden shadow-md bg-gray-900 hover:scale-105 transition-transform block"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={show.name}
              className="w-full aspect-[2/3] object-cover"
            />
            <div className="p-3 text-center">
              <h3 className="text-sm font-semibold truncate">{show.name}</h3>
              <p className="text-xs text-gray-400">{show.first_air_date}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* ✅ Pagination */}
      <div className="flex justify-center items-center mt-8 gap-4">
        <button
          disabled={page === 1}
          onClick={() => {
            setPage((p) => Math.max(1, p - 1));
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-lg font-semibold">Page {page}</span>

        <button
          onClick={() => {
            setPage((p) => p + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700"
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default TvShows;
