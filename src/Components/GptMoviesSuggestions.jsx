import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieNames) return null;

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-8 mx-auto max-w-7xl">
      <div className="bg-black/80 backdrop-blur-sm rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8">
        <div className="space-y-8 md:space-y-12">
          {movieNames.map((movieName, index) => (
            <div key={movieName} className="transform transition-all duration-300 hover:scale-[1.01]">
              <MovieList
                title={movieName}
                movies={movieResults[index]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default GptMovieSuggestions;
