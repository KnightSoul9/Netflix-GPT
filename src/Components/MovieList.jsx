import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-4 sm:px-6 md:px-8">
      <h1 className="text-xl md:text-2xl lg:text-3xl py-4 text-white font-bold tracking-wide">{title}</h1>
      <div className="relative">
        <div className="flex overflow-x-scroll scrollbar-hide scroll-smooth">
          <div className="flex gap-4">
            {movies?.map((movie) => (
              <div key={movie.id} className="flex-none transition-transform hover:scale-105">
                <MovieCard posterPath={movie.poster_path} />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-black/80 to-transparent w-8"></div>
        <div className="absolute top-0 bottom-0 right-0 bg-gradient-to-l from-black/80 to-transparent w-8"></div>
      </div>
    </div>
  );
};
export default MovieList;
