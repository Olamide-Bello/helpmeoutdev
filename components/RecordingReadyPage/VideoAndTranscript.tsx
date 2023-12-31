import React, { useState } from 'react'
import VideoContainer from './VideoContainer'
import Transcript from './Transcript'
// import { VideoAndTranscriptProps } from '@/types/video-transcribe'
import Border from './Border'
import { VideoPageContentProps } from '@/types/video-repo'
import VideoContentMobile from './VideoContentMobile'



const VideoAndTranscript: React.FC<VideoPageContentProps> = ({
  displayModal,
  videoID,
  setEmail,
  email,
}) => {
  
    // Define state for current time
    const [currentTime, setCurrentTime] = useState(0);
    const [currentVidDuration, setCurrentVidDuration] = useState(0);

  return (
    <div className='flex w-full h-full '>
      <Border />
      <div className="md:pl-[40px] w-full h-full flex flex-col gap-[80px] ">
        {/* Video container for tablet and desktop screen */}
        <VideoContainer videoID={videoID} setCurrentVideoTime={setCurrentTime} setCurrentVidDuration={setCurrentVidDuration}/>

        {/* videoContent for mobile */}
        <VideoContentMobile displayModal={displayModal} videoID={videoID} setEmail={setEmail} email={email} />

        {/* Transcript for all screens */}
        <Transcript videoID={videoID} currentVideoTime={currentTime} currentVidDuration={currentVidDuration}/>
      </div>
    </div>
  )
}

export default VideoAndTranscript
