import { IMG_CDN_URL } from "../Utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-32 sm:w-36 md:w-48 lg:w-56 pr-4 transition-all duration-300">
      <img 
        alt="Movie Card" 
        src={IMG_CDN_URL + posterPath}
        className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
      />
    </div>
  );
};
export default MovieCard;
