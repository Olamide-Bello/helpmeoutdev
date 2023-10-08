export interface VideoPageContentProps {
  displayModal: () => void;
}


export type ContextTypes = {
  logged?: boolean,
  setLogged: (logged: boolean) => void,
  username?: string,
  setUsername: (username: string) => void
}