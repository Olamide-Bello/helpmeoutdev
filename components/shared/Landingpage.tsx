import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Hero from '../../public/assets/home/hero-img.png'
import Icon1 from '../../public/assets/home/feature-icon1.svg'
import Icon2 from '../../public/assets/home/feature-icon2.svg'
import Icon3 from '../../public/assets/home/feature-icon3.svg'
import Repo from '../../public/assets/home/video-repo.png'
import Card from '../../public/assets/home/card-img.png'
import Arrow from '../../public/assets/home/arrow-right.svg'



const Landingpage = () => {
  return (
    <>
      <div className="  lg:flex px-[20px] md:px[50px] lg:px-[70px] xl:px-[100px] min-h-[80vh] items-center">
        <div className=" w-full lg:w-1/2 pt-10">
          <h1 className=" font-sora font-bold text-[32px] lg:text-[45px] xl:text-[65px]">
            Show Them <br /> Don’t Just Tell
          </h1>
          <p className=" font-inter font-normal text-base mt-6 w-full xl:w-[80%]">
            Help your friends and loved ones by creating and sending videos on
            how to get things done on a website.
          </p>

          <Link href="/">
            <button className=" bg-[#120B48] py-5 px-6 flex text-white rounded-lg gap-2 mt-10">
              <p>Install HelpMeOut</p>
              <Image src={Arrow} width={24} height={24} alt=" right Arrow" />
            </button>
          </Link>
        </div>
        <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
          <Image src={Hero} width={700} height={600} alt="Hero Image" />
        </div>
      </div>

      <div id='features' className=" bg-slate-200 py-12">
        <div className=" bg-white min-h-[80%] ">
          <div className=" py-16">
            <h3 className=" font-sora font-bold text-[40px] text-center">
              Features
            </h3>
            <p className=" font-workSans text-center">
              Key Highlights of Our Extension
            </p>
          </div>

          <div className=" md:flex items-center gap-5 px-[20px] md:px[50px] lg:px-[70px] xl:px-[100px] pb-16">
            <div className=" flex flex-col gap-8 w-full md:w-1/2">
              <div className=" flex gap-6">
                <Image
                  className="flex-1 h-12 w-12"
                  src={Icon1}
                  width={12}
                  height={12}
                  alt="image"
                />

                <div>
                  <p className=" font-inter font-semibold pb-2">
                    Simple Screen Recording
                  </p>
                  <p className=" font-workSans">
                    Effortless screen recording for everyone. Record with ease,
                    no tech expertise required.
                  </p>
                </div>
              </div>

              <div className=" flex gap-6">
                <Image
                  className=" flex-1 h-12 w-12"
                  src={Icon2}
                  width={12}
                  height={12}
                  alt="image"
                />
                <div>
                  <p className=" font-inter font-semibold pb-2">
                    Easy-to-Share URL
                  </p>
                  <p className=" font-workSans">
                    Share your recordings instantly with a single link. No
                    attachments, no downloads.
                  </p>
                </div>
              </div>

              <div className=" flex gap-6">
                <Image
                  className=" flex-1 h-12 w-12"
                  src={Icon3}
                  width={20}
                  height={10}
                  alt="image"
                />
                <div>
                  <p className=" font-inter font-semibold pb-2">
                    Revisit Recordings
                  </p>
                  <p className=" font-workSans">
                    Access and review your past content effortlessly. Your
                    recordings, always at your fingertips.
                  </p>
                </div>
              </div>
            </div>

            <div className=" flex items-center w-full md:w-1/2 mt-12 lg:mt-0">
              <Image
                className=" w-full"
                src={Repo}
                width={500}
                height={200}
                alt="image"
              />
            </div>
          </div>
        </div>
      </div>

      <div id='how' className="px-[20px] md:px[50px] lg:px-[70px] xl:px-[100px] pb-20">
        <h3 className=" font-sora font-bold text-[40px] text-center pt-16 pb-8">
          How it Works
        </h3>

        <div className=" flex flex-col md:flex-row gap-7 justify-between items-center">
          <div className=" w-full md:w-[358px]">
            <div className=" bg-[#120B48] w-12 h-12 rounded-[50%] grid place-content-center mx-auto">
              <p className="  text-white  font-bold text-3xl">1</p>
            </div>
            <p className=" text-center font-inter font-semibold text-2xl py-6">
              Record Screen
            </p>
            <p className=" text-center leading-8 text-[#616163]">
              Click the &quot;Start Recording&quot; button in our extension.
              choose which part of your screen to capture and who you want to
              send it to.
            </p>
            <Image
              className=" pt-6"
              src={Card}
              width={500}
              height={200}
              alt="image"
            />
          </div>

          <div className="w-full md:w-[358px]">
            <div className=" bg-[#120B48] w-12 h-12 rounded-[50%] grid place-content-center mx-auto">
              <p className="  text-white  font-bold text-3xl">2</p>
            </div>
            <p className=" text-center font-inter font-semibold text-2xl py-6">
              Share Your Recording
            </p>
            <p className=" text-center leading-8 text-[#616163]">
              We generate a shareable link for your video. Simply send it to
              your audience via email or copy the link to send via any platform.
            </p>
            <Image
              className=" pt-6"
              src={Card}
              width={500}
              height={200}
              alt="image"
            />
          </div>

          <div className=" w-full md:w-[358px]">
            <div className=" bg-[#120B48] w-12 h-12 rounded-[50%] grid place-content-center mx-auto">
              <p className="  text-white  font-bold text-3xl">3</p>
            </div>
            <p className=" text-center font-inter font-semibold text-2xl py-6">
              Learn Effortlessly
            </p>
            <p className=" text-center leading-8 text-[#616163]">
              Recipients can access your video effortlessly through the provided
              link, with our user-friendly interface suitable for everyone.
            </p>
            <Image
              className=" pt-6"
              src={Card}
              width={500}
              height={200}
              alt="image"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Landingpage