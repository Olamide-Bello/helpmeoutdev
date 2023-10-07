import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '@/components/shared/Navbar'
import Link from 'next/link'
import MainLayout from '@/components/shared/MainLayout'
import Image from 'next/image'
import VideoPlayer from '@/components/SingleViewPage/VideoPlayer'
import { Input } from '../../components/SingleViewPage/Input'
import { Share } from '../../components/SingleViewPage/share'
import Transcript from '../../components/SingleViewPage/transcript'
import Demo from '@/components/SingleViewPage/Demo'



// a place array for the transcript component
const ts = [
    {
        time: 0.01,
        msg: `First step. Open Facebook on your desktop or mobile device and
        locate "Marketplace" in the left-hand menu or at the top of the
        . Open Facebook on your desktop or mobile device and locate
        "Marketplace" in the left-ha`
    },
    {
        time: 0.15,
        msg: `First step. Open Facebook on your desktop or mobile device and
        locate "Marketplace" in the left-hand menu or at the top of the
        . Open Facebook on your desktop or mobile device and locate
        "Marketplace" in the left-ha`
    }
]
const Single = () => {
    const params = useRouter()
    const [email, setEmail] = useState<string>("") // email to send the video link to
    const [errMsg, setErrMsg] = useState<boolean>(false) // email validation state
    const [videoName, setVideoName] = useState<string>("") // name of the video
    const [copied, setCopied] = useState<boolean>(false)
    const [url, setUrl] = useState<string>("") // url of the video
    const { id } = params.query // id for fetching the video from backend
    console.log(id)

    //function to copy url to the clipboard
    const copy = (e: string) => {
        setCopied(true);
        navigator.clipboard.writeText(e);
        setTimeout(() => {
            //allow the user to be able to copy link again after 3 seconds 
            setCopied(false);
        }, 3000);
        console.log(e);
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

    return (
        <div>
            <Navbar />
            <MainLayout>
                <div className='text-gray-300 mb-3 mt-2'>
                    <Link href='/'><span className='text-lg font-normal font-Work-Sans '>Home</span></Link>&nbsp;/&nbsp;
                    <Link href='/videos'><span className='text-lg font-normal font-Work-Sans'>Recent Videos</span></Link>&nbsp;/&nbsp;
                    <span className='text-primary-400'>{videoName}</span>
                </div>
                <h3 className="flex font-2xl font-[600] text-lg text-black font-Sora gap-2 items-center mb-5">
                    {videoName || "How To Create A Facebook Ad Listing  "}
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
                {url?<VideoPlayer url={url} />: <Demo/>}
                <div>
                    <div className="flex flex-col gap-6 w-full my-10">
                        <div className="flex md:flex-row flex-col bg-opacity-40 justify-between items-center md:gap-20 gap-5">
                            <Input
                                bg="bg-opacity-50 bg-purple-300 h-[60px] w-full md:w-1/2"
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
                                onClick={() => copy(url)}
                                icon={<Image alt='copy' src="/assets/video-repo/copy.svg" width={20} height={20} />}
                            />
                        </div>
                        {errMsg && <p className='text-red-500'>Email is not valid!</p>}
                    </div>
                </div>
                {/* share the video on social media */}
                <Share text={url} />
                {/* video transcript*/}
                <Transcript data={ts} />
            </MainLayout>
        </div>
    )
}

export default Single