import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import SaveToAccount from '@/components/RecordingReadyPage/SaveToAccount'
import VideoPageContent from '@/components/RecordingReadyPage/VideoPageContent'
import React, { useEffect } from 'react'
import MainLayout from '@/components/shared/MainLayout'
import { useState } from 'react'
import Modal from '@/components/RecordingReadyPage/Modal'

const RecordingReadyPage: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false)


  // Function to displayModal
  const displayModal = () => {
    setShowModal(true)
  }

  useEffect(() => {
    if (showModal) {
      const modalElement = document.getElementById('modal')
      if (modalElement) {
        window.scrollTo({
          top: modalElement.offsetTop,
          behavior: 'smooth', 
        })
      }
    }
  }, [showModal])

  return (
    <div className="relative w-full h-full">
      <Navbar noNav={true}/>
      <MainLayout>
        {/* Recording is ready page main content */}
        <VideoPageContent displayModal={displayModal} />
        {/* Save to account container */}
        <SaveToAccount />
      </MainLayout>
      <Footer />
      {showModal && <Modal setShowModal={setShowModal} />}
    </div>
  )
}

export default RecordingReadyPage
