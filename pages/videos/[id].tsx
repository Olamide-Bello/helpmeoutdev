import React, { useState, useEffect, useContext, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/shared/Navbar';
import Link from 'next/link';
import MainLayout from '@/components/shared/MainLayout';
import Image from 'next/image';
import VideoPlayer from '@/components/SingleViewPage/VideoPlayer';
import { Input } from '../../components/SingleViewPage/Input';
import { Share } from '../../components/SingleViewPage/share';
import Transcript from '../../components/SingleViewPage/transcript';
import Demo from '@/components/SingleViewPage/Demo';
import { GlobalContext } from '../../context/GlobalContext';
import axios from 'axios';


interface TranscriptWord {
    start: number;
    end: number;
    punctuated_word: string;
  }
  
  const Single: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const { user } = useContext(GlobalContext);
    const displayName: string = user?.displayName || 'user13';
    const TranscriptId: string = '5z7aWVvi8lE1SFh';
  
    const [email, setEmail] = useState<string>('');
    const [errMsg, setErrMsg] = useState<boolean>(false);
    const [videoName, setVideoName] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);
    const [url, setUrl] = useState<string>('');
    const [transcript, setTranscript] = useState<{ time: number; msg: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

  const convertToUrlTranscript = (transcriptData: TranscriptWord[]) => {
    const urlTranscript: { time: number; msg: string }[] = [];
    let currentTime = 0;
    let message = '';

    transcriptData.forEach((word, index) => {
      const startTime = word.start;
      const endTime = word.end;
      const wordText = word.punctuated_word;

      if (startTime > currentTime) {
        if (message !== '') {
          urlTranscript.push({ time: parseFloat(currentTime.toFixed(2)), msg: message.trim() });
        }
        message = '';
        currentTime = endTime;
      }

      message += `${wordText} `;

      for (let i = 1; i <= 10 && index + i < transcriptData.length; i++) {
        message += `${transcriptData[index + i].punctuated_word} `;
      }

      currentTime = endTime;
    });

    if (message !== '') {
      urlTranscript.push({ time: parseFloat(currentTime.toFixed(2)), msg: message.trim() });
    }

    return urlTranscript;
  };

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(`https://www.cofucan.tech/srce/api/recording/${id}`);
        const data = response.data;
        const videoUrl = `https://www.cofucan.tech/srce/api/video/${id}.mp4`;

        setVideoName(data.title);
        setUrl(videoUrl);

        const transcriptResponse = await fetch(`https://www.cofucan.tech/srce/api/transcript/${id}.json`);
        const transcriptData: TranscriptWord[] = await transcriptResponse.json();
        const convertedTranscript = convertToUrlTranscript(transcriptData);
        setTranscript(convertedTranscript);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching video data:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchVideoData();
    }
  }, [id]);

  const copyToClipboard = (text: string) => {
    setCopied(true);
    navigator.clipboard.writeText(text);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

    //function to handle email change
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setEmail(value);
        if (!email) {
          setErrMsg(false);
        }
      };

    //function to validate the entered email
    const isEmailValid = (mail: string): boolean => {
        const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(mail);
      };

    // function to send the video url to the entered email
    const sendEmail = (): void => {
        // Validate the email before taking action
        const valid: boolean = isEmailValid(email);
        if (!valid) {
          setErrMsg(true);
        } else {
          // Send the URL here
          console.log(email);
        }
      };
    /*  */

    return (
        <div>
            <Navbar noNav={true} />
            <MainLayout>
                <div className='text-gray-200 mb-3 mt-2'>
                    <Link href='/'><span className='text-gray-200  text-lg font-normal font-Work-Sans '>Home</span></Link>&nbsp;/&nbsp;
                    <Link href='/videos'><span className='text-gray-200  text-lg font-normal font-Work-Sans'>Recent Videos</span></Link>&nbsp;/&nbsp;
                    <span className='text-primary-400 font-[500]'>{videoName}</span>
                </div>
                <h3 className="flex font-2xl font-[600] text-lg text-black font-Sora gap-2 items-center mb-5">
                    {videoName}
                    <span>
                        <Image
                            src="/assets/video-repo/edit.svg"
                            alt="Logo"
                            width={20}
                            height={20}
                        />
                    </span>
                </h3>
                {/* video player component*/}
                {url ? <VideoPlayer url={url} /> : <Demo />}
                <div>
                    <div className="flex flex-col gap-6 w-full my-10">
                        <div className="flex md:flex-row flex-col bg-opacity-40 justify-between items-center md:gap-20 gap-5">
                            <Input
                                bg="bg-opacity-50 bg-[#b6b3c680] h-[60px] w-full md:w-1/2"
                                btStyles="bg-primary-200 text-white rounded-lg"
                                text="Send"
                                placeholder="Enter the email of the reciever"
                                onChange={(e) => handleChange(e)}
                                onClick={sendEmail}
                            />
                            <Input
                                bg="border-[1px] border-black bg-gray-100 h-[60px] w-full md:w-1/2"
                                btStyles="rounded-lg  border-[1px] border-black bg-white text-indigo-900"
                                text={copied ? "Copied!!!" : "Copy URL"}
                                value={url}
                                onClick={() => copyToClipboard(url)}
                                icon={<Image alt='copy' src="/assets/video-repo/copy.svg" width={20} height={20} />}
                            />
                        </div>
                        {errMsg && <p className='text-red-500'>Email is not valid!</p>}
                    </div>
                </div>
                {/* share the video on social media */}
                <Share text={url} />
                {/* video transcript*/}
                <Transcript data={transcript} />
            </MainLayout>
        </div>
    )
}

export default Single