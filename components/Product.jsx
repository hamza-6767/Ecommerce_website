import React from 'react';
import Link from 'next/link';

import { urlFor } from '../sanity/lib/client';

const Product = ({ product: { image, name, slug, price } }) => {
   const imageUrl = image && image[0] ?urlFor(image[0]).url() : '';
   const altText = `${name} - Product Image`;
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
         
          <img
            src={imageUrl}
            alt={ altText } 
            width={250}
            height={250}
            className="product-image"
            
           
           
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;