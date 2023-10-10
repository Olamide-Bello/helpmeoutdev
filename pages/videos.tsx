import React from 'react'
import Image from 'next/image'
import Logo2 from '../public/assets/video-repo/logo-2.png'
import { FiSearch } from 'react-icons/fi'
import Navbar from '@/components/shared/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'        
// import { Spinner } from '../../components/shared/Loader'
// import VideoCard from '../../components/shared/VideoCard'

function Videos() {
  const src =
    'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4'

  const details = [
    {
      src: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
      title: 'How to Create Facebook Ad Listing',
      date: '  SEPTEMBER 22, 2023',
    },
    {
      src: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
      title: 'How to Create Facebook Ad Listing',
      date: '  SEPTEMBER 22, 2023',
    },
    {
      src: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
      title: 'How to Create Facebook Ad Listing',
      date: '  SEPTEMBER 22, 2023',
    },
    {
      src: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
      title: 'How to Create Facebook Ad Listing',
      date: '  SEPTEMBER 22, 2023',
    },
    {
      src: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
      title: 'How to Create Facebook Ad Listing',
      date: '  SEPTEMBER 22, 2023',
    },
    {
      src: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
      title: 'How to Create Facebook Ad Listing',
      date: '  SEPTEMBER 22, 2023',
    },
    {
      src: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
      title: 'How to Create Facebook Ad Listing',
      date: '  SEPTEMBER 22, 2023',
    },
  ]
  return (
    <div className="w-full h-screen overflow-y-hidden">
      <div className="w-full h-full mb-8 flex flex-col justify-between">
        <Navbar />
        <div className="w-full px-[6em] py-5 flex items-start justify-between lg:flex-row md:flex-col sm:flex-col">
          <div className="w-auto flex flex-col items-start justify-start">
            <h1 className="text-black-600 lg:text-[2em] sm:text-sm font-bold mb-3">
              Hello, John Mark
            </h1>
            <p className="text-white-400 text-[12px] color-black-600 ">
              Here are your recorded videos
            </p>
          </div>
          <div className="w-full max-w-[250px] bg-white-300 px-4 flex items-center justify-start border rounded-lg">
            <FiSearch size={15} color="#ccc" />
            <input
              type="text"
              className="w-full py-3 bg-transparent outline-none border-none px-3 text-[10px] text-white-400 font-ppReg"
              placeholder="Search for a video"
            />
          </div>
        </div>
        <br />
        <div className="w-full px-[6em] min-h-[15em] mt-9 flex justify-start flex-col gap-4 mb-5 overflow-y-scroll">
          <p className="text-dark-200 font-ppReg text-[12px] ">Recent files</p>
          <div className="w-full flex items-center justify-start flex-wrap gap-7">
            {details.map((item, index) => (
              <div
                key={index}
                className="w-full p-4 max-w-[500px] max-h-[250px] h-full border-solid border-white-300 border-[2px] rounded-[10px] "
              >
                <video
                  controls
                  className="w-full h-[150px] rounded-[10px] bg-white-300 object-cover"
                >
                  <source src={item.src} type="video/mp4" />
                </video>
                <div className="flex justify-between mt-3">
                  <p className="text-dark-100 font-ppSB text-[15px] mt-1">
                    {item.title}
                  </p>
                  <div className="flex">
                    <Image
                      src="/assets/video-repo/link.png"
                      alt="stuff"
                      width={20}
                      height={20}
                    />
                    <Image
                      src="/assets/video-repo/more.png"
                      alt="stuff"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
                <p className="text-white-400 opacity-[.5] font-ppReg text-[11px]">
                  {item.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div><ToastContainer 
  position="top-center" // Position the toast container at the bottom-center
  autoClose={1500} // Close after 3 seconds (adjust as needed)
  style={{
    width: 'fit-content', // Adjust the width as needed
    textAlign: 'center', // Center-align the container's content
  }}
  />

    </div>
  );
}

export default Videos
