import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid"; // Add Heroicons
import { getTVDetails } from "../services/api";

const TvDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    const fetchShow = async () => {
      const data = await getTVDetails(id);
      setShow(data);
    };
    fetchShow();
  }, [id]);

  if (!show) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main>
      <section className="relative">
        <div className="absolute inset-0 h-[calc(100vh-70px)]">
          <img
            src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
            alt={show.name}
            className="w-full h-full object-cover object-top opacity-50"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent h-[calc(100vh-70px)]" />
      </section>

      <section className="relative container mx-auto">
          <div className="h-80"></div>
          <div className="px-4 max-w-5xl w-full mx-auto">
            <div className="bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-800 p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Poster */}
              <div className="flex justify-center md:justify-start">
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                  className="rounded-lg shadow-lg w-full max-w-[250px] md:max-w-none"
                />
              </div>

              {/* Details */}
              <div className="md:col-span-2 space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold">{show.name}</h1>
                
                {/* Rating with Icon */}
                <div className="flex items-center space-x-2">
                  <StarIcon className="h-6 w-6 text-yellow-400" />
                  <p className="text-lg">
                    <span className="font-semibold">{show.vote_average.toFixed(1)}</span> / 10
                    <span className="text-gray-400"> ({show.vote_count} votes)</span>
                  </p>
                </div>

                {/* Genres as Badges */}
                <div className="flex flex-wrap gap-2">
                  {show.genres?.map((genre) => (
                    <span
                      key={genre.id}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-600 text-white"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <p>
                  <span className="font-semibold">First Air Date:</span> {show.first_air_date}
                </p>
                <p>
                  <span className="font-semibold">Last Air Date:</span> {show.last_air_date}
                </p>
                <p>
                  <span className="font-semibold">Seasons:</span> {show.number_of_seasons}
                </p>
                <p>
                  <span className="font-semibold">Episodes:</span> {show.number_of_episodes}
                </p>
                <p>
                  <span className="font-semibold">Status:</span> {show.status}
                </p>
                <p className="text-base md:text-lg text-gray-300 line-clamp-3">{show.overview}</p>
              </div>
            </div>
          </div>
      </section>
      <div className="relative mt-8"></div>
    </main>

  );


};

export default TvDetails;