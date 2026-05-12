import { useEffect, useState } from 'react'
import Logo from '/logo.png'
// import './App.css'
import { Homepage } from './components/Homepage'
import { Route, Routes } from 'react-router'
import User from './components/User'
import Login from './components/Login'
import Menu from './components/Menu'
import { Navbar } from './components/Navbar'
import Aos from 'aos'
import 'aos/dist/aos.css';
import { Dashboard } from './components/admin/dashboard'
import Fooditems from './components/admin/Fooditems'
import Addcategories from './components/admin/Addcategories'
import Orders from './components/admin/Orders'
import Reservations from './components/admin/Reservations'
import PublicLayout from '../layouts/PublicLayout'
import AdminLayout from '../layouts/AdminLayout'
// import { Route, Routes, Outlet } from 'react-router-dom'


import '@mantine/core/styles.css';
import Users from './components/admin/Users'
import Specialitems from './components/admin/Specialitems'
import Blogs from './components/admin/Blogs'
import Updatemenu from './components/admin/Updatemenu'
import Updatecategory from './components/admin/Updatecategory'
import Adminuser from './components/admin/Adminuser'
import Booking from './components/Booking'
import Bookinglist from './components/admin/Bookinglist'
import Viewbooking from './components/admin/Viewbooking'
import Bloglisting from './components/admin/Bloglisting'
import UpdateBlogs from './components/admin/updateBlogs'





function App() {
  useEffect(()=> {

    Aos.init();
  },[])
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route path="menu" element={<Menu/>}></Route>
          <Route path='user' element={<User/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path="booking" element={<Booking/>}></Route>
        </Route>

        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<Dashboard />} /> {/* default */}
          <Route path="food-items" element={<Fooditems />} />
          <Route path='updateMenu/:menuId' element={<Updatemenu/>}></Route>
          <Route path="categories" element={<Addcategories />} />
          <Route path='updateCategory/:categoryId' element={<Updatecategory/>}></Route>
          <Route path='orders' element={<Orders/>}></Route>
          <Route path='blogs' element={<Blogs/>}></Route>
          <Route path='updateBlogs/:blogId' element={<UpdateBlogs/>} ></Route>
          <Route path='special' element={<Specialitems/>}></Route>
          <Route path='booking-list' element={<Bookinglist/>}></Route>
          <Route path='bloglisting/:blogId' element={<Bloglisting/>}></Route>
          <Route path='viewBooking/:bookingId' element={<Viewbooking/>}></Route>
          {/* <Route path='reservations' element={<Reservations/>}></Route> */}
          <Route path='admin-users' element={<Users/>}></Route>
          <Route path='adminUsers' element={<Adminuser/>}></Route>
        </Route>

      </Routes>
    </>
  );
}

export default App
