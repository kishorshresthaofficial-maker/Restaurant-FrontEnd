import React from 'react'
import Adminmenu from '../src/components/admin/Adminmenu.jsx'
import { Outlet } from 'react-router'
// import { useSelector } from 'react-redux'

const AdminLayout = () => {
    // const {isLoggedIn} = useSelector((state)=>state.auth)
  return (
      <div className="flex gap-10">
      <Adminmenu/>

      <div className="pl-70 py-5 w-full h-dvh bg-gray-100">
        <Outlet/>
      </div>
        
    </div>
  )
}

export default AdminLayout
