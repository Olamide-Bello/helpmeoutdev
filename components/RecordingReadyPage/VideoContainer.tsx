import React from 'react'
import Image from 'next/image'

const VideoContainer = () => {
  return (
    <div className="hidden w-full md:w-[575px] h-auto aspect-[575/475] rounded-[8px] bg-gray-200 border-[1px] border-primary-400 ss:flex flex-col overflow-hidden">
      <video className="w-full h-full">
        <source type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="w-full h-[80px] bg-white flex justify-between items-center  px-[12px] ss:px-[40px]">
        <h3 className="font-Inter text-primary-200 font-[500] text-[14px] ss:text-[24px]">
          0:00 / -:--
        </h3>
        <div className="h-full flex gap-[14px] ss:gap-[40px] justify-center ">
          <div className="h-full flex flex-col justify-center items-center">
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
          <div className="h-full flex flex-col justify-center items-center">
            <Image
              src="/assets/video-repo/volume-high.svg"
              alt="volume"
              width="24"
              height="24"
            />
            <p className="font-Work-Sans text-black-600 font-[500] text-[12px]">
              Volume
            </p>
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
