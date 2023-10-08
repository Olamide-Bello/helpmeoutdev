import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import { VideoPageContentProps } from '@/types/video-repo'

const VideoInfo: React.FC<VideoPageContentProps> = ({ displayModal, videoID  }) => {

  // to get the videoID
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  useEffect(() => {
    const currentVideoID = videoID || (router.query.videoID as string);
    if (currentVideoID && videoRef.current) {
      videoRef.current.src = `http://web-02.cofucan.tech/srce/api/video/stream/${currentVideoID}`;
    }
  }, [videoID, router.query.videoID]);

  //custom file name
  const [customFileName, setCustomFileName] = useState(`Untitled_Video_${videoID}`);



  return (
    <div className="hidden ss:flex flex-col items-start gap-[64px] w-full md:w-[550px]">
      {/* Header */}
      <div>
        <h2 className="text-black-600 text-[32px] xs:text-[45px] font-[700] mb-[48px]">
          Your video is ready!
        </h2>
        {/* Name container */}
        <div>
          <h4 className="text-[16px] text-gray-400 mb-[9px]">Name:</h4>
          <div className="flex items-center gap-[24px] md:w-[550px] w-full">
              <input
                type="text"
                placeholder={customFileName}
                value={customFileName}
                onChange={(e) => setCustomFileName(e.target.value)}
                className="border-none outline-none rounded-md p-2 mb-2 w-full text-[13px] xs:text-[16px] ss:text-[24px] text-primary-400 font-[600]"
              />
            <Image
              className="w-[16px] h-auto xs:h-[32px] xs:w-[32px]"
              src="/assets/video-repo/edit.svg"
              alt="edit"
              width="32"
              height="32"
            />
          </div>
        </div>
      </div>
      {/* Email input and send button */}
      <div className="py-[12px] px-[10px] xs:px-[24px] bg-primary-50 rounded-[16px] h-[64px] w-full flex items-center justify-between">
        <input
          type="email"
          name="receiverEmail"
          placeholder="Enter email of receiver"
          className="text-black-400 text-[13px] xs:text-[16px] ss:text-[18px] font-[400] w-full bg-transparent outline-none"
        />
        <div
          onClick={displayModal}
          className="xs:px-[18px] px-[10px] py-[10px] cursor-pointer text-[13px] xs:text-[16px] rounded-[8px] bg-primary-400 text-pastel-bg font-Work-Sans"
        >
          Send
        </div>
      </div>
      {/* Video URL */}
      <div className="w-full">
        <h2 className="text-black-600 font-Sora text-[20px] mb-[16px] font-[600] ">
          Video Url
        </h2>
        <div className="py-[12px] md:px-[12px] px-[12px] border-[1px] border-primary-200 rounded-[16px] h-[64px] w-full flex items-center gap-2 justify-between">
          <p className="text-black-400 text-[14px] ss:w-full w-[150px] xs:w-[250px] ss:text-[16px] font-[400] leading-[24.8px] font-Work-Sans overflow-x-hidden">
            https://www.helpmeout/Untitled_Video_20232509
          </p>
          <div className="w-[104px] py-[10px] rounded-[8px] border-[1px] border-primary-400 font-[500] flex justify-center items-center gap-[8px] text-primary-600 font-Work-Sans">
            <Image
              src="/assets/video-repo/copy.svg"
              alt=""
              width="20"
              height="20"
            />
            <h3>Copy</h3>
          </div>
        </div>
      </div>
      {/* Share options */}
      <div className="">
        <p className="text-black-600 font-Sora text-[16px] mb-[16px] font-[600]">
          Share your video
        </p>
        <div className="flex flex-wrap gap-[16px]">
          <div className="flex gap-[8px] px-[16px] py-[12px] items-center border-[1px] border-black-600 rounded-[8px]">
            <Image
              src="/assets/login/Facebook.svg"
              alt="facebook"
              width="20"
              height="20"
            />
            <h3 className="text-black-600 font-Sora text-[16px] font-[500]">
              Facebook
            </h3>
          </div>
          <div className="flex gap-[8px] px-[16px] py-[12px] items-center border-[1px] border-black-600 rounded-[8px]">
            <Image
              src="/assets/video-repo/whatsapp.svg"
              alt="Whatsapp"
              width="20"
              height="20"
            />
            <h3 className="text-black-600 font-Sora text-[16px] font-[500]">
              Whatsapp
            </h3>
          </div>
          <div className="flex gap-[8px] px-[16px] py-[12px] items-center border-[1px] border-black-600 rounded-[8px]">
            <Image
              src="/assets/video-repo/telegram.svg"
              alt="Telegram"
              width="20"
              height="20"
            />
            <h3 className="text-black-600 font-Sora text-[16px] font-[500]">
              Telegram
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoInfo
