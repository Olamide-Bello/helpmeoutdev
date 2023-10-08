export interface VideoPageContentProps {
  displayModal: () => void,
  videoID?: string; // Add a videoID prop
}


export type ContextTypes = {
  logged?: boolean,
  setLogged: (logged: boolean) => void,
  username?: string,
  setUsername: (username: string) => void
}