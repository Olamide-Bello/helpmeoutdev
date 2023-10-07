import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '@/components/shared/Navbar'
import Link from 'next/link'
import MainLayout from '@/components/shared/MainLayout'
import Image from 'next/image'
import VideoPlayer from '@/components/video-repo/VideoPlayer'
import { Input } from '../../components/video-repo/Input'
import { Share } from '../../components/video-repo/share'
import Transcript from '../../components/video-repo/transcript'

const ts = [
    {
        time: 1,
        msg: "Hey, testing"
    }
]
const Single = () => {
    const params = useRouter()
    const [email, setEmail] = useState<string>("")
    const [errMsg, setErrMsg] = useState<boolean>(false)
    const [videoName, setVideoName] = useState<string>("")
    const [copied, setCopied] = useState<boolean>(false)
    const [url, setUrl] = useState<string>("https://www.youtube.com/embed/GoWGGiWDsac?si=SeX_lzGuqyjKaP9-")
    const { id } = params.query
    console.log(id)

    const copy = (e: string) => {
        setCopied(true);
        navigator.clipboard.writeText(e);
        setTimeout(() => {
            setCopied(false);
        }, 3000);
        console.log(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setEmail(value)
        if (!email) {
            setErrMsg(false)
        }
    }

    const isEmailValid = (mail: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(mail)
    }

    const sendEmail = () => {
        const valid = isEmailValid(email)
        if (!valid) {
            setErrMsg(true)
        } else {
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
                <VideoPlayer url={url} />
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
                <Share text={url} />
                <Transcript data={ts} />
            </MainLayout>
        </div>
    )
}

export default Single