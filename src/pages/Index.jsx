import {
  getNowPlayingMovies,
  getPopularMovies,
  getPopularTV,
  getTopRatedMovies,
  getTopRatedTV,
  getLatestMovies,
  getLatestTV,
} from "../services/api";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar"; 
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Index = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [topTV, setTopTV] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [latestTV, setLatestTV] = useState([]);
  const [activeTab, setActiveTab] = useState("movie");
  const [activeTop, setActiveTop] = useState("movie");

  useEffect(() => {
    const fetchData = async () => {
      const now = await getNowPlayingMovies();
      const movies = await getPopularMovies();
      const tv = await getPopularTV();
      const topM = await getTopRatedMovies();
      const topT = await getTopRatedTV();
      const latestM = await getLatestMovies();
      const latestT = await getLatestTV();

      setNowPlaying(now.slice(0, 5));
      setPopularMovies(movies.slice(0, 10));
      setPopularTV(tv.slice(0, 10));
      setTopMovies(topM.slice(0, 10));
      setTopTV(topT.slice(0, 10));
      setLatestMovies(latestM.results.slice(0, 16));
      setLatestTV(latestT.results.slice(0, 16));
    };
    fetchData();
  }, []);

  const currentData = activeTab === "movie" ? popularMovies : popularTV;
  const currentTop = activeTop === "movie" ? topMovies : topTV;

  return (
    <main className="bg-gray-950 text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-70px)]">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 8000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="h-full"
        >
          {nowPlaying.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div
                className="h-full bg-cover bg-center relative"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
              >
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="container flex py-12 mx-auto px-6 h-full z-10 ">
                  <div className="max-w-2xl relative flex flex-col items-start justify-center">
                    <h1 className="text-5xl font-extrabold drop-shadow-lg">
                      {movie.title}
                    </h1>
                    <p className="mt-4 text-lg drop-shadow-md">
                      {movie.overview?.slice(0, 150)}...
                    </p>
                    <Link to={`/movie/${movie.id}`} className="pt-4">
                      <button className="bg-red-800 hover:bg-red-700 px-4 py-2 rounded-lg hover:cursor-pointer">
                        Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Popular Section */}
      <section className="py-12 container mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">🔥 Popular</h2>
          <div className="flex items-center bg-gray-800 rounded-full p-1">
            <button
              onClick={() => setActiveTab("movie")}
              className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                activeTab === "movie"
                  ? "bg-red-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Movies
            </button>
            <button
              onClick={() => setActiveTab("tv")}
              className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                activeTab === "tv"
                  ? "bg-red-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              TV Shows
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={2}
          navigation
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
        >
          {currentData.map((item) => (
            <SwiperSlide key={item.id}>
              <Link
                to={`/${activeTab === "movie" ? "movie" : "tv"}/${item.id}`}
                className="rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform block"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                  className="w-full aspect-[2/3] object-cover"
                />
                <div className="p-2 text-center">
                  <h3 className="text-sm font-semibold truncate">
                    {item.title || item.name}
                  </h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Top Rated Section */}
      <section className="py-12 container mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">⭐ Top Rated</h2>
          <div className="flex items-center bg-gray-800 rounded-full p-1">
            <button
              onClick={() => setActiveTop("movie")}
              className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                activeTop === "movie"
                  ? "bg-red-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Movies
            </button>
            <button
              onClick={() => setActiveTop("tv")}
              className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                activeTop === "tv"
                  ? "bg-red-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              TV Shows
            </button>
          </div>
        </div>
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={2}
          navigation
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
        >
          {currentTop.map((item) => (
            <SwiperSlide key={item.id}>
              <Link
                to={`/${activeTop === "movie" ? "movie" : "tv"}/${item.id}`}
                className="rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform block"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                  className="w-full aspect-[2/3] object-cover"
                />
                <div className="p-2 text-center">
                  <h3 className="text-sm font-semibold truncate">
                    {item.title || item.name}
                  </h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Latest Movies Section */}
      <section className="py-12 container mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">🎬 Latest Movies</h2>
          <Link
            to="/movies/latest"
            className="px-4 py-2 bg-red-600 rounded-lg text-sm font-medium hover:bg-red-500 transition"
          >
            More
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {latestMovies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform block"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover"
              />
              <div className="p-2 text-center">
                <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest TV Section */}
      <section className="py-12 container mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">📺 Latest TV Shows</h2>
          <Link
            to="/tv/latest"
            className="px-4 py-2 bg-red-600 rounded-lg text-sm font-medium hover:bg-red-500 transition"
          >
            More
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {latestTV.map((tv) => (
            <Link
              key={tv.id}
              to={`/tv/${tv.id}`}
              className="rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform block"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                alt={tv.name}
                className="w-full aspect-[2/3] object-cover"
              />
              <div className="p-2 text-center">
                <h3 className="text-sm font-semibold truncate">{tv.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm h-[70px]">
        © 2025 Movie Browser App · Built by Jerome
      </footer>
    </main>
  );
};

export default Index;
