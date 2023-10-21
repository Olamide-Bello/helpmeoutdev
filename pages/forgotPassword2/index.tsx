import React, { useState, useContext, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'
import { GlobalContext } from '@/context/GlobalContext'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

interface User {
  uid: string
  email: string | null
  displayName: string | null
}

const ForgotPassword2: React.FC = () => {
  const [message, setMessage] = useState<boolean | string>(false)
  const { otp, setOtp } = useContext(GlobalContext)
  const { username, setUsername } = useContext(GlobalContext)
  const { user, logged, setUser, setLogged } = useContext(GlobalContext)

  const history = useRouter()

  const [token, setToken] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [password2, setPassword2] = useState<string>('')
  const [err, setErr] = useState<boolean>(false)
  const errMsg = 'Passwords do not match'
  const [otpErr, setOtpErr] = useState<boolean>(false)
  const [seconds, setSeconds] = useState<number>(60)
  const [consecutiveFailures, setConsecutiveFailures] = useState<number>(0)
  const [otpExpiredMessage, setOtpExpiredMessage] = useState<string | null>(
    null,
  )
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showPassword2, setShowPassword2] = useState<boolean>(false)
  const [valErrMsg, setValErrMsg] = useState<boolean>(false)
  const errMsgVal = "Password must contain one lowercase letter, one uppercase letter, one symbol, and be at least 5 characters long"
  
  useEffect(() => {
    if(user !== '' && logged === true) {
     history.replace('/videos')
    }
 }, [user, logged])


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2)
  }

  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[.?}")+;:,<>/(_!@#$%^&*])\S{8,}$/

    if (!passwordRegex.test(value)) {
      setValErrMsg(true)
    } else {
      setValErrMsg(false)
    }
  }

  useEffect(() => {
    // Create an interval that decreases the seconds state every second
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      } else {
        clearInterval(intervalId) // Clear the interval when the countdown reaches 0
      }
    }, 1000)

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, [seconds])

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setToken(value)
    if (otp !== +value) {
      setOtpErr(true)
    } else {
      setOtpErr(false)
    }
  }

  const handleResendClick: React.MouseEventHandler<
    HTMLParagraphElement
  > = async (e) => {
    e.preventDefault()
    setSeconds(60)
    setOtpExpiredMessage(null)
    setConsecutiveFailures(0)
    try {
      const response = await fetch(
        `https://helpmeout.cofucan.tech/srce/api/request_otp/?username=${username}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Vary": "Origin"
          },
          mode: "cors"
        })

      console.log(response)
      const result = await response.json()
      console.log(result)
      if (result.status_code === 200) {
        console.log('Successful!')
        setOtp(result.verification_code)
        setUsername(result.username)
        toast.success('A Token has been sent to your Email', {
          style: {
            background: 'white', // Change the background color as needed
            color: 'green', // Change the text color as needed
            borderRadius: '8px', // Rounded corners for the toast
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add a subtle box shadow
            padding: '12px 24px', // Adjust padding as needed
            fontSize: '16px', // Adjust font size as needed
            textAlign: 'center',
          },
        })

        // You can handle success here, e.g., redirect to a success page
      } else {
        console.error('Unsuccessful', result.status_code)
        toast.error(`User Email not found`, {
          style: {
            background: 'white', // Change the background color as needed
            color: 'red', // Change the text color as needed
            borderRadius: '8px', // Rounded corners for the toast
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add a subtle box shadow
            padding: '12px 24px', // Adjust padding as needed
            fontSize: '16px', // Adjust font size as needed
            textAlign: 'center',
          },
        })
        // Handle the error, show an error message, etc.
      }
    } catch (error) {
      console.error('An error occurred:', error)
      toast.error(`Error: ${error}`, {
        style: {
          background: 'white', // Change the background color as needed
          color: 'red', // Change the text color as needed
          borderRadius: '8px', // Rounded corners for the toast
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add a subtle box shadow
          padding: '12px 24px', // Adjust padding as needed
          fontSize: '16px', // Adjust font size as needed
          textAlign: 'center',
        },
      })
    }
  }

  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setPassword(value)
    console.log(value)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])\S{5,}$/;
    if (passwordRegex.test(value)) {
      setValErrMsg(false)
    }
  }

  const handlePassChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setPassword2(value)
    console.log(value)
    if (password !== value) {
      setErr(true)
    } else {
      setErr(false)
    }
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    
    if (valErrMsg) {
      return
    }

    if (otpErr) {
      setConsecutiveFailures(consecutiveFailures + 1)

      if (consecutiveFailures >= 5) {
        setOtpExpiredMessage('OTP has Expired')
        return
      }

      // Display an error toast for OTP invalid
      toast.error(`OTP Invalid`, {
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

      return
    }
    
    setConsecutiveFailures(0)
    setOtpExpiredMessage(null)
    const data = { username, password }
    console.log(data)
    try {
      const response = await fetch(
        'https://www.cofucan.tech/srce/api/change_password/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
            Vary: 'Origin',
          },

          mode: 'cors',
          body: JSON.stringify(data),
        },
      )

      console.log(response)
      const result = await response.json()
      console.log(result)
      if (result.status_code === 200) {
        console.log('Password Changed Successfully!')
        toast.success('Password Changed Successfully', {
          style: {
            background: 'white', // Change the background color as needed
            color: 'green', // Change the text color as needed
            borderRadius: '8px', // Rounded corners for the toast
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add a subtle box shadow
            padding: '12px 24px', // Adjust padding as needed
            fontSize: '16px', // Adjust font size as needed
            textAlign: 'center',
          },
        })
        setLogged(true)
        const num = Number(true)
        localStorage.setItem('logged', JSON.stringify(num))
        setUser(result.username)
        localStorage.setItem('user', result.username)
        history.push('/videos')
        // You can handle success here, e.g., redirect to a success page
      } else {
        console.error('Password Change failed', result.message)
        toast.error(`Password Change failed`, {
          style: {
            background: 'white', // Change the background color as needed
            color: 'red', // Change the text color as needed
            borderRadius: '8px', // Rounded corners for the toast
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add a subtle box shadow
            padding: '12px 24px', // Adjust padding as needed
            fontSize: '16px', // Adjust font size as needed
            textAlign: 'center',
          },
        })
        // Handle the error, show an error message, etc.
      }
    } catch (error) {
      console.error('An error occurred:', error)
      toast.error(`Error: ${error}`, {
        style: {
          background: 'white', // Change the background color as needed
          color: 'red', // Change the text color as needed
          borderRadius: '8px', // Rounded corners for the toast
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add a subtle box shadow
          padding: '12px 24px', // Adjust padding as needed
          fontSize: '16px', // Adjust font size as needed
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
            Forgot Password?
          </h1>
          <p className="text-primary-300 text-center text-[15px] font-Work-Sans font-medium tracking-tight mb-[32px]">
            Enter the OTP sent to your email and a new password to continue
          </p>
          <div className="flex flex-col justify-center items-center">
            {consecutiveFailures >= 5 && otpExpiredMessage && (
              <p className="text-red-600 font-Sora font-medium">
                {otpExpiredMessage}
              </p>
            )}
          </div>
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

          <div>
            <p className="text-[16px] font-Sora font-medium mb-[14px]">
              New Password
            </p>
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
                placeholder="Enter your Password"
                required
                value={password}
                onChange={handlePassChange}
                onBlur={validatePassword}
                minLength={5}
                className="w-full input__tag h-[50px] rounded-lg border-2 border-solid border-black-400 outline-none pl-[1rem] mb-[1rem] font-Sora font-medium  text-[14px] xs:text-[16px]"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="password-toggle-button text-xl absolute top-[50%] right-[1rem] transform translate-y-[-90%]"
              >
                {showPassword ? <BsEye /> : <BsEyeSlash />}
              </button>
            </div>
          </div>
          {valErrMsg && (
            <p className="text-[14px] text-red-400 font-Sora font-medium mb-[14px]">
              {errMsgVal}
            </p>
          )}

          <div>
            <p className="text-[16px] font-Sora font-medium mb-[14px]">
              Confirm Password
            </p>
            <div className="relative w-full">
              <input
                type={showPassword2 ? 'text' : 'password'} // Toggle input type based on showPassword state
                placeholder="Enter your Password"
                required
                value={password2}
                onChange={handlePassChange2}
                minLength={5}
                className="w-full input__tag h-[50px] rounded-lg border-2 border-solid border-black-400 outline-none pl-[1rem] mb-[1rem] font-Sora font-medium  text-[14px] xs:text-[16px]"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility2}
                className="password-toggle-button text-xl absolute top-[50%] right-[1rem] transform translate-y-[-90%]"
              >
                {showPassword2 ? <BsEye /> : <BsEyeSlash />}
              </button>
            </div>
          </div>
          {err && (
            <p className="text-[14px] text-red-400 font-Sora font-medium mb-[14px]">
              {errMsg}
            </p>
          )}
          <button
            // onClick={login}
            disabled={consecutiveFailures >= 6}
            className="mt-[1rem] input__tag border-2 border-primary-600 rounded-md h-[50px] hover:btn-hover font-Sora text-[16px]  text-[14px] xs:text-[16px] bg-primary-600 text-white "
          >
            Update Password
          </button>

          <div>
            <div className="mt-[1rem] text-center text-[18px] text-primary-400 tracker-medium font-semibold font-Work-Sans">
              {seconds > 0 ? (
                <>
                  Request for New OTP in{' '}
                  <span className="text-red-600">{seconds}</span> seconds
                </>
              ) : (
                <p
                  onClick={handleResendClick}
                  className="text-green-500 cursor-pointer"
                >
                  Resend OTP
                </p>
              )}
            </div>
          </div>

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

export default ForgotPassword2
