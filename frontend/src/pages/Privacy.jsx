import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { PrivacyContent } from '../components/PrivacyContent';
import React from 'react';

const Privacy = () => {
    return (
        <div className="App">
            <NavBar />
            <section className="project" id="projects">
                <div className="flex flex-col gap-16 mb-16 text-left">
                    <div class="flex flex-col">
                        <p class="font-extrabold text-text-primary text-left __className_cc3d07 max-w-screen-sm" weight="extrabold" style={{fontSize: "48px"}}>Privacy Policy for the Website</p>
                        <p class="font-normal text-text-secondary text-left __className_af19bf text-[14px] md:text-[16px]" color="secondary">Updated August 29th, 2024</p>
                    </div>
                    <PrivacyContent />
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Privacy;
