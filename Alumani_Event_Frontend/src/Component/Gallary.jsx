import React from 'react';

const Gallery = () => {
  const images = [
    { src: "src/assets/class.jpg", alt: "Image 1", year: "2020" },
    { src: "src/assets/photo2.jpg", alt: "Image 2", year: "2021" },
    { src: "src/assets/P1.jpg", alt: "Image 3", year: "2022" },
    { src: "src/assets/img2.jpg", alt: "Image 4", year: "2023" },
    { src: "src/assets/P2.jpg", alt: "Image 5", year: "2024" },
    { src: "src/assets/party.jpg", alt: "Image 6", year: "2025" },
  ];

  return (
    <div className="container mt-5 pt-3">
      <h2 className="text-3xl font-bold text-primary text-center mb-5">Gallery</h2>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {images.map((image, index) => (
          <div key={index} className="col">
            <div className="card h-100 shadow-sm">
              <img
                src={image.src}
                alt={image.alt}
                className="card-img-top object-cover h-64 w-100"
              />
              <div className="card-body text-center">
                <p className="card-text text-muted">Year: {image.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
