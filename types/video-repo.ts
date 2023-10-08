import { User } from "firebase/auth";
export interface VideoPageContentProps {
  displayModal: () => void;
}


export type ContextTypes = {
  logged?: boolean,
  setLogged: (logged: boolean) => void,
  user: User | null,
  setUser: (user: User | null) => void
}