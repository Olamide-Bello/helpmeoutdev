import React, { useState, useContext, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'
import { GlobalContext } from '@/context/GlobalContext'

interface User {
  username: string
  email: string
  password: string
}

const EmailOtp: React.FC = () => {
  const [token, setToken] = useState<string>('')
  const { otp } = useContext(GlobalContext)
  const { setLogged, setUser } = useContext(GlobalContext)
  const history = useRouter()

  useEffect(() => {
    // Access localStorage inside useEffect, which runs only on the client side
    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : {};
    const storedOtp: number = userData.otp ? parseInt(userData.otp, 10) : 0;
    // Perform any operations involving localStorage here
  }, []); // Empty dependency array ensures the effect runs once after the initial render


  const userDataString = localStorage.getItem('userData')
  const userData = userDataString ? JSON.parse(userDataString) : {}
  const storedOtp: number = userData.otp ? parseInt(userData.otp, 10) : 0

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setToken(value)
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const { username, email, password } = userData
    const tokenNumber = parseInt(token, 10)

    if (tokenNumber !== storedOtp) {
      toast.error('Invalid OTP')
      return
    }

    const data = { username, email, password }
    console.log(data)
    try {
      const response = await fetch(
        'https://www.cofucan.tech/srce/api/signup/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      )

      const result = await response.json()
      console.log(result)
      if (result.status_code === 201) {
        toast.success('Email Confirmed Successfully', {
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
        setLogged(true)
        localStorage.setItem('user', result.username)
        const num = Number(true)
        localStorage.setItem('logged', JSON.stringify(num))
        setUser(result.username)
        history.push('/videos')
      } else {
        console.error('Email Confirmation failed', result.message)
        toast.error(`Email Confirmation failed`, {
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
    } catch (error) {
      console.error('An error occurred:', error)
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
    <section className="px-[1rem] xs:px-[10%] py-[3rem] md-px[2rem] md-py[2.5rem] ">
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
        <section className="mt-[2rem] flex flex-col items-center mb-[2rem]">
          <h1 className="text-primary-400 font-semibold font-Sora text-[32px] mb-[8px] tracking-wide">
            Confirm Email
          </h1>
          <p className="text-primary-300 text-center text-[15px] font-Work-Sans font-medium tracking-tight mb-[32px]">
            Enter the OTP sent to your email to continue
          </p>
        </section>
        <form
          className="flex flex-col w-full ss:w-[475px]"
          onSubmit={handleSubmit}
        >
          <div>
            <p className="text-[16px] font-Sora font-medium mb-[14px]">OTP</p>
            <input
              type="number"
              placeholder="Enter your OTP"
              required
              value={token}
              onChange={handleTokenChange}
              className="w-full h-[50px] rounded-lg border-2 border-solid border-black-400 outline-none pl-[1rem] mb-[1rem] font-Sora font-medium text-[14px] xs:text-[16px]"
            />
          </div>

          <button className="mt-[1rem] input__tag border-2 border-primary-600 rounded-md h-[50px] hover:btn-hover font-Sora text-[16px] text-white bg-primary-600">
            Confirm Email
          </button>

          <h2 className="mt-[1rem] text-center text-[16px] text-primary-400 tracker-medium font-semibold font-Work-Sans">
            Don&apos;t Have Account?{' '}
            <Link href={'/signUp'}>
              <span className="font-bold hover:underline cursor-pointer font-Sora">
                Sign Up
              </span>
            </Link>
          </h2>
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

export default EmailOtp


