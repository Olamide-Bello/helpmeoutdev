import GlobalState from '@/context/GlobalContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'

export default function App({ Component, pageProps }: AppProps) {
  return <GlobalState><ToastContainer 
  position="top-center" // Position the toast container at the bottom-center
  autoClose={1500} // Close after 3 seconds (adjust as needed)
  style={{
    width: 'fit-content', // Adjust the width as needed
    textAlign: 'center', // Center-align the container's content
  }}
  /><Component {...pageProps} /></GlobalState>
}
