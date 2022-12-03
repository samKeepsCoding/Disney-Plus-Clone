import React from 'react'
import Link from 'next/Link'
import Image from 'next/Image'
import logo from '../styles/assets/disney-button.png'

const NavBar = ({account}) => {

  return (
    <>
        <div className='fixed top-0 left-0 w-full px-4 flex flex-row justify-between bg-slate-900 z-30 text-white'>

            <div className="logo-wrapper">
                    
                        <a href='/'>
                            <Image src={logo} alt="Disney Logo" width='90' height='50'/>
                        </a>
            </div>


            <div className='flex flex-row justify-center items-center space-x-3 py-2'>
                <p className='text-sm'>Welcome, {account.username}</p>
                <img src={account.avatar.url} alt="Avatar" className='max-w-[40px]'/>
                
            </div>
        </div>
    
    </>
  )
}

export default NavBar