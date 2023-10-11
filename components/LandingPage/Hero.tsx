import Image from 'next/image'

const Hero = () => {
  return (
    <div
      className="h-auto md:h-[677px] container font-Sora md:justify-between 
     flex flex-col md:my-0 py-40 md:flex-row items-center justify-center  gap-20 md:gap-16"
    >
      <div className="sm:w-auto sm:[448px] lg:w-[548px] flex justify-start">
        <div className="sm:[448px] lg:w-[548px] h-auto">
          <h1 className="md:text-h2 text-[40px] text-center md:text-left text-black-600 leading-[100%] font-[700] mb-[20px]">
            Show Them Don’t Just Tell
          </h1>
          <p className="text-black-100 text-[20px] text-center md:text-left font-Inter mb-[48px]">
            Help your friends and loved ones by creating and sending videos on
            how to get things done on a website.
          </p>
          <div className="w-full flex justify-center md:justify-start">
            <a
              href="https://drive.google.com/file/d/1t2mgIO4mYdZwI2Ex41Sqz-iWuWUPKUnc/view?usp=drive_link"
              className="px-[24px] py-[22px] bg-primary-600 rounded-[8px] flex items-center gap-[10px] text-pastel-bg text-[18px]"
            >
              <p>Install HelpMeOut</p>
              <Image
                src="/assets/home/arrow-right.svg"
                alt="arrow-right"
                width={20}
                height={20}
              />
            </a>
          </div>
        </div>
      </div>
      <div className="w-full h-auto flex flex-row gap-3 md:gap-[20px] md:px-[40px] relative">
        <div className="hidden md:flex">
          <Image
            src="/assets/home/grey-grid.svg"
            alt=""
            className="absolute right-[5px] z-[1] top-[-44px]"
            width={250}
            height={250}
          />
          <Image
            src="/assets/home/blue-grid.svg"
            alt=""
            className="absolute left-[16px] z-[1] bottom-[-66px]"
            width={250}
            height={250}
          />
        </div>
        <div className="flex flex-col gap-2 md:gap-0  justify-between z-[2]">
          <Image
            src="/assets/home/hero (2).png"
            alt="Woman"
            className="rounded-[8px]"
            width={1000}
            height={1000}
          />
          <Image
            src="/assets/home/hero (3).png"
            alt="man"
            className="rounded-[8px]"
            width={1000}
            height={1000}
          />
        </div>
        <div className="z-[2] ">
          <Image
            src="/assets/home/hero (1).png"
            alt="woman-using-smartphone"
            className="rounded-[8px]"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
