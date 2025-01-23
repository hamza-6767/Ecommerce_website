"use client"

import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useStateContext } from '../context/StateContext';
import Cart from '../components/Cart'

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href="/">Ecommerce Website</Link>
      </p>
      <button 
        type='button' 
        className='cart-icon' 
        onClick={() => setShowCart(true)}
      >
        <ShoppingCart />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>
     { showCart && <Cart/>}
    </div>
  );
};

export default Navbar;