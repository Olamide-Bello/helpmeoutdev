import React from 'react'
import Navbar from './../components/shared/Navbar'
import Footer from './../components/shared/Footer'
import Landingpage from '@/components/shared/Landingpage'

const index: React.FC = () => {
  return (
    <>
      <Navbar />
      <Landingpage/>
      <Footer />
    </>
  )
}

export default index
