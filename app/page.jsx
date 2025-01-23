
   // app/page.jsx
import React from 'react'
import { HeroBanner, Product,FooterBanner } from '../components'
import { client } from '../sanity/lib/client'

async function Page() {
  // We fetch the data directly in the component, which is a simpler approach
  // Think of this like preparing all your ingredients before cooking
  const query = '*[_type == "product"]'
  const products = await client.fetch(query)

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
   
      <div className='products-heading'>
        <h2>Best Seller Products</h2>
        <p>speaker There are many variations passages</p>
      </div>
      
      <div className='products-container'>
        {/* We use optional chaining here in case products is undefined */}
        {/* Think of this like safely checking if you have items before trying to display them */}
        {products?.map((product)=> <Product key={product._id} product={product}/>)}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  )
}

export default Page;
