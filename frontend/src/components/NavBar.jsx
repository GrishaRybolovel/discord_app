import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/img/logo.svg';
import navIcon1 from '../assets/img/discord-white-icon.svg';
import { HashLink } from 'react-router-hash-link';
import React from 'react';
import { useUser } from "./UserContext";

export const NavBar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const discordAuthUrl = import.meta.env.VITE_DISCORD_AUTH_URL;
  const channelUrl = import.meta.env.VITE_CHANNEL_URL;

  const { user, login, logout, refreshUserData } = useUser();


  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log("User before fetching: ", user);
      if (!user) {
        try {
          await refreshUserData();
          console.log("User after fetching: ", user);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    fetchData();
  }, [refreshUserData]);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  const redirectToDiscordAuth = () => {
    window.location.href = discordAuthUrl;
  };


  return (
    <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
            <Nav.Link href="/#features" className={activeLink === 'features' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('features')}>Features</Nav.Link>
            <Nav.Link href="/#invite" className={activeLink === 'invite' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('invite')}>Invite</Nav.Link>
            <Nav.Link href="/commands" className={activeLink === 'commands' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('commands')}>Commands</Nav.Link>
            <Nav.Link href="/faq" className={activeLink === 'faq' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('faq')}>FAQ</Nav.Link>
            <Nav.Link href="/journey" className={activeLink === 'journey' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('journey')}>Journey</Nav.Link>
          </Nav>
          <span className="navbar-text">
            <div className="social-icon" style={{ marginRight: "18px" }}>
              <a href={channelUrl}><img src={navIcon1} alt="" /></a>
            </div>
            {user ?
              (
                <>
                  <span className="fw-bold text-white">Hi, {user.username}</span>
                  <HashLink>
                    <button className="vvd" onClick={logout}><span>Logout</span></button>
                  </HashLink>
                </>
              ) :
              (
                <HashLink to='#home'>
                  <button className="vvd" onClick={redirectToDiscordAuth}><span>Join</span></button>
                </HashLink>
              )}
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
