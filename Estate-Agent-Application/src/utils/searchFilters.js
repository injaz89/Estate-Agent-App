/**
 * Search filter utilities for property search functionality
 * Handles multi-criteria filtering with optional parameters
 */

/**
 * Main search function that applies all filters to properties
 * @param {Array} properties - Array of property objects
 * @param {Object} filters - Filter criteria object
 * @returns {Array} Filtered array of properties
 */
export const searchProperties = (properties, filters) => {
  let results = [...properties];

  // Filter by property type
  if (filters.type && filters.type !== 'any') {
    results = results.filter(
      property => property.type.toLowerCase() === filters.type.toLowerCase()
    );
  }

  // Filter by minimum price
  if (filters.minPrice && filters.minPrice > 0) {
    results = results.filter(property => property.price >= filters.minPrice);
  }

  // Filter by maximum price
  if (filters.maxPrice && filters.maxPrice > 0) {
    results = results.filter(property => property.price <= filters.maxPrice);
  }

  // Filter by minimum bedrooms
  if (filters.minBedrooms && filters.minBedrooms > 0) {
    results = results.filter(property => property.bedrooms >= filters.minBedrooms);
  }

  // Filter by maximum bedrooms
  if (filters.maxBedrooms && filters.maxBedrooms > 0) {
    results = results.filter(property => property.bedrooms <= filters.maxBedrooms);
  }

  // Filter by postcode area (first part of postcode)
  if (filters.postcodeArea && filters.postcodeArea.trim() !== '') {
    results = results.filter(property =>
      property.postcode.toLowerCase().startsWith(filters.postcodeArea.toLowerCase().trim())
    );
  }

  // Filter by date added
  if (filters.dateAdded) {
    const filterDate = new Date(filters.dateAdded);
    results = results.filter(property => {
      const propertyDate = new Date(property.dateAdded);
      return propertyDate >= filterDate;
    });
  }

  // Filter by date range (if both dates provided)
  if (filters.dateFrom && filters.dateTo) {
    const fromDate = new Date(filters.dateFrom);
    const toDate = new Date(filters.dateTo);
    results = results.filter(property => {
      const propertyDate = new Date(property.dateAdded);
      return propertyDate >= fromDate && propertyDate <= toDate;
    });
  }

  return results;
};

/**
 * Validates if property matches a single filter criterion
 * Used for testing individual filter logic
 */
export const matchesFilter = (property, filterType, filterValue) => {
  switch (filterType) {
    case 'type':
      return filterValue === 'any' || property.type.toLowerCase() === filterValue.toLowerCase();
    case 'minPrice':
      return property.price >= filterValue;
    case 'maxPrice':
      return property.price <= filterValue;
    case 'minBedrooms':
      return property.bedrooms >= filterValue;
    case 'maxBedrooms':
      return property.bedrooms <= filterValue;
    case 'postcodeArea':
      return property.postcode.toLowerCase().startsWith(filterValue.toLowerCase());
    case 'dateAdded':
      return new Date(property.dateAdded) >= new Date(filterValue);
    default:
      return true;
  }
};

/**
 * Format price for display (e.g., 450000 -> £450,000)
 */
export const formatPrice = (price) => {
  return `£${price.toLocaleString('en-GB')}`;
};

/**
 * Format date for display
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};