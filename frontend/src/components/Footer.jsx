import { Container, Nav } from "react-bootstrap";
import navIcon1 from '../assets/img/discord-white-icon.svg'
import React from 'react';

export const Footer = () => {
  const channelUrl = import.meta.env.VITE_CHANNEL_URL;

  return (
    <footer className="footer">
      <Container>
        <div className="footer-content">
          <div className="footer-content-left">
            <p>Copyright 2024. All Rights Reserved</p>
            <p><Nav.Link href="/tos" className="p" >Terms of service</Nav.Link></p>
            <p><Nav.Link href="/privacy" className="p" >Privacy</Nav.Link></p>
            {/* <p>Privacy Policy</p> */}
          </div>
          <div className="social-icon">
            <a href={channelUrl}><img src={navIcon1} alt="" /></a>
          </div>
        </div>
      </Container>
    </footer>
  )
}