import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "../components/NavBar";
import { Banner } from "../components/Banner";
import { Features } from "../components/Features";
import { Invite } from "../components/Invite";
import { Footer } from "../components/Footer";
import React from 'react';

const Home = () => {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <Features />
      <Invite />
      <Footer />
    </div>
  );
}

export default Home;
