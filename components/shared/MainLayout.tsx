import React, { ReactNode } from 'react'

const MainLayout:React.FC<{ children: ReactNode | ReactNode[] }> = ({children}) => {
  return (
    <div className="container">
      {children}
    </div>
  )
}

export default MainLayout
