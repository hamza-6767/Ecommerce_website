import React from 'react';
import { Instagram, Twitter , FacebookIcon, } from 'lucide-react';

const Footer = () => {
  return (
    <div className="footer-container">
      <p>Best  Accessories Shop </p>
      <p className="icons">
        <Instagram  />
        <Twitter />
        <FacebookIcon/>
      </p>
    </div>
  )
}

export default Footer