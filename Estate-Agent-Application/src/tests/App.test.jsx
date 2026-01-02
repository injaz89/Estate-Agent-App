import { describe, it, expect } from 'vitest';
import { searchProperties, matchesFilter, formatPrice } from '../utils/searchFilters';

// Test Suite for Property Search Application

// Sample test data
const testProperties = [
  {
    id: 1,
    type: 'House',
    price: 450000,
    bedrooms: 3,
    dateAdded: '2024-11-15',
    postcode: 'BR1',
    location: 'Bromley, London',
  },
  {
    id: 2,
    type: 'Flat',
    price: 280000,
    bedrooms: 2,
    dateAdded: '2024-12-01',
    postcode: 'NW1',
    location: 'Camden, London',
  },
  {
    id: 3,
    type: 'House',
    price: 750000,
    bedrooms: 4,
    dateAdded: '2024-10-20',
    postcode: 'SW15',
    location: 'Putney, London',
  },
];

describe('Search Functionality Tests', () => {
  
   // Test 1: Property Type Filtering
   // Ensures search correctly filters by property type
    
  it('should filter properties by type correctly', () => {
    const filters = { type: 'house' };
    const results = searchProperties(testProperties, filters);
    
    expect(results).toHaveLength(2);
    expect(results.every(p => p.type.toLowerCase() === 'house')).toBe(true);
  });

  
    // Test 2: Price Range Filtering
    // Verifies min and max price filtering logic
   
  it('should filter properties by price range', () => {
    const filters = { minPrice: 300000, maxPrice: 500000 };
    const results = searchProperties(testProperties, filters);
    
    expect(results).toHaveLength(1);
    expect(results[0].price).toBe(450000);
    expect(results.every(p => p.price >= 300000 && p.price <= 500000)).toBe(true);
  });

  
    // Test 3: Bedroom Filtering
    // Tests filtering by bedroom count

  it('should filter properties by bedroom count', () => {
    const filters = { minBedrooms: 3 };
    const results = searchProperties(testProperties, filters);
    
    expect(results).toHaveLength(2);
    expect(results.every(p => p.bedrooms >= 3)).toBe(true);
  });

  // Test 4: Postcode Area Filtering
    // Ensures postcode prefix matching works correctly
   
  it('should filter properties by postcode area', () => {
    const filters = { postcodeArea: 'NW' };
    const results = searchProperties(testProperties, filters);
    
    expect(results).toHaveLength(1);
    expect(results[0].postcode).toBe('NW1');
  });

  
   // Test 5: Date Filtering
    // Verifies properties are filtered by date added
   
  it('should filter properties by date added', () => {
    const filters = { dateAdded: '2024-11-01' };
    const results = searchProperties(testProperties, filters);
    
    // Should return properties added on or after Nov 1, 2024
    expect(results).toHaveLength(2);
    expect(results.every(p => new Date(p.dateAdded) >= new Date('2024-11-01'))).toBe(true);
  });
});

describe('Multi-Criteria Search Tests', () => {
  
   // Test 6: Combined Filters
   // Tests search with multiple criteria applied simultaneously

  it('should handle multiple search criteria correctly', () => {
    const filters = {
      type: 'house',
      minPrice: 400000,
      maxPrice: 800000,
      minBedrooms: 3,
    };
    const results = searchProperties(testProperties, filters);
    
    expect(results).toHaveLength(2);
    expect(results.every(p => 
      p.type.toLowerCase() === 'house' &&
      p.price >= 400000 &&
      p.price <= 800000 &&
      p.bedrooms >= 3
    )).toBe(true);
  });

  // Test 7: Empty Results
  // Ensures search returns empty array when no matches found

  it('should return empty array when no properties match criteria', () => {
    const filters = { minPrice: 1000000 };
    const results = searchProperties(testProperties, filters);
    
    expect(results).toHaveLength(0);
    expect(Array.isArray(results)).toBe(true);
  });
});

describe('Utility Functions Tests', () => {
  
  //  Test 8: Price Formatting
  // Verifies price is correctly formatted with currency symbol and commas
  it('should format price correctly', () => {
    expect(formatPrice(450000)).toBe('£450,000');
    expect(formatPrice(1000000)).toBe('£1,000,000');
    expect(formatPrice(95000)).toBe('£95,000');
  });

  // Test 9: Single Filter Matching
   // Tests individual filter logic
  it('should correctly match single filter criteria', () => {
    const property = testProperties[0];
    
    expect(matchesFilter(property, 'type', 'house')).toBe(true);
    expect(matchesFilter(property, 'type', 'flat')).toBe(false);
    expect(matchesFilter(property, 'minPrice', 400000)).toBe(true);
    expect(matchesFilter(property, 'maxPrice', 500000)).toBe(true);
  });
});

describe('Favourites Duplicate Prevention', () => {

    //Test 10: Duplicate Prevention Logic 
    //Simulates the duplicate prevention in favourites
   
  it('should prevent duplicate properties in favourites', () => {
    const favourites = [testProperties[0]];
    const newProperty = testProperties[0]; // Same property
    
    // Check if property already exists
    const exists = favourites.some(fav => fav.id === newProperty.id);
    
    expect(exists).toBe(true);
    
    // If implementing add logic, favourites shouldn't change
    const updatedFavourites = exists ? favourites : [...favourites, newProperty];
    expect(updatedFavourites).toHaveLength(1);
  });
});