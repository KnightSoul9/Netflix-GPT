import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground'

const MainContainer = () => {
    const movies = useSelector(store=>store.movies?.nowPlayingMovies)
    if(!movies) return;
    const mainMovie = movies[11];
    const {original_title,overview,id} = mainMovie;
  return (
    <div className="relative w-screen">
      <VideoBackground movieId={id}/>
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70 z-5"></div>
      <div className="absolute inset-0 z-20 bg-black/30">
        <VideoTitle title={original_title} overview={overview}/>
      </div>
    </div>
  )
}

export default MainContainer