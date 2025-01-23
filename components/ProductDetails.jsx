'use client';

import React, { useState} from 'react';

import { Minus, Plus, Star, StarOff } from 'lucide-react';

import { Product } from '@/components';
import { urlFor } from '../sanity/lib/client';

import {useStateContext} from '@/context/StateContext'



const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();


  const imageUrl = image && image[index] ?urlFor(image[0]).url() : '';


  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  }

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
          <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>
          <div className="small-images-container">
          {image?.map((item, i) => (
              <img  // Changed from Next.js Image to regular img
                key={i}
                src={urlFor(item).url()}
                alt={`${name}-${i}`}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
          <div className="stars-container">
      {[1, 2, 3, 4, 5].map((index) => (
        <span 
          key={index} 
          onClick={() => setRating(index)}
          className="star-icon"
        >
          {index <= rating ? (
            <Star size={20} fill="#FFD700" />
          ) : (
            <StarOff size={20} />
          )}
        </span>
      ))}
    </div>
    <p>({rating || 0})</p>
  </div>
  
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><Minus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><Plus /></span>
            </p>
          </div>
          <div className="buttons">
            <button 
              type="button" 
              className="add-to-cart" 
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button 
              type="button" 
              className="buy-now" 
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails;