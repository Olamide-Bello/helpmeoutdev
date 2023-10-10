import React from 'react'

const VideoPlayer:React.FC<{ url: string }> = ({url}) => {
  return (
    <video
      className="w-full b rounded-lg border border-gray-200 border-opacity-60 pt-2 pr-2 pb-3 pl-2 bg-opacity-50 object-cover aspect-video"
      controls
    >
      <source src={url} type="video/mp4" />
    </video>
  )
}

export default VideoPlayer