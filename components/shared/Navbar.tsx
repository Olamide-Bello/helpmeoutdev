import Image from "next/image";
import MainLayout from "./MainLayout";

const Navbar: React.FC = () => {
  return (
    <MainLayout>
      <div className=" text-primary-600 h-[84px] flex justify-between items-center">
        {/* Logo container */}
        <div className="flex gap-1 items-center">
          <Image
            src="/assets/shared/logo.svg"
            alt="Logo"
            width={40}
            height={40}
          />
          <h1 className=" text-h6 font-[700] font-Inter">HelpMeOut</h1>
        </div>
        {/* Navbar links */}
        <div className="hidden text-h6 font-Work-Sans font-[500] md:flex items-center gap-[39px]">
          <h1>Features</h1>
          <h1>How It Works</h1>
        </div>
        {/* Get Started */}
        <div className="text-h6 font-Work-Sans font-[500]">Get Started</div>
      </div>
    </MainLayout>
  );
};

export default Navbar;
