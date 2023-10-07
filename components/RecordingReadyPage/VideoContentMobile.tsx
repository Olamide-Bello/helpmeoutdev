import React from 'react'
import Image from 'next/image'
import { VideoPageContentProps } from '@/types/video-repo'

const VideoContentMobile: React.FC<VideoPageContentProps> = ({
  displayModal,
}) => {
  return (
    <div className="w-full h-auto block ss:hidden">
      {/* Name container */}
      <h4 className="text-[16px] text-gray-400 mb-[9px]">Name:</h4>
      <div className="flex items-center gap-[24px] mb-[12px]">
        <h3 className="text-[13px] xs:text-[16px] ss:text-[24px] text-primary-400 font-[600]">
          Untitled_Video_20232509
        </h3>
        <Image
          className="w-[16px] h-auto xs:h-[24px] xs:w-[24px]"
          src="/assets/video-repo/edit.svg"
          alt="edit"
          width="32"
          height="32"
        />
      </div>
      {/* Video demo */}
      <Image
        src="/assets/video-repo/video-demo.svg"
        width="200"
        height="200"
        alt="video-demo"
        className="w-full h-auto mb-[24px]"
      />
      {/* Email input and send button */}
      <div
        onClick={displayModal}
        className="py-[12px] px-[8px] bg-primary-50 rounded-[12px] mb-[8px] h-[64px] w-full flex items-center justify-between"
      >
        <input
          type="email"
          name="receiverEmail"
          placeholder="Johnmark@gmail.com"
          className="text-black-400 text-[13px] xs:text-[16px] ss:text-[18px] font-[400] w-full bg-transparent outline-none"
        />
        <div className="xs:px-[18px] px-[10px] py-[10px] cursor-pointer text-[13px] xs:text-[16px] rounded-[8px] bg-primary-400 text-pastel-bg font-Work-Sans">
          Send
        </div>
      </div>
      <h2 className="font-Work-Sans text-[14px] font-[400] text-gray-400 text-center ss:mb-[64px]">
        Your video to johnmark@gmail.com is now ready.
        <span className="text-primary-600 font-[500] underline"> Not the receiver?</span>
      </h2>
      {/* Share options */}
      <div className="mt-[44px] flex flex-wrap gap-3 items-center">
        <div className="w-[177px] py-[10px] rounded-[8px] border-[1px] border-primary-400 font-[500] flex justify-center items-center gap-[8px] text-primary-600 font-Work-Sans">
          <Image
            src="/assets/video-repo/copy.svg"
            alt=""
            width="20"
            height="20"
          />
          <h3>Copy video link</h3>
        </div>
        <div className="w-auto flex gap-2">
          <Image
            src="/assets/video-repo/whatsapp.svg"
            alt="whatsapp"
            width="40"
            height="40"
          />
          <Image
            src="/assets/video-repo/telegram.svg"
            alt="telegram"
            width="40"
            height="40"
          />
          <Image
            src="/assets/login/Facebook.svg"
            alt="facebook"
            width="40"
            height="40"
          />
        </div>
      </div>
    </div>
  )
}

export default VideoContentMobile
