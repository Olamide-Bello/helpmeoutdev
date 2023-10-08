import React from 'react'

const VideoPlayer:React.FC<{ url: string }> = ({url}) => {
  return (
    <iframe
      className="w-full min-h-[450px] b rounded-lg border border-gray-200 border-opacity-60 pt-2 pr-2 pb-3 pl-2 bg-opacity-50"
      src={url}
      title="Screen Recording"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowFullScreen
    ></iframe>
  )
}

export default VideoPlayer