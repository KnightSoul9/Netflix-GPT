import { BG_URL } from "../Utils/constants";
import GptMovieSuggestions from "./GptMoviesSuggestions";
import GptSearchBar from "./GptSearchBar";

const GPTSearch = () => {
  return (
    <div className="min-h-screen">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <img 
          className="w-full h-full object-cover" 
          src={BG_URL} 
          alt="background" 
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 pt-[10vh]">
          <GptSearchBar />
          <GptMovieSuggestions />
        </div>
      </div>
    </div>
  );
};
export default GPTSearch;
