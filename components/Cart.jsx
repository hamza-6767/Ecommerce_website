"use client"

import React, { useRef } from 'react';
import Link from 'next/link';
import { Minus, Plus, ArrowLeft } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { urlFor } from '../sanity/lib/client';
import getStripe from '../lib/getstripe';
import { useStateContext } from '../context/StateContext';

const Cart = () => {
    const cartRef = useRef();
    const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext();
    const handleCheckout = async () => {
        try {
          const stripe = await getStripe();
          if (!stripe) throw new Error('Stripe not loaded');
      
          const response = await fetch('/api/stripe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cartItems),
            cache: 'no-store'
          });
      
          if (!response.ok) {
            const text = await response.text();
            throw new Error(text || `HTTP error! status: ${response.status}`);
          }
      
          const session = await response.json();
          if (!session || !session.id) {
            throw new Error('Invalid session data received');
          }
      
          const result = await stripe.redirectToCheckout({ sessionId: session.id });
          if (result.error) throw new Error(result.error.message);
        } catch (err) {
          console.error('Checkout error:', err);
          toast.error('Checkout failed: ' + err.message);
        }
      };
    return (
        <div className='cart-wrapper' ref={cartRef}>
            <div className='cart-container'>
                <button
                    type='button'
                    className='cart-heading'
                    onClick={() => setShowCart(false)}>
                    <ArrowLeft />
                    <span className='heading'> Your Cart</span>
                    <span className='cart-num-items'>{totalQuantities} items</span>
                </button>
                {cartItems.length < 1 && (
                    <div className='empty-cart'>
                        <ShoppingCart size={150} />
                        <h3>Your shopping bag is empty</h3>
                        <Link href="/">
                            <button
                                type="button"
                                onClick={() => setShowCart(false)}
                                className='btn'
                            >
                                Continue Shopping

                            </button>
                        </Link>


                    </div>
                )}
                <div className='product-container'>
                    {cartItems.length >= 1 && cartItems.map((item, index) => (
                        <div className='product' key={item._id}>
                            <img src={urlFor(item?.image[0])}
                                className='cart-product-image' />
                            <div className='item-desc'>
                                <div className='flex top'>
                                    <h5>{item.name}</h5>
                                    <h4>${item.price}</h4>
                                </div>
                                <div className='flex bottom'>
                                    <div>
                                        <p className="quantity-desc">
                                            <span className="minus" onClick={()=> toggleCartItemQuantity(item._id,'dec')}><Minus /></span>
                                            <span className="num">{item.quantity}</span>
                                            <span className="plus" onClick={()=> toggleCartItemQuantity(item._id,'inc')}><Plus /></span>
                                        </p>
                                    </div>
                                    <button
                                    type="button"
                                    className='remove-item'
                                    onClick={()=>onRemove(item)}>
                                        < Trash2/>

                                    </button>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>
                {cartItems.length >= 1 && (
                    <div className='cart-bottom'>
                        <div className='total'>
                            <h3>Subtotal</h3>
                            <h3>${totalPrice}</h3>
                        </div>
                        <div className='btn-container'>
                        <button
                        type="button"
                        className='btn'
                        onClick={handleCheckout}> 
                         Pay with stripe                     

                        </button>

                        </div>
                       

                    </div>
                )}


            </div>

        </div>
    )
};
export default Cart
