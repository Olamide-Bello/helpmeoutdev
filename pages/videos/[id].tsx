import React, { useState, useEffect, useContext, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import Navbar from '@/components/shared/Navbar'
import Link from 'next/link'
import Image from 'next/image'
import VideoPlayer from '@/components/SingleViewPage/VideoPlayer'
import { Input } from '../../components/SingleViewPage/Input'
import { Share } from '../../components/SingleViewPage/share'
import Transcript from '../../components/SingleViewPage/transcript'
import Demo from '@/components/SingleViewPage/Demo'
import { GlobalContext } from '../../context/GlobalContext'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MainLayout from '@/components/shared/MainLayout'
import Modal from '@/components/RecordingReadyPage/Modal'

interface TranscriptWord {
  start: number
  end: number
  punctuated_word: string
}

const Single = () => {
  const router = useRouter()
  const { id } = router.query
  const { user, sendEmail } = useContext(GlobalContext)
  const TranscriptId = '5z7aWVvi8lE1SFh'

  const [email, setEmail] = useState<string>('')
  const [errMsg, setErrMsg] = useState<boolean>(false)
  const [videoName, setVideoName] = useState<string>('')
  const [newName, setNewName] = useState<string>('')
  const [copied, setCopied] = useState<boolean>(false)
  const [url, setUrl] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [transcript, setTranscript] = useState<{ time: number; msg: string }[]>(
    [],
  )
  const [loading, setLoading] = useState<boolean>(true)
  const [isTyping, setIsTyping] = useState(false)

  const convertToUrlTranscript = (
    transcriptData: TranscriptWord[],
  ): { time: number; msg: string }[] => {
    const urlTranscript = []
    let currentTime = 0
    let message = ''

    transcriptData.forEach((word, index) => {
      const startTime = word.start
      const endTime = word.end
      const wordText = word.punctuated_word

      if (startTime > currentTime) {
        // If there is a message, add it to urlTranscript
        if (message !== '') {
          urlTranscript.push({
            time: parseFloat(currentTime.toFixed(2)),
            msg: message.trim(),
          })
        }
        // Reset message and update current time
        message = ''
        currentTime = endTime
      }

      // Add the current word to the message
      message += `${wordText} `

      // Add the next 10 words to the message
      for (let i = 1; i <= 10 && index + i < transcriptData.length; i++) {
        message += `${transcriptData[index + i].punctuated_word} `
      }

      currentTime = endTime
    })

    // Push the remaining message to urlTranscript
    if (message !== '') {
      urlTranscript.push({
        time: parseFloat(currentTime.toFixed(2)),
        msg: message.trim(),
      })
    }

    return urlTranscript
  }

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(
          `https://api.helpmeout.tech/recording/${id}`,
        )
        const data = response.data
        const videoUrl = `https://api.helpmeout.tech/stream/${id}`

        setVideoName(data.title)
        setUrl(videoUrl)

        // Fetch transcript data if required
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        myHeaders.append('Access-Control-Allow-Origin', '*')
        const requestOptions: RequestInit = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
          mode: 'cors',
        }
        const transcriptResponse = await fetch(
          `https://api.helpmeout.tech/transcript/${id}`,
          requestOptions,
        )
        const transcriptData = await transcriptResponse.json()
        const convertedTranscript = convertToUrlTranscript(transcriptData.words)
        //const [transcript, setTranscript] = useState<{ time: number; msg: string; }[]>([]);

        setTranscript(convertedTranscript)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching video data:', error)
        setLoading(false)
      }
    }

    if (id) {
      fetchVideoData()
    }
  }, [id])

  const copyToClipboard = (text: string) => {
    setCopied(true)
    navigator.clipboard.writeText(text)
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }
  //function to handle email change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmail(value)
    if (!email) {
      // to clear the error message when the input field has been cleared
      setErrMsg(false)
    }
  }

  const handleMail = () => {
    if (typeof id === 'string') {
      sendEmail(email, id)
      setShowModal(true)
    }
  }
  const updateName = async () => {
    try {
      const response = await fetch(
        `https://api.helpmeout.tech/video/${id}?title=${newName}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Vary: 'Origin',
          },
          mode: 'cors',
        },
      )

      if (response.status === 200) {
        toast.success('Name change successful!', {
          style: {
            background: 'white', // Change the background color as needed
            color: 'green', // Change the text color as needed
            borderRadius: '8px', // Rounded corners for the toast
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add a subtle box shadow
            padding: '12px 24px', // Adjust padding as needed
            fontSize: '16px', // Adjust font size as needed
            textAlign: 'center',
          },
        })
        window.location.reload()
      }
    } catch (err) {}
  }
  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value)
    setIsTyping(true)
  }

  // Define state for current time
  const [currentTime, setCurrentTime] = useState(0)
  const [currentVidDuration, setCurrentVidDuration] = useState(0)

  return (
    <div>
      <Navbar noNav={true} />
      <MainLayout>
        <div className="text-gray-200 mb-3 mt-2">
          <Link href="/">
            <span className="text-gray-200  text-lg font-normal font-Work-Sans ">
              Home
            </span>
          </Link>
          &nbsp;/&nbsp;
          <Link href="/videos">
            <span className="text-gray-200  text-lg font-normal font-Work-Sans">
              Recent Videos
            </span>
          </Link>
          &nbsp;/&nbsp;
          <span className="text-primary-400 font-[500]">{videoName}</span>
        </div>
        <div
          className={`flex font-2xl font-[600] text-lg text-black font-Sora  items-center mb-5 `}
        >
          <input
            type="text"
            value={newName}
            placeholder={videoName}
            onChange={changeName}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                updateName()
              }
            }}
            className={`border p-2 mb-2 w-auto text-[13px] xs:text-[16px] ss:text-[24px] text-primary-400 font-[600] rounded-md outline-none focus:border-primary-600 h-[36px] mr-5`}
          />
          <Image
            className={`cursor-pointer ${
              isTyping ? 'dark' : ''
            } transform hover:scale-110`}
            onClick={updateName}
            src="/assets/video-repo/edit.svg"
            alt="Logo"
            width={32}
            height={32}
          />
        </div>
        {/* video player component*/}
        {url ? (
          <VideoPlayer
            url={url}
            videoID={id}
            setCurrentVideoTime={setCurrentTime}
            setCurrentVidDuration={setCurrentVidDuration}
          />
        ) : (
          <Demo />
        )}
        {/* video transcript*/}
        <Transcript
          data={transcript}
          videoID={id}
          currentVideoTime={currentTime}
          currentVidDuration={currentVidDuration}
        />
        <div>
          <div className="flex flex-col gap-6 w-full my-10">
            <div className="flex md:flex-row flex-col bg-opacity-40 justify-between items-center md:gap-20 gap-5">
              <Input
                bg="bg-opacity-50 bg-[#b6b3c680] h-[60px] w-full md:w-1/2"
                btStyles="bg-primary-200 text-white rounded-lg"
                text="Send"
                placeholder="Enter the email of the reciever"
                onChange={(e) => handleChange(e)}
                onClick={handleMail}
                readOnly={false}
              />
              <Input
                bg="border-[1px] border-black bg-gray-100 h-[60px] w-full md:w-1/2"
                btStyles="rounded-lg  border-[1px] border-black bg-white text-indigo-900"
                text={copied ? 'Copied!!!' : 'Copy URL'}
                value={url}
                onClick={() => copyToClipboard(url)}
                readOnly={true}
                icon={
                  <Image
                    alt="copy"
                    src="/assets/video-repo/copy.svg"
                    width={20}
                    height={20}
                  />
                }
              />
            </div>
            {errMsg && <p className="text-red-500">Email is not valid!</p>}
          </div>
        </div>
        {/* share the video on social media */}
        <Share text={url} />
      </MainLayout>
      <ToastContainer
        position="top-center" // Position the toast container at the bottom-center
        autoClose={1500} // Close after 3 seconds (adjust as needed)
        style={{
          width: 'fit-content', // Adjust the width as needed
          textAlign: 'center', // Center-align the container's content
        }}
      />
      {showModal && (
        <Modal setShowModal={setShowModal} email={email} videoID={id} />
      )}
    </div>
  )
}

export default Single
