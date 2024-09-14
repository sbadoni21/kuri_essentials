import Footer from '@/components/frontend/Footer'
import TopNavBar from '@/components/frontend/TopNavBar'
import React from 'react'

const layout = ({children}) => {
  return (
    <div>
        <TopNavBar/>
        {children}
        <Footer/></div>
  )
}

export default layout