import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies.nowPlayingMovies && (
      <div className="bg-black min-h-screen">
        <div className="relative z-20 px-4 sm:px-6 md:px-8 pt-4 md:pt-6 lg:pt-8 mt-0 transition-all duration-300">
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <MovieList 
              title={"Recent Movies"} 
              movies={movies.nowPlayingMovies} 
            />
            <MovieList 
              title={"Upcoming Movies"} 
              movies={movies.upcomingMovies}
            />
            <MovieList 
              title={"Popular Movies"} 
              movies={movies.popularMovies}
            />
            <MovieList
              title={"Top Rated Movies"}
              movies={movies.topRatedMovies}
            />
          </div>
        </div>
      </div>
    )
  );
};
export default SecondaryContainer;
