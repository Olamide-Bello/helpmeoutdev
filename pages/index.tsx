import React from 'react'
import Navbar from './../components/shared/Navbar'
import Footer from './../components/shared/Footer'
import LandingPage from '@/components/LandingPage/LandingPage'

const index: React.FC = () => {
  return (
    <>
      <Navbar />
      <LandingPage />
      <Footer />
    </>
  )
}

export default index
