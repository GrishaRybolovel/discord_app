import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "../components/NavBar";
import { Banner } from "../components/Banner";
import { Features } from "../components/Features";
import { Invite } from "../components/Invite";
import { Footer } from "../components/Footer";
import React, { useEffect } from 'react';
import { useUser } from "../components/UserContext";

const Home = () => {
  const { user, login, logout, refreshUserData } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        try {
          await refreshUserData();
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    fetchData();
  }, []);

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
