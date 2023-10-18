import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import Logo2 from '../public/assets/video-repo/logo-2.png'
import { FiSearch } from 'react-icons/fi'
import Navbar from '@/components/shared/Navbar'
// import { Spinner } from '../../components/shared/Loader'
// import VideoCard from '../../components/shared/VideoCard'
import Link from 'next/link'
import axios from 'axios'
import { GlobalContext } from '../context/GlobalContext'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from '../components/Spinner/Spinner'
import MainLayout from '@/components/shared/MainLayout'
import { useRouter } from 'next/router'

interface Video {
  id: number
  name: string
  src: string
  created_date: string
  duration?: number
}

function Videos() {
  const router = useRouter()
  const { id } = router.query
  const { user } = useContext(GlobalContext)
  //const displayName: string = user?.displayName || 'user13'

  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showDeleteOption, setShowDeleteOption] = useState(false)
  const [selectedVideoId, setSelectedVideoId] = useState<number | null>(null)

  useEffect(() => {
    fetchVideos()
  }, [user])

 /*  const fetchVideos = async () => {
    try {
      const headers = new Headers()
      headers.append('Authorization', 'Bearer YOUR_ACCESS_TOKEN') // Add your access token or any other necessary headers

      const response = await fetch(
        `https://www.cofucan.tech/srce/api/recording/user/${user}`,
        {
          method: 'GET',
          headers: headers,
        },
      )

      if (response.ok) {
        const responseData = await response.json() // Parse JSON response
        const formattedVideos: Video[] = await Promise.all(
          responseData.map(async (video: any) => {
            const videoElement = document.createElement('video')
            videoElement.src = video.original_location
            return new Promise<Video>((resolve) => {
              videoElement.onloadedmetadata = () => {
                const duration = videoElement.duration // Duration in seconds
                resolve({
                  id: video.id,
                  name: video.title,
                  src: video.thumbnail_location,
                  created_date: formatDate(video.created_date),
                  duration: duration,
                })
              }

              videoElement.onerror = (error) => {
                console.error('Error loading video:', error)
                resolve({
                  id: video.id,
                  name: video.title,
                  src: video.thumbnail_location,
                  created_date: formatDate(video.created_date),
                  duration: 0, // Set duration to 0 if there's an error loading the video
                })
              }

              videoElement.load()
            })
          }),
        )

        setVideos(formattedVideos)
        setLoading(false)
      } else {
        console.error('Error fetching videos:', response.status)
        setLoading(false)
      }
    } catch (error) {
      console.error('Error fetching videos:', error)
      setLoading(false)
    }
  } */
  const fetchVideos = async () => {
    setLoading(true); // Set loading state to true when starting the fetch operation
    try {
      const headers = new Headers();
      headers.append('Authorization', 'Bearer YOUR_ACCESS_TOKEN'); // Add your access token or any other necessary headers
  
      const response = await fetch(
        `https://www.cofucan.tech/srce/api/recording/user/${user}`,
        {
          method: 'GET',
          headers: headers,
        }
      );
  
      if (response.ok) {
        const responseData = await response.json(); // Parse JSON response
        const formattedVideos: Video[] = await Promise.all(
          responseData.map(async (video: any) => {
            const videoElement = document.createElement('video');
            videoElement.src = video.original_location;
            return new Promise<Video>((resolve) => {
              videoElement.onloadedmetadata = () => {
                const duration = videoElement.duration; // Duration in seconds
                resolve({
                  id: video.id,
                  name: video.title,
                  src: video.thumbnail_location,
                  created_date: formatDate(video.created_date),
                  duration: duration,
                });
              };
  
              videoElement.onerror = (error) => {
                console.error('Error loading video:', error);
                resolve({
                  id: video.id,
                  name: video.title,
                  src: video.thumbnail_location,
                  created_date: formatDate(video.created_date),
                  duration: 0, // Set duration to 0 if there's an error loading the video
                });
              };
  
              videoElement.load();
            });
          })
        );
  
        setVideos(formattedVideos);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
      // Handle errors here
    } finally {
      setLoading(false); // Set loading state to false after the fetch operation is complete (either success or error)
    }
  };
  

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const filteredVideos = videos.filter((video) =>
    video.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options,
    )
    return formattedDate.toUpperCase()
  }
  const formatDuration = (duration: number): string => {
    const seconds = Math.floor(duration) // Round down to get whole seconds
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds,
    ).padStart(2, '0')}`
  }

  const handleMoreClick = (videoId: number) => {
    if (selectedVideoId === videoId && showDeleteOption) {
      // If the same "more" button is clicked again, hide the delete option
      setShowDeleteOption(false)
      setSelectedVideoId(null)
    } else {
      setShowDeleteOption(true)
      setSelectedVideoId(videoId)
    }
  }

  const handleDeleteVideo = async () => {
    try {
      if (selectedVideoId !== null) {
        await axios.delete(
          `https://www.cofucan.tech/srce/api/video/${selectedVideoId}`,
        )
        // Fetch videos again after deletion
        fetchVideos()
        // Show Toastify message
        toast.success('Video has been deleted successfully!', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        })
      }
      setShowDeleteOption(false) // Hide the delete option after deletion
    } catch (error) {
      console.error('Error deleting video:', error)
      // Show Toastify error message
      toast.error('Error deleting video. Please try again later.', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <div>
      <div className="w-full min-h-full flex flex-col justify-between">
        <Navbar noNav={true} />
        <MainLayout>
          <div className="w-full px-0 sm:px-0 lg:px-0 py-0 flex flex-col xs:flex-col sm:flex-row items-center justify-between mb-5">
            <div className="w-full lg:w-auto flex flex-col">
              <div className="HelloJohnMark text-neutral-900 lg:text-[32px] font-bold font-['Sora'] md:text-[28px] sm:text-[24px] xs:text-[20px] hidden ss:block">
                Hello, {user}
              </div>
              <div className="HereAreYourRecordedVideos text-neutral-900 text-opacity-70 lg:text-[28px] font-bold font-['Sora'] md:text-[24px] sm:text-[20px] xs:text-[16x] font-normal font-['Work Sans'] hidden ss:block">
                Here are your recorded videos
              </div>
            </div>

            <div className="SearchBar w-[90vw] h-[30px] lg:w-[30rem] lg:h-[48px] md:w-[30rem] md:h-[48px] ss:w-[30rem] ss:h-[48px] xs:w-[90vw] xs:h-[30px] bg-stone-300 px-4 flex items-center justify-start border rounded-lg">
              <FiSearch size={15} color="#ccc" />
              <input
                type="text"
                className="w-full py-3 bg-transparent outline-none border-none px-3 text-[14px] text-white font-ppReg placeholder-white"
                placeholder="Search for a video"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div
            className="Timeline text-neutral-900 text-opacity-80 text-lg font-medium font-['Work Sans'] px-8 lg:px-20 py-0"
            style={{
              borderTop: '1px solid lightgray',
            }}
          >
            Recent files
          </div>
          {loading ? (
            <Spinner />
          ) : (
            /*   <div
              className="lg:overflow-y-scroll  ss:overflow-y-scroll xs:overflow-y-hidden sm:overflow-y-scroll lg:max-h-screen md:max-h-screen ss:max-h-screen sm:max-h-screen xs:h-full"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'start',
                margin: '0 auto',
                // overflowY: 'scroll',
                // maxHeight: '100%',
              }}
            > */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center lg:overflow-y-scroll  ss:overflow-y-scroll xs:overflow-y-hidden sm:overflow-y-scroll lg:max-h-screen md:max-h-screen ss:max-h-screen sm:max-h-screen xs:h-full">
              {filteredVideos.length === 0 ? (
                <div className="NoRecentVideosMessage text-xl text-neutral-900 font-medium">
                  No video found
                </div>
              ) : (
                filteredVideos.map((item, index) => (
                  <>
                    <div
                      className="WebCard px-1 pt-1 pb-1 bg-neutral-50 bg-opacity-50 rounded-3xl border border-gray-400 border-opacity-60 flex-col justify items-center gap-0 inline-flex lg:w-[557px] lg:h-[322px]  md:w-[557px] md:h-[322px]  sm:w-[557px] sm:h-[322px] ss:w-[557px] ss:h-[322px] xs:w-[320px] xs:h-[280px]"
                      style={{
                        margin: '10px',
                      }}
                    >
                      <div
                        className="VideoFrame  relative rounded-xl border border-gray-200"
                        style={{
                          margin: '0.5rem',
                          position: 'relative',
                        }}
                      >
                        <Link key={index} href={`/videos/${item?.id}`} passHref>
                          <Image
                            className="w-[525px] h-[220px] lg:w-[525px] lg:h-[220px] md:w-[525px] md:h-[220px] sm:w-[525px] sm:h-[220px] ss:w-[525px] ss:h-[220px] xs:w-[300px] xs:h-[170px] rounded-3xl bg-gray-300 "
                            width={525}
                            height={220}
                            src={item.src}
                            alt="thumbnail"
                            quality={100}
                          />
                        </Link>
                        <div className="VideoDuration px-4 py-1 absolute bottom-4 right-3 bg-gray-200 rounded justify-end items-end gap-2 inline-flex">
                          <div className="text-slate-950 text-sm font-medium font-['Work Sans']">
                            {item.duration
                              ? formatDuration(item.duration)
                              : 'Loading...'}
                          </div>
                        </div>
                      </div>
                      <div className="Details self-stretch justify-between items-start inline-flex">
                        <div className="TitleDate grow shrink basis-0 flex-col justify-center items-start gap-0 inline-flex px-4">
                          <div
                            className="Title text-neutral-900 text-xl font-medium font-['Work Sans'] capitalize"
                            style={{ fontSize: '1rem' }}
                          >
                            {item.name}
                          </div>
                          <div className="Date text-gray-400 text-base font-normal font-['Work Sans'] uppercase">
                            {item?.created_date}
                          </div>
                        </div>
                        <div className="Icons justify-start items-start gap-6 flex">
                          <Image
                            src="/assets/video-repo/link.png"
                            alt="stuff"
                            width={20}
                            height={20}
                          />
                          <div style={{ position: 'relative' }}>
                            <Image
                              className="cursor-pointer"
                              src="/assets/video-repo/more.png"
                              alt="stuff"
                              width={20}
                              height={20}
                              onClick={() => handleMoreClick(item.id)}
                            />
                            {showDeleteOption &&
                              selectedVideoId === item.id && (
                                <div className="DeleteOption">
                                  <button
                                    onClick={handleDeleteVideo}
                                    className="DeleteButton text-xl font-medium font-['Work Sans'] capitalize"
                                    style={{
                                      position: 'absolute',
                                      top: '22px',
                                      right: '12px',
                                      backgroundColor: 'white', // Background color red
                                      color: 'red', // Text color white
                                      padding: '2px 12px', // Padding for the button
                                      borderRadius: '8px', // Border radius for rounded corners
                                      boxShadow:
                                        '0px 4px 10px rgba(0, 0, 0, 0.7)', // Shadow effect
                                    }}
                                  >
                                    Delete
                                  </button>
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))
              )}
            </div>
          )}
        </MainLayout>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        style={{
          width: 'fit-content',
          textAlign: 'center',
        }}
      />
    </div>
  )
}

export default Videos
