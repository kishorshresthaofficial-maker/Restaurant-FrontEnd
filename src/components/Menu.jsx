import React from 'react'
import { Link, Outlet } from 'react-router'

const Menu = () => {
  return (
    <div className='px-5 py-5 lg:px-0 py-0'>
               <h1 className='py-4 text-4xl text-amber-700 font-medium text-center'> Our Menu</h1>
          <div className='flex flex-col gap-3 lg:flex-row'>
              <div className='py-5 px-4 rounded-xl flex justify-between items-center gap-2 bg-amber-400 lg:flex-col items-start'>
                <Link to='/' className='menuLinks'>Thakali Set</Link>
                <Link to='/' className='menuLinks'>MoMo</Link>
                <Link to='/' className='menuLinks'>Pizza</Link>
                <Link to='/' className='menuLinks'>Pasta</Link>
                <Link to='/' className='menuLinks'>Coffee</Link>
                <Link to='/' className='menuLinks'>Lassi</Link>
            </div>

            <div>
               <Outlet/>
            </div>
          </div>
    </div>
  )
}

export default Menu
