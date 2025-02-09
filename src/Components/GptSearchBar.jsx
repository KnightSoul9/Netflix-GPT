import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../Utils/languageConstant";
import { API_OPTIONS, OPENAI_key } from "../Utils/constants";
import { addGptMovieResult } from "../Utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  // Function to search a movie on TMDB
  const searchMovieTMDB = async (movie) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      if (!response.ok) throw new Error(`Failed to fetch TMDB results for "${movie}"`);
      const json = await response.json();
      return json.results || [];
    } catch (error) {
      console.error("Error fetching TMDB results:", error);
      return [];
    }
  };

  // Function to handle GPT Search using Together AI
  const handleGptSearchClick = async () => {
    if (!searchText.current.value.trim()) {
      alert("Please enter a movie query.");
      return;
    }

    const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query: ${searchText.current.value.trim()}. Only provide the names of 5 movies, comma-separated.`;

    try {
      const response = await fetch("https://api.together.xyz/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_key}`,
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
          messages: [{ role: "user", content: gptQuery }],
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch from Together AI");

      const data = await response.json();
      const gptContent = data.choices?.[0]?.message?.content;

      if (!gptContent) throw new Error("Together AI returned no results.");

      const gptMovies = gptContent
        .split(",")
        .map((movie) => movie.trim())
        .filter(Boolean);

      if (gptMovies.length === 0) throw new Error("No valid movie names returned.");

      const tmdbResults = await Promise.all(gptMovies.map((movie) => searchMovieTMDB(movie)));

      dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }));
    } catch (error) {
      console.error("Error in Together AI Search:", error);
      alert("Something went wrong while fetching recommendations. Please try again later.");
    }
  };

  return (
    <div className="pt-[35%] sm:pt-[25%] md:pt-[15%] lg:pt-[10%] px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <form 
        className="w-full max-w-3xl mx-auto bg-black/80 backdrop-blur-md p-6 rounded-xl shadow-2xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            ref={searchText}
            type="text"
            className="flex-grow px-6 py-4 rounded-xl text-lg bg-white/10 text-white border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300 placeholder-gray-400"
            placeholder={lang[langKey]?.gptSearchPlaceholder || "Search for movies..."}
          />
          <button
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-purple-900 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/30 text-lg"
            onClick={handleGptSearchClick}
          >
            {lang[langKey]?.search || "Search"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GptSearchBar;
