import React from 'react'
import VideoContainer from './VideoContainer'
import Transcript from './Transcript'

const VideoAndTranscript = () => {
  return (
    <div className="h-full flex flex-col gap-[80px] w-full">
      {/* Video container for tablet and desktop screen */}
      <VideoContainer />
      {/* Transcript for all screens */}
      <Transcript />
    </div>
  )
}

export default VideoAndTranscript
