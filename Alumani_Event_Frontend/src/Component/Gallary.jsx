import React from 'react';
import './Gallery.css'; // Make sure the filename is spelled correctly!
import image from '../assets/Alumni1.jpg'; 
import image1 from '../assets/alumani2.jpg'; 
import image2 from '../assets/alumani3.jpg'; 

const Gallery = () => {
  return (
    <div className="gallery-container mt-5 pt-3 px-4">
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100 gallery-img" src={image} alt="First slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100 gallery-img" src={image1} alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100 gallery-img" src={image2} alt="Third slide" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Gallery;
