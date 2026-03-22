import React from 'react'
import { Navbar } from '../src/components/Navbar'
import { Outlet } from 'react-router'
import Footer from '../src/components/Footer'

const PublicLayout = () => {
  return (
    <div>
           <div data-aos="fade-down"><Navbar/></div>

           <Outlet/>
           {/* <div><Footer/></div> */}
    </div>
  )
}

export default PublicLayout
