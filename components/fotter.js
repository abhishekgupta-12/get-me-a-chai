import React from 'react'

const Fotter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='bg-blue-950 text-white flex items-center justify-center px-4 h-16'>
        <p>Copyright &copy; {currentYear} Get me a chai. All rights reserved!</p>
    </footer>
  )
}

export default Fotter
