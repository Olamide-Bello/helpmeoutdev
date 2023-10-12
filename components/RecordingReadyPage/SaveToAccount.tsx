import Link from 'next/link'
import React from 'react'

const SaveToAccount: React.FC = () => {
  return (
    <div className="w-full h-auto py-[48px] flex flex-col justify-center items-center gap-[40px] my-[64px]">
      <h3 className="font-Sora font-[600] text-[16px] ss:text-[24px] text-black-600 ss:w-[653px] text-center">
        To ensure the availability and privacy of your video, we recommend
        saving it to your account.
      </h3>
      <button className="font-Work-Sans text-[16px] font-[500px] text-white bg-primary-600 px-[32px] py-[16px] rounded-[8px]">
        Save Video
      </button>
      <h2 className="font-Sora text-[16px] ss:text-[24px] font-[400] text-gray-400 text-center">
        Don’t have an account?{' '}
        <Link href={'/signUp'} className="text-primary-600 font-[400]">Create account</Link>
      </h2>
    </div>
  )
}

export default SaveToAccount
