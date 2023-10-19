import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-toastify'

const EditUsername = () => {
  const [newUsername, setNewUsername] = useState<string>('')
  const [oldUsername, setOldUsername] = useState<string>('')

  const handleUpdateUsername = async () => {
    try {
      const response = await axios.put(
        `https://helpmeout.cofucan.tech/srce/api/username/${oldUsername}?newUsername=${newUsername}`,
        null, // Pass the new username in the request body
      )

      if (response.status === 200) {
        // Request was successful, you can handle the response here
        console.log('Username updated successfully')
        // You can also display a success message using a library like 'react-toastify' or by setting a state variable
      }
    } catch (error) {
      // Handle any errors that may occur during the request
      console.error('Error updating username', error)
      // You can also display an error message
    }
  }

  return (
    <section className="px-[1rem] xs:px-[10%] py-[3rem] md:px-[2rem] md:py-[2.5rem] ">
      <Link
        href={'/'}
        className="flex items-center gap-[10px] cursor-pointer mb-[2rem]"
      >
        <Image
          src={'/assets/shared/logo.svg'}
          alt="logo"
          width={40}
          height={40}
        />
        <h3 className="font-Sora font-bold">HelpMeOut</h3>
      </Link>

      <div className="flex flex-col justify-center items-center">
        <section className="mt-[2rem] flex flex-col items-center">
          <h1 className="text-primary-400 font-semibold font-Sora text-[32px] mb-[8px] tracking-wide">
            Edit Username
          </h1>
        </section>
        <form className="flex flex-col w-full ss:w-[475px]">
          <div>
            <p className="text-[16px] font-Sora font-medium mb-[14px]">
              Username
            </p>
            <input
              type="text"
              placeholder="Enter your username"
              required
              value={oldUsername}
              onChange={(e) => setOldUsername(e.target.value)}
              className="w-full h-[50px] rounded-lg border-2 border-solid border-black-400 outline-none pl-[1rem] mb-[1rem] font-Sora font-medium text-[14px] xs:text-[16px]"
            />
            <p className="text-[16px] font-Sora font-medium mb-[14px]">
              New Username
            </p>
            <input
              type="text"
              placeholder="Enter your new username"
              required
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full h-[50px] rounded-lg border-2 border-solid border-black-400 outline-none pl-[1rem] mb-[1rem] font-Sora font-medium text-[14px] xs:text-[16px]"
            />
          </div>

          <button
            onClick={handleUpdateUsername}
            className="mt-[1rem] input__tag border-2 border-primary-600 rounded-md h-[50px] hover:btn-hover font-Sora text-[16px] text-[14px] xs:text-[16px] bg-primary-600 text-white"
          >
            Update Username
          </button>
        </form>
      </div>
    </section>
  )
}

export default EditUsername
