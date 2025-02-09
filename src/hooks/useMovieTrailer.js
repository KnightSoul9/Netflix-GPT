import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/constants";
import { useEffect } from "react";
import { addTrailerVideo } from "../Utils/moviesSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  
  const getMovieVideos = async () => {
    try {
      const data = await fetch(
        'https://api.themoviedb.org/3/movie/' + movieId + '/videos?language=en-US',
        API_OPTIONS
      );
      const json = await data.json();
      
      // Filter for available trailers
      const trailers = json.results.filter(video => video.type === "Trailer" && video.site === "YouTube");
      
      if (trailers.length > 0) {
        // Use first available trailer
        dispatch(addTrailerVideo(trailers[0]));
      } else {
        // If no trailers found, try to find any video
        const anyVideo = json.results.find(video => video.site === "YouTube");
        if (anyVideo) {
          dispatch(addTrailerVideo(anyVideo));
        }
      }
    } catch (error) {
      console.error("Error fetching movie trailer:", error);
    }
  };

  useEffect(() => {
    getMovieVideos();
  }, [movieId]); // Add movieId as dependency
};

export default useMovieTrailer;