
import React, { useState, useEffect, useContext } from 'react';

import Image from 'next/image'
import Logo2 from '../public/assets/video-repo/logo-2.png'
import { FiSearch } from 'react-icons/fi'
import Navbar from '@/components/shared/Navbar'
// import { Spinner } from '../../components/shared/Loader'
// import VideoCard from '../../components/shared/VideoCard'
import Link from 'next/link';
import axios from 'axios';
import { GlobalContext } from '../context/GlobalContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Video {
  id: number;
  username: string;
  src: string;
  created_date: string;
}

function Videos() {

  const { user } = useContext(GlobalContext);
  const displayName: string = user?.displayName || 'user13';

  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`https://www.cofucan.tech/srce/api/recording/user/${displayName}`);
        const formattedVideos: Video[] = response.data.map((video: any) => ({
          id: video.id,
          username: video.title,
          src: video.original_location, // Update this according to your API response
          created_date: formatDate(video.created_date),
        }));
        setVideos(formattedVideos);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, [user]);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate.toUpperCase();
  };

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
   <div>
      <div className="w-full min-h-screen overflow-y-hidden">
        <div className="w-full min-h-full mb-8 flex flex-col justify-between">
          <Navbar />
          <div className="w-full px-4 lg:px-12 py-5 flex flex-col lg:flex-row md:flex-col sm:flex-col items-center lg:items-start justify-between">
            <div className="w-full lg:w-auto flex flex-col items-start justify-start">
              <h1 className="text-2xl lg:text-3xl sm:text-sm font-bold mb-3">
                Hello, John Mark
              </h1>
              <p className="text-gray-400 text-xs sm:text-sm">
                Here are your recorded videos
              </p>
            </div>
            <div className="w-full max-w-xs lg:max-w-[250px] bg-white px-2 lg:px-4 flex items-center justify-center border rounded-lg mt-3 lg:mt-0">
              <FiSearch size={15} color="#ccc" />
              <input
                type="text"
                className="w-full py-2 bg-transparent outline-none border-none px-2 text-sm text-gray-400"
                placeholder="Search for a video"
              />
            </div>
          </div>
        
        <div
            style={{
              borderTop: '1px solid lightgray',
              paddingTop: '50px',
            }}
            className="w-full px-4 lg:px-12 mt-9 flex flex-col gap-4 overflow-y-scroll"
          > 
            <p className="text-gray-600 font-medium text-sm lg:text-base">
              Recent files
            </p>
            <div className="w-full flex items-center justify-start flex-wrap gap-4 lg:gap-7">
            {videos.map((item, index) => (
                <Link key={index} href={`/videos/${item?.id}`} passHref>
                              <div
                key={index}
                className="w-full lg:w-1/2 p-2 md:p-4 lg:p-2 xl:p-4 max-w-[500px] max-h-[250px] lg:max-h-[300px] border border-gray-200 rounded-md"
              >
                <video
                  controls
                  className="w-full h-[150px] lg:h-[200px] rounded-md bg-gray-300 object-cover"
                >

                  <source src={item.src} type="video/mp4" />
                </video>
                <div className="flex justify-between mt-2">
                  <p className="text-black-700 font-medium text-sm lg:text-base">
                    {item.username}
                  </p>
                  <div className="flex">
                    <img
                        className="w-4 h-4 object-contain mr-2"
                      src="/assets/video-repo/link.png"
                      alt="Link"
                    />
                    <img
                        className="w-4 h-4 object-contain"
                      src="/assets/video-repo/more.png"
                      alt="More"
                    />

                  </div>
                </div>
                <p className="text-gray-400 opacity-50 text-xs lg:text-sm">
                  {item?.created_date}
                </p>
              </div>
              </Link>
                         ))}
          </div>
        </div>
      </div>
      <ToastContainer 
          position="top-center" // Position the toast container at the bottom-center
          autoClose={1500} // Close after 3 seconds (adjust as needed)
          style={{
         width: 'fit-content', // Adjust the width as needed
         textAlign: 'center', // Center-align the container's content
         }}
       />
    </div>
    </div>
     )
}

export default Videos

