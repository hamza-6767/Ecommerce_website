import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { urlFor } from '../sanity/lib/client';

const HeroBanner = ({ heroBanner }) => {
  const imageUrl = heroBanner.image ? urlFor(heroBanner.image).url() : '';
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
         {/* Use Next.js Image component for better performance */}
         {imageUrl && (
          <Image 
            src={imageUrl}
            alt={heroBanner.product || 'headphones'}
            width={500}    // Specify dimensions for image optimization
            height={500}
            className="hero-banner-image"
            priority    // This ensures the banner image loads first
          />
        )}

        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner