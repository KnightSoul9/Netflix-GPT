const VideoTitle = ({title,overview}) => {
  return (
    <div className='pt-[30%] px-12 absolute w-screen aspect-video text-white bg-gradient-to-r from-slate-900 '>
        <h1 className="text-4xl font-bold text-slate-300">{title}</h1>
        <p className="py-6 text-lg w-1/2 text-slate-300">{overview}</p>
        <div>
            <button className="my-2 bg-white text-black p-4 px-12 text-xl rounded-lg hover:bg-opacity-80"> ▶️ Play</button>
            <button className="mx-4 my-2 bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg hover:bg-opacity-80">More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle