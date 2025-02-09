import React from 'react'
import { useSelector } from 'react-redux'
import useMovieTrailer from '../hooks/useMovieTrailer'

const VideoBackground = ({movieId}) => {
  const trailerVideo = useSelector(store=>store.movies?.trailerVideo)
  useMovieTrailer(movieId)
  
  return (
    <div className="w-screen relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70 z-10"></div>
      <div className="w-full aspect-video overflow-hidden">
        <iframe
          className="w-full h-full object-cover"
          src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=${trailerVideo?.key}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Movie Trailer"
        ></iframe>
      </div>
    </div>
  )
}

export default VideoBackground
