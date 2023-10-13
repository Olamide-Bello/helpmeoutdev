import React from 'react'
import VideoContainer from './VideoContainer'
import Transcript from './Transcript'
import { VideoAndTranscriptProps } from '@/types/video-transcribe'
import Border from './Border'

const VideoAndTranscript: React.FC<VideoAndTranscriptProps> = ({ videoID }) => {
  return (
    <div className='flex w-full h-full '>
      <Border />
      <div className="md:pl-[40px] h-full flex flex-col gap-[80px] w-[1/2]">
        {/* Video container for tablet and desktop screen */}
        <VideoContainer videoID={videoID} />
        {/* Transcript for all screens */}
        <Transcript videoID={videoID}/>
      </div>
    </div>
  )
}

export default VideoAndTranscript
