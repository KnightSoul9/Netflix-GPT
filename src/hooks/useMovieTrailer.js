import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/constants";
import { useEffect } from "react";
import { addTrailerVideo } from "../Utils/moviesSlice";

const useMovieTrailer = (movieId)=>{
    const dispatch = useDispatch();
    const getMovieVideos = async()=>{
        const data = await fetch('https://api.themoviedb.org/3/movie/'+movieId+'/videos?language=en-US',API_OPTIONS)
        const json =await data.json();
        console.log(json.results);
        const filterData = json.results.filter((video)=>video.type==="Trailer");
        const trailer = filterData.length?filterData[1]:json.results[1];
        console.log(trailer);
        dispatch(addTrailerVideo(trailer))
      }
      useEffect(()=>{
        getMovieVideos();
      },[])
}
export default useMovieTrailer;