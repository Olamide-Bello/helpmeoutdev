import React, { useState, useEffect, useContext } from 'react';
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

const Single = () => {

    const router = useRouter();
    const { id } = router.query;
    const { user } = useContext(GlobalContext);
    const displayName = user?.displayName || 'user13';
    const TranscriptId = '5z7aWVvi8lE1SFh'

    const [email, setEmail] = useState('');
    const [errMsg, setErrMsg] = useState(false);
    const [videoName, setVideoName] = useState('');
    const [copied, setCopied] = useState(false);
    const [url, setUrl] = useState('');
    const [transcript, setTranscript] = useState<{ time: number; msg: string; }[]>([]);
    const [loading, setLoading] = useState(true);


    const convertToUrlTranscript = (transcriptData: TranscriptWord[]): { time: number; msg: string }[] => {
        const urlTranscript = [];
        let currentTime = 0;
        let message = '';



        transcriptData.forEach((word, index) => {
            const startTime = word.start;
            const endTime = word.end;
            const wordText = word.punctuated_word;

            if (startTime > currentTime) {
                // If there is a message, add it to urlTranscript
                if (message !== '') {
                    urlTranscript.push({ time: parseFloat(currentTime.toFixed(2)), msg: message.trim() });
                }
                // Reset message and update current time
                message = '';
                currentTime = endTime;
            }

            // Add the current word to the message
            message += `${wordText} `;

            // Add the next 10 words to the message
            for (let i = 1; i <= 10 && index + i < transcriptData.length; i++) {
                message += `${transcriptData[index + i].punctuated_word} `;
            }

            currentTime = endTime;
        });

        // Push the remaining message to urlTranscript
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

                // Fetch transcript data if required
                const transcriptResponse = await fetch(`https://www.cofucan.tech/srce/api/transcript/${id}.json`);
                const transcriptData = await transcriptResponse.json();
                const convertedTranscript = convertToUrlTranscript(transcriptData.words);
                //const [transcript, setTranscript] = useState<{ time: number; msg: string; }[]>([]);

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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setEmail(value)
        if (!email) {
            // to clear the error message when the input field has been cleared
            setErrMsg(false)
        }
    }

    //function to validate the entered email
    const isEmailValid = (mail: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(mail)
    }

    // function to send the video url to the entered email
    const sendEmail = () => {
        //validate the email before taking action
        const valid = isEmailValid(email)
        if (!valid) {
            setErrMsg(true)
        } else {
            //send the url here
            console.log(email)
        }
    }
    /*  */
    const changeName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { value } = e.target
        setVideoName(value)
    }

    return (
        <div>
            <Navbar noNav={true} />
            <MainLayout>
                <div className='text-gray-200 mb-3 mt-2'>
                    <Link href='/'><span className='text-gray-200  text-lg font-normal font-Work-Sans '>Home</span></Link>&nbsp;/&nbsp;
                    <Link href='/videos'><span className='text-gray-200  text-lg font-normal font-Work-Sans'>Recent Videos</span></Link>&nbsp;/&nbsp;
                    <span className='text-primary-400 font-[500]'>{videoName}</span>
                </div>
                <div className="flex font-2xl font-[600] text-lg text-black font-Sora  items-center mb-5">
                    <input type="text" value={videoName} onChange={changeName}
                        className="border-none outline-none rounded-md p-2 mb-2 w-auto text-[13px] xs:text-[16px] ss:text-[24px] text-primary-400 font-[600]"
                    />
                    <Image
                        src="/assets/video-repo/edit.svg"
                        alt="Logo"
                        width={20}
                        height={20}
                    />

                </div>
                {/* video player component*/}
                {url ? <VideoPlayer url={url} /> : <Demo />}
                {/* video transcript*/}
                <Transcript data={transcript} />
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
                                readOnly= {false}
                            />
                            <Input
                                bg="border-[1px] border-black bg-gray-100 h-[60px] w-full md:w-1/2"
                                btStyles="rounded-lg  border-[1px] border-black bg-white text-indigo-900"
                                text={copied ? "Copied!!!" : "Copy URL"}
                                value={url}
                                onClick={() => copyToClipboard(url)}
                                readOnly={true}
                                icon={<Image alt='copy' src="/assets/video-repo/copy.svg" width={20} height={20} />}
                            />
                        </div>
                        {errMsg && <p className='text-red-500'>Email is not valid!</p>}
                    </div>
                </div>
                {/* share the video on social media */}
                <Share text={url} />
            </MainLayout>
        </div>
    )
}

export default Single