import React from 'react';
import './Gallery.css'; // Make sure the filename is spelled correctly!
import image from '../assets/Alumni1.jpg'; 
import image1 from '../assets/alumani2.jpg'; 
import image2 from '../assets/alumani3.jpg'; 

const Gallery = () => {
  const images = [
    { src: "src/assets/class.jpg", alt: "Image 1", year: "2021" },
    { src: "src/assets/photo2.jpg", alt: "Image 2", year: "2020" },
    { src: "src/assets/P1.jpg", alt: "Image 3", year: "2019" },
    { src: "src/assets/img2.jpg", alt: "Image 4", year: "2022" },
    { src: "src/assets/P2.jpg", alt: "Image 5", year: "2023" },
    { src: "src/assets/party.jpg", alt: "Image 6", year: "2021" },
  ];

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
