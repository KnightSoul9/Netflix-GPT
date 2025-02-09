import React, { useEffect } from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  
  // Initialize all movie data
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {showGptSearch ? (
        <div className="animate-fadeIn pt-16">
          <GptSearch />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-full">
            <MainContainer />
          </div>
          <div className="relative z-30 lg:absolute lg:top-[100vh] lg:left-0 lg:right-0">
            <SecondaryContainer />
          </div>
        </div>
      )}

      {/* Gradient overlay for smooth transitions */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </div>
  );
};

export default Browse;
