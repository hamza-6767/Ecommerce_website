import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { urlFor } from '../sanity/lib/client';

const FooterBanner = ({ footerBanner }) => {
  // Destructure with default empty object to prevent errors
  const { 
    discount, 
    largeText1, 
    largeText2, 
    saleTime, 
    smallText, 
    midText, 
    desc, 
    product, 
    buttonText, 
    image 
  } = footerBanner || {};

  // Correct image URL handling
  const imageUrl = image ? urlFor(image).url() : '/placeholder-image.jpg';

  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>

        {/* Image placement and configuration */}
        <Image 
          src={imageUrl}
          alt="product"
          width={500}    
          height={500}
          className="footer-banner-image"
         
        />
      </div>
    </div>
  );
};

export default FooterBanner;