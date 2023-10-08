import React, { createContext, useState } from 'react'
import { ContextTypes } from '@/types/video-repo'

export const GlobalContext = createContext({
    logged: false ,
    setLogged: () => { },
    username: "",
    setUsername: () => { }
} as ContextTypes)

const GlobalState = ({ children }: { children: React.ReactNode }) => {
    const [logged, setLogged]= useState<boolean>(false)
    const [username, setUsername]= useState<string>("John Mark")

    const contextValue:ContextTypes = {
        logged,
        setLogged,
        username,
        setUsername
    }
  return (
    <GlobalContext.Provider value={contextValue}>
        {children}
    </GlobalContext.Provider>
  )
}

export default GlobalState