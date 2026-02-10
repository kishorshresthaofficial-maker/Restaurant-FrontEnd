import React from 'react'
import { Navbar } from '../src/components/Navbar'
import { Outlet } from 'react-router'

const PublicLayout = () => {
  return (
    <div>
           <div data-aos="fade-down"><Navbar/></div>
           <Outlet/>
    </div>
  )
}

export default PublicLayout
