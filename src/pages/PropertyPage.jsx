import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PropertyGallery from '../components/PropertyGallery';
import { useFavourites } from '../FavouritesContext';
import propertiesData from '../data/properties.json';
import { formatPrice, formatDate } from '../utils/searchFilters';

  // PropertyPage Component
 // Detailed view of individual property with image path fixes
 
const PropertyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();

  // Helper function to get correct image path
  const getImagePath = (imagePath) => {
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    return `${import.meta.env.BASE_URL}${cleanPath}`;
  };

  // Find property by ID
  const property = propertiesData.find((p) => p.id === parseInt(id));

  if (!property) {
    return (
      <div className="property-page error-page">
        <div className="error-content">
          <h1>Property Not Found</h1>
          <p>The property you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary">
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  const isInFavourites = isFavourite(property.id);

  const handleFavouriteToggle = () => {
    if (isInFavourites) {
      removeFavourite(property.id);
    } else {
      addFavourite(property);
    }
  };

  return (
    <div className="property-page">
      <nav className="property-nav">
        <button onClick={() => navigate(-1)} className="btn-back">
          ← Back to Results
        </button>
        <Link to="/" className="btn-home">
          Home
        </Link>
      </nav>

      <div className="property-header">
        <div className="header-content">
          <h1>{property.shortDescription}</h1>
          <p className="location">{property.location}</p>
        </div>
        <div className="header-actions">
          <h2 className="price">{formatPrice(property.price)}</h2>
          <button
            className={`btn-favourite ${isInFavourites ? 'active' : ''}`}
            onClick={handleFavouriteToggle}
          >
            {isInFavourites ? '❤️ Remove from Saved' : '🤍 Save Property'}
          </button>
        </div>
      </div>

      <div className="property-key-info">
        <div className="info-badge">
          <span className="info-label">Property Type</span>
          <span className="info-value">{property.type}</span>
        </div>
        <div className="info-badge">
          <span className="info-label">Bedrooms</span>
          <span className="info-value">{property.bedrooms}</span>
        </div>
        <div className="info-badge">
          <span className="info-label">Postcode</span>
          <span className="info-value">{property.postcode}</span>
        </div>
        <div className="info-badge">
          <span className="info-label">Added</span>
          <span className="info-value">{formatDate(property.dateAdded)}</span>
        </div>
      </div>

      <section className="gallery-section">
        <PropertyGallery images={property.images} altText={property.shortDescription} />
      </section>

      <section className="tabs-section">
        <Tabs>
          <TabList>
            <Tab>Description</Tab>
            <Tab>Floor Plan</Tab>
            <Tab>Location Map</Tab>
          </TabList>

          <TabPanel>
            <div className="tab-content description-tab">
              <h3>Property Description</h3>
              <p>{property.longDescription}</p>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="tab-content floorplan-tab">
              <h3>Floor Plan</h3>
              <img
                src={getImagePath(property.floorPlan)}
                alt="Property floor plan"
                className="floorplan-image"
              />
            </div>
          </TabPanel>

          <TabPanel>
            <div className="tab-content map-tab">
              <h3>Location</h3>
              <div className="map-container">
                <iframe
                  title={`Map showing ${property.location}`}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(property.location)}&zoom=15`}
                />
              </div>
              <p className="map-address">{property.location}</p>
            </div>
          </TabPanel>
        </Tabs>
      </section>

      
    </div>
  );
};

export default PropertyPage;