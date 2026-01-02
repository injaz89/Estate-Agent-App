import React, { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { Link } from 'react-router-dom';
import { useFavourites } from '../FavouritesContext';
import { formatPrice } from '../utils/searchFilters';

/**
 * FavouritesList Component
 * Displays saved properties with drag-and-drop support
 * Allows removal via button click or dragging out
 */
const FavouritesList = () => {
  const { favourites, addFavourite, removeFavourite, clearFavourites } = useFavourites();
  const panelRef = useRef(null);

  // Configure drop zone for accepting dragged properties FROM property cards
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'PROPERTY',
    drop: (item) => {
      addFavourite(item.property);
      return { dropped: true };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  // Combine refs
  const setRef = (element) => {
    panelRef.current = element;
    drop(element);
  };

  // Handle clear all favourites
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all favourites?')) {
      clearFavourites();
    }
  };

  return (
    <div
      ref={setRef}
      className={`favourites-panel ${isOver && canDrop ? 'drag-over' : ''}`}
    >
      {/* Header */}
      <div className="favourites-header">
        <h2>
          My Favourites <span className="count">({favourites.length})</span>
        </h2>
        {favourites.length > 0 && (
          <button
            className="btn btn-clear"
            onClick={handleClearAll}
            aria-label="Clear all favourites"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Empty State */}
      {favourites.length === 0 ? (
        <div className="favourites-empty">
          <p>No favourites yet</p>
          <p className="hint">
            {isOver && canDrop
              ? '📍 Drop here to save'
              : '🏡 Drag properties here or click the heart icon'}
          </p>
        </div>
      ) : (
        /* Favourites List */
        <div className="favourites-list">
          {favourites.map((property) => (
            <FavouriteItem
              key={property.id}
              property={property}
              onRemove={removeFavourite}
            />
          ))}
        </div>
      )}

      {/* Drop indicator when dragging over */}
      {isOver && canDrop && favourites.length > 0 && (
        <div className="drop-indicator">Drop to add to favourites</div>
      )}
    </div>
  );
};

/**
 * FavouriteItem Component
 * Individual favourite property with drag-out and remove functionality
 */
const FavouriteItem = ({ property, onRemove }) => {
  const itemRef = useRef(null);

  // Configure drag for REMOVING items (drag out of favourites panel)
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FAVOURITE_ITEM',
    item: { propertyId: property.id },
    end: (item, monitor) => {
      // If dropped outside any drop target, remove from favourites
      if (!monitor.didDrop()) {
        onRemove(property.id);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  // Connect drag ref
  const setRef = (element) => {
    itemRef.current = element;
    drag(element);
  };

  // Handle remove button click - FIXED
  const handleRemoveClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove(property.id);
  };

  return (
    <div
      ref={setRef}
      className="favourite-item"
      style={{ 
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
    >
      <Link to={`/property/${property.id}`} className="favourite-link">
        <img
          src={property.images[0]}
          alt={property.shortDescription}
          className="favourite-thumb"
        />
        <div className="favourite-info">
          <div className="favourite-price">{formatPrice(property.price)}</div>
          <div className="favourite-location">{property.location}</div>
          <div className="favourite-beds">
            {property.bedrooms} bed {property.type}
          </div>
        </div>
      </Link>
      
      {/* Remove Button - NOW WORKING */}
      <button
        className="btn-remove"
        onClick={handleRemoveClick}
        onMouseDown={(e) => e.stopPropagation()}
        aria-label={`Remove ${property.shortDescription} from favourites`}
        title="Remove from favourites"
      >
        ✕
      </button>
    </div>
  );
};

export default FavouritesList;