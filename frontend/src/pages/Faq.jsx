import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { FaqTable } from "../components/FaqTable";
import React from 'react';

const Commands = () => {
    return (
      <div className="App">
        <NavBar />
        <FaqTable />
        <Footer />
      </div>
    );
  };

export default Commands;
