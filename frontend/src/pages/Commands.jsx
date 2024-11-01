import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { CommandTable } from "../components/CommandTable";
import React from 'react';

const Commands = () => {
    return (
      <div className="App">
        <NavBar />
        <CommandTable />
        <Footer />
      </div>
    );
  };

export default Commands;
