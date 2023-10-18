import React, { createContext, useState, useEffect } from 'react'
import { ContextTypes } from '@/types/video-repo'

export const GlobalContext = createContext({
  titleCase: () => '',
  logged: false,
  setLogged: () => {},
  user: '',
  setUser: () => {},
  sendEmail: () => {},
  errMsg: false,
  otp: 0,
  setOtp: () => {},
  username: '',
  setUsername: () => {},
} as ContextTypes)

const GlobalState = ({ children }: { children: React.ReactNode }) => {
  const [logged, setLogged] = useState<boolean>(false)
  const [user, setUser] = useState<string>('')
  const [errMsg, setErrMsg] = useState<boolean>(false)
  const [otp, setOtp] = useState<number>(0)
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const retrieved = localStorage.getItem('logged')
      if (retrieved) {
        const storedJson = JSON.parse(retrieved)
        const savedSession = parseInt(storedJson)
        const asBoolean = Boolean(savedSession)
        setLogged(asBoolean)
      } else {
        setLogged(false)
      }
    }
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSession = localStorage.getItem('user')
      console.log(savedSession)
      if (savedSession) {
        console.log(savedSession)
        setUser(savedSession)
      } else {
        setUser('')
      }
      chrome.runtime?.sendMessage("jbagojkmnpbphopookajpgemnhhfiabd",{
        action: "FROM_PAGE",
        username: savedSession
      })
    }
  }, [])

  // useEffect(() => {
  //     chrome.runtime?.sendMessage("jbagojkmnpbphopookajpgemnhhfiabd",{
  //       action: "FROM_PAGE",
  //       username: user
  //     })
  // }, [user])

  //function to validate the entered email
  const isEmailValid = (mail: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(mail)
  }

  const sendEmail = async (
    email: string,
    id: string | string[] | undefined,
  ) => {
    //validate the email before taking action
    const valid = isEmailValid(email)
    if (!valid) {
      setErrMsg(true)
    } else {
      if (user) {
        const init = titleCase(user)
        try {
          const response = await fetch(
            `https://www.cofucan.tech/srce/api/send-email/${id}?sender=${init}&recipient=${email}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Vary": "Origin"
              },
              mode: "cors"
            },
          )
          console.log(response)
          if (response.status === 200) {
            const result = await response.json()
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          const response = await fetch(
            `https://www.cofucan.tech/srce/api/send-email/${id}?receipient=${email}&sender=""`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Vary": "Origin"
              },
              mode: "cors"
            },
          )
          console.log(response)
          if (response.status === 200) {
            const result = await response.json()
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  const titleCase = (name: string) => {
    let intialised = ''
    if (name) {
      const copy = name
      let arr = copy.split(' ')
      let joined = []

      for (let i = 0; i <= arr.length; i++) {
        const initials =
          typeof arr[i] === 'string'
            ? arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
            : ''
        joined.push(initials)
      }
      intialised = joined.join(' ')
    }
    return intialised
  }

  const contextValue: ContextTypes = {
    titleCase,
    logged,
    setLogged,
    user,
    setUser,
    sendEmail,
    errMsg,
    otp,
    setOtp,
    username,
    setUsername,
  }
  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalState
