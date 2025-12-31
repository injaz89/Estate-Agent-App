import React from 'react';
import { Link } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import { useFavourites } from '../FavouritesContext';
import { formatPrice } from '../utils/searchFilters';


const FavouritesList = () => {
  const { favourites, addFavourite, removeFavourite, clearFavourites } = useFavourites();

  // Configure drop zone for accepting dragged properties
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'PROPERTY',
    drop: (item) => {
      addFavourite(item.property);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  // Handle remove button click
  const handleRemove = (propertyId, e) => {
    e.preventDefault();
    e.stopPropagation();
    removeFavourite(propertyId);
  };

  return (
    <div
      ref={drop}
      className={`favourites-panel ${isOver ? 'drag-over' : ''}`}
    >
      <div className="favourites-header">
        <h2>
          Favourites
          {favourites.length > 0 && <span className="count">({favourites.length})</span>}
        </h2>
        {favourites.length > 0 && (
          <button
            className="btn btn-clear"
            onClick={clearFavourites}
            aria-label="Clear all favourites"
          >
            Clear All
          </button>
        )}
      </div>

      {favourites.length === 0 ? (
        <div className="favourites-empty">
          <p>No favourites yet</p>
          <p className="hint">Drag properties here or click the heart icon</p>
        </div>
      ) : (
        <div className="favourites-list">
          {favourites.map((property) => (
            <div key={property.id} className="favourite-item">
              <Link to={`/property/${property.id}`} className="favourite-link">
                <img
                  src={property.images[0]}
                  alt={property.shortDescription}
                  className="favourite-thumb"
                />
                <div className="favourite-info">
                  <p className="favourite-price">{formatPrice(property.price)}</p>
                  <p className="favourite-location">{property.location}</p>
                  <p className="favourite-beds">{property.bedrooms} bed {property.type}</p>
                </div>
              </Link>
              <button
                className="btn-remove"
                onClick={(e) => handleRemove(property.id, e)}
                aria-label={`Remove ${property.location} from favourites`}
                title="Remove from favourites"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {isOver && (
        <div className="drop-indicator">
          Drop here to add to favourites
        </div>
      )}
    </div>
  );
};

export default FavouritesList;