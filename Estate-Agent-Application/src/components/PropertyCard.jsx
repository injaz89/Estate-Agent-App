import React from 'react';
import { Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { useFavourites } from '../FavouritesContext';
import { formatPrice } from '../utils/searchFilters';

const PropertyCard = ({ property }) => {
  const { addFavourite, isFavourite } = useFavourites();

  // Configure drag behavior for this property
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PROPERTY',
    item: { property },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  // Handle favourite button click
  const handleFavouriteClick = (e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();
    addFavourite(property);
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
            src={property.images[0]}
            alt={property.shortDescription}
            loading="lazy"
          />
          <button
            className={`favourite-btn ${isAlreadyFavourite ? 'active' : ''}`}
            onClick={handleFavouriteClick}
            aria-label={isAlreadyFavourite ? 'Already in favourites' : 'Add to favourites'}
            title={isAlreadyFavourite ? 'Already in favourites' : 'Add to favourites'}
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