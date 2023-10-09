import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import { VideoContainerProps } from '@/types/video-container'


const VideoContainer: React.FC<VideoContainerProps> = ({ videoID }) => {

  //to get the videoID
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  useEffect(() => {
    const currentVideoID = videoID || (router.query.videoID as string);
    if (currentVideoID && videoRef.current) {
      console.log("videoREF:", videoRef);
      videoRef.current.src = `http://web-02.cofucan.tech/srce/api/recording/${currentVideoID}`;  //API that is given by BE
      // videoRef.current.src = `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`; //API that i've taken from online
    }
  }, [videoID, router.query.videoID]);

  //to get the current duration of video
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
      }
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  //setting up play and pause functionality by clicking button
  const [isPlaying, setIsPlaying] = useState(false);
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  //setting up the volumn slider
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [volume, setVolume] = useState(1);
  const [volumeSliderTimeout, setVolumeSliderTimeout] = useState<NodeJS.Timeout | null>(null);

  const hideVolumeSlider = () => {
    setShowVolumeSlider(false);
  };

  const startVolumeSliderTimeout = () => {
    if (volumeSliderTimeout) {
      clearTimeout(volumeSliderTimeout);
    }

    setVolumeSliderTimeout(setTimeout(hideVolumeSlider, 3000)); // Adjust the time (in milliseconds) here
  };

  const toggleVolumeSlider = () => {
    setShowVolumeSlider(!showVolumeSlider);

    if (!showVolumeSlider) {
      startVolumeSliderTimeout();
    } else {
      if (volumeSliderTimeout) {
        clearTimeout(volumeSliderTimeout);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);

    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    startVolumeSliderTimeout();
  };



  return (
    <div className="hidden w-full h-auto aspect-[575/475] rounded-[8px] bg-gray-200 border-[1px] border-primary-400 ss:flex flex-col overflow-hidden">
      <div className='w-full h-full bg-red-300'>
      {videoID && <video ref={videoRef} controls className="w-full h-auto">
        <source type="video/mp4" />
        Your browser does not support the video tag.

      </video>}
      </div>
      <div className="w-full h-[80px] bg-white flex justify-between items-center  px-[12px] ss:px-[40px]">
        <h3 className="font-Inter text-primary-200 font-[500] text-[14px] ss:text-[24px]">
        {
          formatTime(currentTime)
        }
        </h3>
        <div className="h-full flex gap-[14px] ss:gap-[40px] justify-center cursor-pointer">
          <div  onClick={togglePlayPause} className="h-full flex flex-col justify-center items-center">
            <Image
              src="/assets/video-repo/play-circle.svg"
              alt="play"
              width="24"
              height="24"
            />
            <p className="font-Work-Sans text-black-600 font-[500] text-[12px]">
              Play
            </p>
          </div>
          <div  onClick={toggleVolumeSlider} className="h-full flex flex-col justify-center items-center cursor-pointer">
            <Image
              src="/assets/video-repo/volume-high.svg"
              alt="volume"
              width="24"
              height="24"
            />
            <p className="font-Work-Sans text-black-600 font-[500] text-[12px]">
              Volume
            </p>
            {showVolumeSlider && (
              <div className=' writing-mode: bt-lr h-4 w-[90px] absolute flex justify-center items-center bg-gray-100 rounded-lg'>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className='h-3  w-[75px] rounded-full '
                />
              </div>
            )}
          </div>
          <div className="h-full flex flex-col justify-center items-center">
            <Image
              src="/assets/video-repo/setting.svg"
              alt="setting"
              width="24"
              height="24"
            />
            <p className="font-Work-Sans text-black-600 font-[500] text-[12px]">
              Settings
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoContainer
