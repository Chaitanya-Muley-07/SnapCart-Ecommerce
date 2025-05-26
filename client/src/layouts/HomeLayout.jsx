import React from 'react'
import Navbar from '../components/custom/Navbar'
import Footer from '../components/custom/Footer'

const HomeLayout = ({children}) => {
  return (
    <>
    <Navbar/>
    {children}
    <Footer/>
    </>
  )
}

export default HomeLayout