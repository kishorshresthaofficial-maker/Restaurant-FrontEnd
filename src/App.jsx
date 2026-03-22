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
        </Route>

        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<Dashboard />} /> {/* default */}
          <Route path="food-items" element={<Fooditems />} />
          <Route path='updateMenu/:menuId' element={<Updatemenu/>}></Route>
          <Route path="categories" element={<Addcategories />} />
          <Route path='orders' element={<Orders/>}></Route>
          <Route path='blogs' element={<Blogs/>}></Route>
          <Route path='special' element={<Specialitems/>}></Route>
          <Route path='reservations' element={<Reservations/>}></Route>
          <Route path='admin-users' element={<Users/>}></Route>
        </Route>

      </Routes>
    </>
  );
}

export default App
