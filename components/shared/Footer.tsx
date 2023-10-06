import { footerLinks } from "@/data";
import Image from 'next/image';

const Footer:React.FC = () => {
  return (
    <div className="md:h-[347px] py-[98px] px-4 md:px-0 w-full bg-primary-600">
      <div className="xl:w-[1440px] mx-auto w-full md:px-[100px]  gap-8 md:gap-0 flex flex-col md:flex-row justify-between items-start">
        <div className="flex gap-1 items-center">
          <Image src="/assets/shared/white-logo.svg" alt="Logo" width={40} height={40}/>
          <h1 className=" text-h6 font-[700] font-Inter text-white">
            HelpMeOut
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-[60px] md:gap-[220px] ">
          {footerLinks.map((item) => {
            return (
              <div key={item.header} className="text-white text-[16px] ">
                <h2 className="font-Sora font-[600] mb-[26px]">
                  {item.header}
                </h2>
                <div className="font-Work-Sans flex flex-col gap-[12px] md:gap-[24px]">
                  <h4>{item.link1}</h4>
                  <h4>{item.link2}</h4>
                  <h4>{item.link3}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;
