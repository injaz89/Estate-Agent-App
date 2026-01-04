import React from 'react';
import { Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { useFavourites } from '../FavouritesContext';
import { formatPrice } from '../utils/searchFilters';

 // Displays individual property in search results
 // Drag-and-drop to favourites and toggle favourite button
 
const PropertyCard = ({ property }) => {
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();

  // Helper function to get correct image path
  const getImagePath = (imagePath) => {
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    return `${import.meta.env.BASE_URL}${cleanPath}`;
  };

  // Configure drag behavior for this property
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PROPERTY',
    item: { property },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  // Handle favourite button click - TOGGLE functionality
  const handleFavouriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAlreadyFavourite) {
      removeFavourite(property.id);
    } else {
      addFavourite(property);
    }
  };

  const isAlreadyFavourite = isFavourite(property.id);

  return (
    <div
      ref={drag}
      className={`property-card ${isDragging ? 'dragging' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <Link to={`/property/${property.id}`} className="property-link">
        {/* Property Image */}
        <div className="property-image">
          <img
            src={getImagePath(property.images[0])}
            alt={property.shortDescription}
            loading="lazy"
          />
          <button
            className={`favourite-btn ${isAlreadyFavourite ? 'active' : ''}`}
            onClick={handleFavouriteClick}
            aria-label={isAlreadyFavourite ? 'Remove from favourites' : 'Add to favourites'}
            title={isAlreadyFavourite ? 'Remove from favourites' : 'Add to favourites'}
          >
            <span className="heart-icon">{isAlreadyFavourite ? '❤️' : '🤍'}</span>
          </button>
        </div>

        {/* Property Details */}
        <div className="property-details">
          <h3 className="property-price">{formatPrice(property.price)}</h3>
          <p className="property-description">{property.shortDescription}</p>
          <div className="property-info">
            <span className="info-item">
              <strong>{property.bedrooms}</strong> bed
            </span>
            <span className="info-item">
              <strong>{property.type}</strong>
            </span>
            <span className="info-item">
              <strong>{property.postcode}</strong>
            </span>
          </div>
          <p className="property-location">{property.location}</p>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;