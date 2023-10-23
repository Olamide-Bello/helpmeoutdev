import { VideoPlayerProps } from '@/types/video-player'
import React, { useRef, useState, useEffect } from 'react'

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  duration,
  videoID,
  setCurrentVideoTime,
  setCurrentVidDuration,
}) => {
  const [currentTime, setCurrentTime] = useState<number>(0)
  const recRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [showPlayButton, setShowPlayButton] = useState(true)

  const hidePlayButton = () => {
    setShowPlayButton(false);
  }

  
  //to update the timer every second and set the duration
  useEffect(() => {
    const interval = setInterval(() => {
      if (recRef.current) {
        setCurrentTime(recRef.current.currentTime)
        setIsPlaying(!recRef.current.paused)
        setShowPlayButton(true)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // this toggles the play/pause state of the video
  const playPause = () => {
    const player = document.getElementById('videoPlayer')
    if ((player as HTMLVideoElement).paused) {
      recRef.current?.play()
    } else {
      recRef.current?.pause()
    }
  }

  const playPauseIcon = isPlaying ? (
    <svg
      onClick={playPause}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      width="48"
      height="48"
      fill="#FF0000"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M5.5 0a.5.5 0 0 1 .5.5V15a.5.5 0 0 1-.5.5a.5.5 0 0 1-.5-.5V.5a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5V15a.5.5 0 0 1-.5.5a.5.5 0 0 1-.5-.5V.5a.5.5 0 0 1 .5-.5z"
      ></path>
    </svg>
  ) : (
    <svg
    onClick={playPause}
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
    width="48"
    height="48"
    fill="#FF0000"
    viewBox="0 0 16 16"
>
<path d="M4.5 0v12L12 6z" fill="#ff0000"></path>
</svg>
  )


  const customTime = (seconds: number, duration: number) => {
    const timeLeft = duration - seconds
    const minutes = Math.floor(timeLeft / 60)
    const remainingSeconds = Math.floor(timeLeft % 60)
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`
  }

  //current time of the video
  //to get the current duration of video
  const [currentVidTime, setCurrentVidTime] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      if (recRef.current) {
        setCurrentVidTime(recRef.current.currentTime)
      }
    }, 1000) // Update every second

    return () => clearInterval(interval)
  }, [])

  // to set CurrentVideoTime
  const handleTimeUpdate = (event: any) => {
    // console.log("this handletimeupdate is called")
    setCurrentVideoTime(event.target.currentTime)
  }

  // to set current video duration - overall duration of the video
  useEffect(() => {
    const fetchVideo = async () => {
      // const videoUrl = `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`;
      const videoUrl = `https://api.helpmeout.tech/video/${videoID}.mp4`
      const video = document.createElement('video')

      video.src = videoUrl
      video.preload = 'metadata' // Preload metadata to get duration

      video.addEventListener('loadeddata', function () {
        const duration = video.duration
        if (duration <= 1200) {
          setCurrentVidDuration(duration)
        }
        console.log(`The video duration is ${duration} seconds.`)
      })
    }

    fetchVideo()
  }, [videoID, setCurrentVidDuration])

  return (
    <div className="pt-2 px-2 pb-3 bg-[#FBFBFB80] relative  rounded-[24px] border border-gray-200 border-opacity-60 bg-opacity-50 h-full">
      <video
        id="videoPlayer"
        
        ref={recRef}
        autoPlay
        onTimeUpdate={handleTimeUpdate}
        onMouseMove={hidePlayButton}
        className="w-full md:max-h-[500px] b rounded-[16px] border border-gray-200 border-opacity-60 bg-opacity-50 object-cover aspect-video"
      >
        <source src={url} type="video/mp4" />
      </video>
      <div className="bottom-5 right-4 bg-[#E7E7ED] font-[500] font-Work-Sans text-[14px] px-[14px] py-[7px] absolute rounded-[4px] ">
        {customTime(currentTime, duration)}
      </div>
      <div className='absolute top-[50%] left-[50%] transform translate-x-[-50] translate-y-[-50]'>
      {showPlayButton  && playPauseIcon}
      </div>
    </div>
  )
}

export default VideoPlayer
