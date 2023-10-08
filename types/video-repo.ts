export interface VideoPageContentProps {
  displayModal: () => void,
  videoID?: string | string[] | undefined; // Add a videoID prop
}


export type ContextTypes = {
  logged?: boolean,
  setLogged: (logged: boolean) => void,
  username?: string,
  setUsername: (username: string) => void
}