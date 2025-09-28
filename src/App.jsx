import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Movies from "./pages/Movies";
import Navbar from "./components/Navbar";
import MovieDetails from "./pages/MovieDetails";

function App() {
  const location = useLocation();

  // ✅ Dynamic title
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "Movie Browser App | Home";
        break;
      case "/movies":
        document.title = "Movie Browser App | Movies";
        break;
      // add more routes here
      default:
        document.title = "Movie Browser App";
    }
  }, [location]);

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      {/* ✅ Navbar is global */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}

export default App;
