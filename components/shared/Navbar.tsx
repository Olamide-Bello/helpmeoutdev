import react, { useContext, useState } from 'react'
import Image from "next/image";
import MainLayout from "./MainLayout";
import Link from 'next/link';
import { GlobalContext } from '@/context/GlobalContext';
import { auth } from '../Auth/firebase'
import { signOut } from 'firebase/auth';

const Navbar: React.FC<{ noNav?: boolean }> = ({ noNav }) => {
  const { logged, user, setLogged, setUser } = useContext(GlobalContext)
  const [showLogout, setShowLogout] = useState<boolean>(false)

  //function that toggles the show logout state
  const handleShowLogout = () => {
    setShowLogout(!showLogout)
  }

  const handleLogout = () => {
    //call or put the logic for log out here
    signOut(auth)
    setLogged(false)
    setShowLogout(false)
    setUser(null)
  }
  return (
    <MainLayout>
      <div className=" text-primary-600 h-[84px] flex justify-between items-center">
        {/* Logo container */}
        <Link href='/' className="flex gap-1 items-center">
          <Image
            src="/assets/shared/logo.svg"
            alt="Logo"
            width={40}
            height={40}
          />
          <h1 className=" text-h6 font-[700] font-Inter">HelpMeOut</h1>
        </Link>
        {/* Navbar links */}
        {
          !noNav &&
          <div className="hidden text-h6 font-Work-Sans font-[500] md:flex items-center gap-[39px]">
            <Link href="#features"><h1>Features</h1></Link>
            <Link href="#how"><h1>How It Works</h1></Link>
          </div>
        }
        {/* Get Started */}
        {
          (logged === true && user?.displayName) ?
            <div className='flex items-center gap-[10px] relative font-Work-Sans font-[400]'>
              <Image
                src="/assets/shared/profile.svg"
                alt='profile'
                height={40}
                width={40}
              />
              <div onClick={handleShowLogout} className='flex gap-[10px] cursor-pointer'>
                <p>{user?.displayName}</p>
                <Image
                  src="/assets/video-repo/arrow-down.svg"
                  height={20}
                  width={20}
                  className={`${showLogout && "-rotate-90"}`}
                  alt='arrow-down'
                />
              </div>
              {logged && showLogout && <div onClick={handleLogout} className='absolute bottom-[-40px] cursor-pointer text-[#141414] font-Work-Sans font-[500] right-0 py-2 px-5 bg-white shadow'>Log Out</div>}
            </div>
            :
            <Link href='/logIn' className="text-h6 font-Work-Sans font-[500]">Get Started</Link>
        }
      </div>
    </MainLayout>
  );
};

export default Navbar;
