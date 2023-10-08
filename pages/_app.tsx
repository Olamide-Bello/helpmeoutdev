import GlobalState from '@/context/GlobalContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export default function App({ Component, pageProps }: AppProps) {
  return <GlobalState><Component {...pageProps}> </Component><ToastContainer 
  position="top-center" // Position the toast container at the bottom-center
  autoClose={1500} // Close after 3 seconds (adjust as needed)
  style={{
    width: 'fit-content', // Adjust the width as needed
    textAlign: 'center', // Center-align the container's content
  }}
  /></GlobalState>
}
