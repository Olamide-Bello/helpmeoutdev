/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import React from 'react'

const Transcript = () => {
  return (
    <div className='w-full'>
      <h5 className="text-h6 ss:text-h5 text-black font-Sora font-[600] mb-4">
        Transcript
      </h5>
      <div className="mb-[40px] gap-[80px] border-[1px] px-[8px] w-[170px] h-[35px] items-center rounded-[4px] hidden ss:flex">
        <h6 className="text-h6 text-gray-300">English</h6>
        <Image
          src="/assets/video-repo/arrow-down.svg"
          alt="arrow down"
          width="16"
          height="16"
        />
      </div>
      <div className="w-full h-auto relative">
        <div className="font-Inter h-[164px] border-[1px] rounded-[12px]  ss:border-none p-3 ss:h-[255px]   gap-4 relative">
          <div className='p-2 overflow-y-scroll custom-scrollbar flex flex-col h-full'>
            <div className="flex gap-4">
              <h5 className="font-[400] font-Work-Sans text-[14px] xs:text-[16px] text-black">
                0:01
              </h5>
              <p className="font-[500] text-[12px] ss:text-[16px] text-black ">
                First step. Open Facebook on your desktop or mobile device and
                locate "Marketplace" in the left-hand menu or at the top of the{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transcript
