import React, { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { VideoPageContentProps } from '@/types/video-repo'

const VideoContentMobile: React.FC<VideoPageContentProps> = ({
  displayModal,
  videoID,
}) => {
  // to get the videoID
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()

    //custom file name
    const [customFileName, setCustomFileName] = useState('');
    const placeHolder = `Untitled_Video_${videoID}`;
  
    //get currnet window/tab url
    const [currentURL, setCurrentURL] = useState<string>('');
  
    //copy the url using COPY btn
    const [clicked, setClicked] = useState<boolean>(false);
  
    const copyToClipboard = () => {
      navigator.clipboard.writeText(currentURL);
      setClicked(true);
    };
  
    useEffect(() => {
      setCurrentURL(window.location.href);
    }, []);
  
    //set email 
    const [email, setEmail] = useState('');

  useEffect(() => {
    const currentVideoID = videoID || (router.query.videoID as string)
    if (currentVideoID && videoRef.current) {
      videoRef.current.src = `https://www.cofucan.tech/srce/api/video/${videoID}.mp4`; //new API from BE
    }
  }, [videoID, router.query.videoID])

  return (
    <div className="w-full h-auto block ss:hidden">
      {/* Name container */}
      <h4 className="text-[16px] text-gray-400 mb-[9px]">Name:</h4>
      <div className="flex items-center w-full justify-between gap-[24px] mb-[12px]">
        <h3 className="text-[13px] xs:text-[16px] ss:text-[24px] text-primary-400 font-[600]">
        <input
                type="text"
                placeholder={placeHolder}
                value={customFileName}
                onChange={(e) => setCustomFileName(e.target.value)}

                className="border-none outline-none rounded-md p-2 mb-2 w-full text-[13px] xs:text-[16px] ss:text-[24px] text-primary-400 font-[600]"

              />
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
      {videoID ? (
        <video
          ref={videoRef}
          controls
          className="w-full h-full mb-[24px] rounded-lg"
        >
          <source type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className='w-full h-full mb-10'>
          <Image
            src="/assets/video-repo/video-demo.svg"
            alt="demo"
            width="200"
            height={200}
            className='w-full h-full'
          />
        </div>
      )}
      {/* Email input and send button */}
      <div className="py-[12px] px-[8px] bg-primary-50 rounded-[12px] mb-[8px] h-[64px] w-full flex items-center justify-between">
      <input
          type="email"
          name="receiverEmail"
          placeholder="Enter email of receiver"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-black-400 text-[13px] xs:text-[16px] ss:text-[18px] font-[400] w-full bg-transparent outline-none"
        />
        <div
          onClick={displayModal}
          className="xs:px-[18px] px-[10px] py-[10px] cursor-pointer text-[13px] xs:text-[16px] rounded-[8px] bg-primary-400 text-pastel-bg font-Work-Sans"
        >
          Send
        </div>
      </div>
      <h2 className="font-Work-Sans text-[14px] font-[400] text-gray-400 text-center ss:mb-[64px]">
        Your video to johnmark@gmail.com is now ready.
        <span className="text-primary-600 font-[500] underline">
          {' '}
          Not the receiver?
        </span>
      </h2>
      {/* Share options */}
      <div className="mt-[44px] flex flex-wrap gap-3 items-center">
        <div onClick={copyToClipboard} className={`w-[177px] py-[10px] rounded-[8px] border-[1px] border-primary-400 font-[500] flex justify-center items-center gap-[8px] text-primary-600 font-Work-Sans cursor-pointer ${clicked ? 'bg-primary-400 text-pastel-bg' : 'border-primary-400 text-primary-600 '} hover:border-[2px]`}>

          <Image
            src="/assets/video-repo/copy.svg"
            alt=""
            width="20"
            height="20"
          />
          <h3>Copy video link</h3>
        </div>
        <div className="w-auto flex gap-2">
          <a href="https://api.whatsapp.com/send?text=">
            <Image
              src="/assets/video-repo/whatsapp.svg"
              alt="whatsapp"
              width="40"
              height="40"
            />
          </a>
          <a href="https://t.me/share/url?url=">
            <Image
              src="/assets/video-repo/telegram.svg"
              alt="telegram"
              width="40"
              height="40"
            />
          </a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=">
            <Image
              src="/assets/login/Facebook.svg"
              alt="facebook"
              width="40"
              height="40"
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default VideoContentMobile
