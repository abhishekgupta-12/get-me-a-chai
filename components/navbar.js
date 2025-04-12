"use client";
import React, { useState, useEffect } from 'react'
import { useSession, signOut } from "next-auth/react"
import Link from 'next/link'

const Navbar = () => {
  const { data: session, update, status } = useSession()
  const [username, setUsername] = useState("")



  const [showdropdown, setShowdropdown] = useState(false)

  return (
    <nav className='bg-gray-900 shadow-xl shadow-white text-white flex justify-between items-center px-4 md:h-16'>
      <Link className="logo font-bold text-lg flex justify-center items-center" href={"/"}>
        <img className=' invert' src="tea.gif" width={44} alt="Logo" />
        <span className='text-xl md:text-base my-3 md:my-0'>Get Me a Chai!</span>
      </Link>

      <div className='relative flex justify-center items-center md:block gap-4'>
        {session ? (
          <>
            <button 
              onClick={() => setShowdropdown(!showdropdown)} 
              onBlur={() => setTimeout(() => setShowdropdown(false), 300)}
              className="text-white mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center"
            >
              Account
              <svg className="w-2.5 h-2.5 ms-3" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>

            {showdropdown && (
              <div 
                className="z-10 absolute left-[15px] top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                onMouseLeave={() => setShowdropdown(false)}
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link  href={`/${session?.user?.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                      Your Page
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={() => signOut({ callbackUrl: "/" })} 
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}

            <button 
              className="text-white w-fit bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </button>
          </>
        ) : (
          <Link href={"/login"}>
            <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2'>
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar;
