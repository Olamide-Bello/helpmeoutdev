import React from 'react'
import VideoInfo from './VideoInfo'
import VideoAndTranscript from './VideoAndTranscript'
import { VideoPageContentProps } from '@/types/video-repo'
import VideoContentMobile from './VideoContentMobile'

const VideoPageContent: React.FC<VideoPageContentProps> = ({
  displayModal, videoID
}) => {
  return (
    <div className="font-Sora w-full h-auto md:h-[970px] ss:pt-[40px] md:px-0 flex md:justify-between flex-col md:flex-row items-start gap-[84px] my-[32px] xs:my-[64px]">
      {/* Video information for tablet and Desktop view */}
      <VideoInfo displayModal={displayModal} videoID={videoID}/>
      {/* Video & information for mobile view */}
      <VideoContentMobile displayModal={displayModal} videoID={videoID}/>
      {/* Video for tablet & Desktop and transcript container */}
      <VideoAndTranscript videoID={videoID}/>
    </div>
  )
}

export default VideoPageContent
