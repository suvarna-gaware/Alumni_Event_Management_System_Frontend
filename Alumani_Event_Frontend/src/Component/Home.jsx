import React from "react";
import './Home.css';
import bgVideo from "../assets/alumnievent.mp4";

const Home = () => {
  return (
    <section className="home-section position-relative text-white">
      <video autoPlay muted loop className="bg-video">
        <source src={bgVideo} type="video/mp4" />
      
      </video>

      <div className="overlay d-flex flex-column justify-content-center align-items-center text-center">
        <div className="container">
          <h1 className="display-4 fw-bold">Welcome to Alumni EMS</h1>
          <p className="lead">Connect | Celebrate | Grow</p>
          {/* <a href="#events" className="btn btn-light mt-3 px-4 py-2 fw-semibold rounded-pill">
            Explore Events
          </a> */}
        </div>
        
      </div>
    
    </section>
    
  );
};

export default Home;
