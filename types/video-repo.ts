import { User } from 'firebase/auth'
export interface VideoPageContentProps {
  displayModal: () => void
  setEmail: (parameter: string) => void
  videoID?: string | string[] | undefined // Add a videoID prop
  email: string
}

export type ContextTypes = {
  titleCase: (name: string) => string,
  logged?: boolean,
  setLogged: (logged: boolean) => void,
  user: string,
  setUser: (user: string) => void,
  sendEmail: (email: string, id: string) => void,
  errMsg: boolean,
  otp: number,
  setOtp: (otp: number) => void,
  username: string,
  setUsername: (username: string) => void
}
  