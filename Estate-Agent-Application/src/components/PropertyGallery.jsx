import React, { useState } from 'react';


const PropertyGallery = ({ images, altText }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Navigate to previous image
  const goToPrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Navigate to next image
  const goToNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Handle keyboard navigation
  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedImage(index);
    }
  };

  return (
    <div className="property-gallery">
      {/* Main Image Display */}
      <div className="gallery-main">
        <button
          className="gallery-nav prev"
          onClick={goToPrevious}
          aria-label="Previous image"
        >
          ‹
        </button>
        <img
          src={images[selectedImage]}
          alt={`${altText} - Image ${selectedImage + 1}`}
          className="main-image"
        />
        <button
          className="gallery-nav next"
          onClick={goToNext}
          aria-label="Next image"
        >
          ›
        </button>
        <div className="image-counter">
          {selectedImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="gallery-thumbnails">
        {images.map((image, index) => (
          <div
            key={index}
            className={`thumbnail ${index === selectedImage ? 'active' : ''}`}
            onClick={() => setSelectedImage(index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            role="button"
            tabIndex={0}
            aria-label={`View image ${index + 1}`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyGallery;