import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  auth,
  facebookProvider,
  googleProvider,
} from '../../components/Auth/firebase'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'

interface User {
  uid: string
  email: string | null
  displayName: string | null
}

const LogIn: React.FC = () => {
  const [userExist, setUserExist] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [user, setUser] = useState<User | null>(null)
  const [message, setMessage] = useState<boolean | string>(false)

  console.log(auth?.currentUser?.email)

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const newUser = userCredential.user

        console.log(newUser)
        setUser(newUser)
        setUserExist(true)
        setMessage('Successfully Logged In!')
      })
      .catch((error) => {
        const errorCode = error.code

        setMessage('Account does not exist Sign Up!')
      })
  }

  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((userCredential) => {
        const newUser = userCredential.user
        console.log(newUser)
        setUser(newUser)
        setUserExist(true) // Change to true
        setMessage('Successfully Logged In!')
      })
      .catch((error) => {
        const errorCode = error.code
        setMessage('Account does not exist Sign Up!')
      })
  }

  const logInWithFacebook = () => {
    signInWithPopup(auth, facebookProvider)
      .then((userCredential) => {
        const newUser = userCredential.user
        console.log(newUser)
        setUser(newUser)
        setUserExist(true) // Change to true
        setMessage('Successfully Logged In!')
      })
      .catch((error) => {
        const errorCode = error.code
        setMessage('Account does not exist Sign Up!')
      })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])
  const handleSignOut = () =>
    signOut(auth)
      .then(() => {
        setUser(null)
        setUserExist(false)
        setMessage('Successfully Signed Out!')
      })
      .catch((error) => {
        const errorCode = error.code
        setMessage(errorCode)
      })

  return (
    <section className="px-[10%] py-[3rem] md-px[2rem] md-py[2.5rem]">
      <Link href={'/'} className="flex items-center gap-[10px] cursor-pointer">
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
            Log in
          </h1>
          <p className="text-primary-300 text-center text-[15px] font-Work-Sans font-medium tracking-tight mb-[32px]">
            Join millions of others in sharing successful
            <br /> moves on{' '}
            <span className="text-primary-600 font-semibold">HelpMeOut</span>.
          </p>
          <div
            onClick={loginWithGoogle}
            className="rounded-lg border-2 border-black-600 w-[475px] bg-white flex justify-center items-center gap-[1rem] py-[0.8rem] px-[0] mb-[30px] cursor-pointer"
          >
            <Image
              src={'/assets/login/Google.svg'}
              alt="google__logo"
              width={20}
              height={20}
            />
            <p className="mb-[-0.2rem] font-Work-Sans text-[16px] font-medium tracking-tight">
              Continue with Google
            </p>
          </div>

          <div
            onClick={logInWithFacebook}
            className="rounded-lg border-2 border-black-600 w-[475px] bg-white flex justify-center items-center gap-[1rem] py-[0.8rem] px-[0] mb-[30px]"
          >
            <div className="flex gap-[1rem] ml-[1.5rem] cursor-pointer">
              <Image
                src={'/assets/login/Facebook.svg'}
                alt="facebook__logo"
                width={20}
                height={20}
              />
              <p className="mb-[-0.2rem] font-Work-Sans text-[16px] font-medium tracking-tight">
                Continue with Facebook
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-[1rem] mb-[1rem]">
            <div className="w-[200px] h-[1px] bg-black-100 "></div>
            <p className="font-medium text-primary-500 mt-[-10px]">or</p>
            <div className="w-[200px] h-[1px] bg-black-100 "></div>
          </div>
        </section>
        <div className="flex flex-col w-[475px]">
          <div>
            <p className="text-[16px] font-Sora font-medium mb-[14px]">Email</p>
            <input
              type="email"
              placeholder="Enter your email address"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[50px] rounded-lg border-2 border-solid border-black-400 outline-none pl-[1rem] mb-[1rem] font-Sora font-medium text-[17px]"
            />
          </div>
          <div>
            <p className="text-[16px] font-Sora font-medium mb-[14px]">
              Password
            </p>
            <input
              type="password"
              placeholder="Enter your Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              minLength={5}
              className="w-full h-[50px] rounded-lg border-2 border-solid border-black-400 outline-none pl-[1rem] mb-[1rem] font-Sora font-medium text-[17px]"
            />
          </div>
          {userExist && (
            <button
              onClick={handleSignOut}
              className="mt-[1rem] border-2 border-primary-600 rounded-md h-[50px] hover:btn-hover font-Sora text-[17px] bg-primary-600 text-white "
            >
              Sign Out
            </button>
          )}
          {!userExist && (
            <button
              onClick={login}
              className="mt-[1rem] border-2 border-primary-600 rounded-md h-[50px] hover:btn-hover font-Sora text-[17px] bg-primary-600 text-white "
            >
              Log In
            </button>
          )}

          {message && (
            <p className="mt-[0.5rem] text-center text-[19px] font-semibold">
              {message}
            </p>
          )}
          <h2 className="mt-[1rem] text-center text-[17px] text-primary-400 tracker-medium font-semibold font-Work-Sans">
            Don&apos;t Have Account{' '}
            <Link href={'/signUp'}>
              <span className="font-bold text-[18px] hover:underline cursor-pointer font-Sora">
                Sign Up
              </span>
            </Link>
          </h2>
        </div>
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

export default LogIn
