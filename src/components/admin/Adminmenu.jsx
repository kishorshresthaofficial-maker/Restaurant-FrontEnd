import React from 'react'
import { Link } from 'react-router'


const Adminmenu = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  console.log(user)
  return (
    <div className="bg-gray-800 text-white h-dvh w-60 py-3 text-xl fixed">
        <div className="flex flex-col justify-center items-center py-4">
          <div className="w-20 bg-white h-20 rounded-full my-3"></div>
         {user ?
          <div>{user.name}</div>
          : "Not Logged In"
         }

        </div>

        <div className="flex flex-col justify-center items-start text-left py-20">
          {/* <Link to="" className="dashboard_links">
            Dashboard
          </Link> */}
          <Link to="food-items" className="dashboard_links">
            Food Items
          </Link>
          <Link to="categories" className="dashboard_links">
            Categories
          </Link>
          <Link to="orders" className="dashboard_links">
            Orders
          </Link>
          <Link to="special" className='dashboard_links'>Chef's Special</Link>
          <Link to="blogs" className='dashboard_links'>Blogs</Link>
          <Link to="reservations" className="dashboard_links">
            Reservation
          </Link>
          <Link to="admin-users" className='dashboard_links'>Users</Link>
        </div>

        <div className="py-30 flex items-start px-3">
          <Link to="" className="links">
            Logout
          </Link>
        </div>
      </div>
  )
}

export default Adminmenu
