import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useContext } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GlobalContext } from '@/context/GlobalContext'
const EditUsername = () => {
  const [newUsername, setNewUsername] = useState('')
  const [oldUsername, setOldUsername] = useState('')
  const history = useRouter()
  const { setUser } = useContext(GlobalContext)

  const handleUpdateUsername = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(
        `https://helpmeout.cofucan.tech/srce/api/username/${oldUsername}/?new_username=${newUsername}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newUsername, oldUsername }),
        },
      )

      if (response.status === 200) {
        // Request was successful, you can handle the response here
        console.log('Username updated successfully')
        console.log(response)
        toast.success('Username Updated Successfully', {
          style: {
            background: 'white',
            color: 'green',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '12px 24px',
            fontSize: '16px',
            textAlign: 'center',
          },
        })
        const responseData = await response.json()
        console.log(responseData)

        setUser(newUsername)
        history.push('/videos')
      }
    } catch (error) {
      toast.error(`Error: ${error}`, {
        style: {
          background: 'white',
          color: 'red',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '12px 24px',
          fontSize: '16px',
          textAlign: 'center',
        },
      })
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
        <form
          className="flex flex-col w-full ss:w-[475px]"
          onSubmit={handleUpdateUsername}
        >
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
            type="submit"
            className="mt-[1rem] input__tag border-2 border-primary-600 rounded-md h-[50px] hover:btn-hover font-Sora text-[16px] text-[14px] xs:text-[16px] bg-primary-600 text-white"
          >
            Update Username
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-center" // Position the toast container at the bottom-center
        autoClose={1500} // Close after 3 seconds (adjust as needed)
        style={{
          width: 'fit-content', // Adjust the width as needed
          textAlign: 'center', // Center-align the container's content
        }}
      />
    </section>
  )
}

export default EditUsername
