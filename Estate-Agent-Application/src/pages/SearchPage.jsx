import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SearchForm from '../components/SearchForm';
import PropertyCard from '../components/PropertyCard';
import FavouritesList from '../components/FavouritesList';
import propertiesData from '../data/properties.json';
import { searchProperties } from '../utils/searchFilters';

// SearchPage Component
// Main page containing search form, results, and favourites panel
 
const SearchPage = () => {
  const [properties] = useState(propertiesData);
  const [searchResults, setSearchResults] = useState(propertiesData);
  const [hasSearched, setHasSearched] = useState(false);

  // Handle search form submission
  const handleSearch = (filters) => {
    const results = searchProperties(properties, filters);
    setSearchResults(results);
    setHasSearched(true);
  };

  // Handle clear filters - reset to show all properties
  const handleClearFilters = () => {
    setSearchResults(propertiesData);
    setHasSearched(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="search-page">
        {/* Page Header */}
        <header className="page-header">
          <h1>🏡 Find Your Dream Home</h1>
          <p className="subtitle">✨ Discover {properties.length} amazing properties waiting for you ✨</p>
        </header>

        {/* Main Content Grid */}
        <div className="search-layout">
          {/* Left Column: Search Form and Results */}
          <div className="main-column">
            {/* Search Form */}
            <section className="search-section">
              <div className="search-header">
                <h2>Search Properties</h2>
                {hasSearched && (
                  <button 
                    className="btn btn-clear-filters" 
                    onClick={handleClearFilters}
                    aria-label="Clear all filters"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
              <SearchForm onSearch={handleSearch} />
            </section>

            {/* Search Results */}
            <section className="results-section">
              {hasSearched && (
                <div className="results-header">
                  <h2>
                    {searchResults.length === 0 ? 'No properties found' : `${searchResults.length} ${searchResults.length === 1 ? 'property' : 'properties'} found`}
                  </h2>
                  {searchResults.length === 0 && (
                    <p className="no-results-message">
                      Try adjusting your search criteria
                    </p>
                  )}
                </div>
              )}

              <div className="properties-grid">
                {searchResults.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Favourites Panel */}
          <aside className="sidebar-column">
            <FavouritesList />
          </aside>
        </div>
      </div>
    </DndProvider>
  );
};

export default SearchPage;