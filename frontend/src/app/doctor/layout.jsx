import React from 'react'
import Navbar from './Navbar'

const layout = ( {children}) => {
  return (
    <div> {children}
    <Navbar />
     </div>
  )
}

export default layout
