import { FaPlay } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";

const VideoTitle = ({title,overview}) => {
  // Limit overview to 15 words
  const limitedOverview = overview.split(' ').slice(0, 15).join(' ') + (overview.split(' ').length > 15 ? '...' : '');

  return (
    <div className='w-screen aspect-video absolute text-white flex flex-col justify-end pb-[8%] px-6 md:px-12'>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white/90 drop-shadow-lg">{title}</h1>
        <p className="hidden md:block py-4 md:py-6 text-sm md:text-lg lg:text-xl w-[90%] md:w-1/2 text-white/80">{limitedOverview}</p>
        <div className="flex flex-wrap gap-3 mt-2">
            <button className="bg-white/90 text-black py-2 md:py-4 px-6 md:px-12 text-sm md:text-xl rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-2">
                <FaPlay className="text-lg md:text-2xl" /> Play
            </button>
            <button className="bg-gray-500/70 text-white py-2 md:py-4 px-6 md:px-12 text-sm md:text-xl rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-2">
                <IoInformationCircle className="text-xl md:text-3xl" /> More Info
            </button>
        </div>
    </div>
  )
}

export default VideoTitle