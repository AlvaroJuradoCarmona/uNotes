import * as React from 'react';
import Link from '@mui/material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import LogoWhite from './../../assets/logo_white.png'

import './share.css'

export default function Footer() {

  return (
  <>
    <div className="footerContainer">
      <div className="footerLogo">
        <Link href="/subject">
          <img className='logo' src={LogoWhite} width={120} height={80} style={{ paddingBottom: 3.2, paddingTop: 0 }} alt="Logo" />
        </Link>
      </div>
      <div className="footerContact">
        <p><strong>Contact Us</strong></p>
        <p>unotes@gmail.com</p>
      </div>
      <div className="footerSocials">
        <FacebookIcon style={{ color: 'white' }}/>
        <InstagramIcon style={{ color: 'white' }}/>
        <LinkedInIcon style={{ color: 'white' }}/>
        <TwitterIcon style={{ color: 'white' }}/>
      </div>
    </div>
  </>
  );
};
