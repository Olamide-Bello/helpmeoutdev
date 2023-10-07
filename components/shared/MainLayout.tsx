import React, { ReactNode } from 'react'

const MainLayout:React.FC<{ children: ReactNode | ReactNode[] }> = ({children}) => {
  return (
    <div className="xl:w-[1440px] mx-auto w-full md:px-[100px] px-3 xs:px-5 ss:px-8">
      {children}
    </div>
  )
}

export default MainLayout
