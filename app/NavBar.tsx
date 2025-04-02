import {  Logout } from '@carbon/icons-react'
import './navbar.scss';
import Link from 'next/link';

function NavBar() {
  return (
    <div>
       <nav>
        <h3>IBM Intellisphere Optim</h3>
        <Link href={"/Dashboard"}><h4>Dashboard</h4></Link>
        <Link href={"/products"}> <h4>Products</h4></Link>
        <div className='icons'>
          <Link href={"/"}><Logout size={20}/></Link>
        </div>
      </nav>

    </div>
  )
}

export default NavBar
