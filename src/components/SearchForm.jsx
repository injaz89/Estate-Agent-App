import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


// SearchForm Component
// Uses React Widgets for all form inputs to enhance UX
// Handles multi-criteria property search
 
const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    type: null,
    minPrice: null,
    maxPrice: null,
    minBedrooms: null,
    maxBedrooms: null,
    postcodeArea: null,
    dateAdded: null,
  });

  // Options for property type dropdown
  const typeOptions = [
    { value: 'any', label: 'Any' },
    { value: 'house', label: 'House' },
    { value: 'flat', label: 'Flat' },
  ];

  // Options for price dropdowns (in thousands)
  const priceOptions = [
    { value: 0, label: 'No Min/Max' },
    { value: 100000, label: '£100,000' },
    { value: 200000, label: '£200,000' },
    { value: 300000, label: '£300,000' },
    { value: 400000, label: '£400,000' },
    { value: 500000, label: '£500,000' },
    { value: 600000, label: '£600,000' },
    { value: 700000, label: '£700,000' },
    { value: 800000, label: '£800,000' },
    { value: 900000, label: '£900,000' },
    { value: 1000000, label: '£1,000,000' },
  ];

  // Options for bedroom dropdowns
  const bedroomOptions = [
    { value: 0, label: 'No Min/Max' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6+' },
  ];

  
  // Sri Lankan postcode areas
  const postcodeOptions = [
    { value: '', label: 'All Areas' },
    { value: '10400', label: '10400 - Colombo 3' },
    { value: '00700', label: '00700 - Rajagiriya' },
    { value: '20000', label: '20000 - Kandy' },
    { value: '00300', label: '00300 - Colombo 2' },
    { value: '80000', label: '80000 - Galle' },
    { value: '00500', label: '00500 - Colombo 7' },
    { value: '00400', label: '00400 - Colombo 4' },
  ];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Build filters object (only include non-null values)
    const filters = {
      type: formData.type?.value || 'any',
      minPrice: formData.minPrice?.value || 0,
      maxPrice: formData.maxPrice?.value || 0,
      minBedrooms: formData.minBedrooms?.value || 0,
      maxBedrooms: formData.maxBedrooms?.value || 0,
      postcodeArea: formData.postcodeArea?.value || '',
      dateAdded: formData.dateAdded || null,
    };

    onSearch(filters);
  };

  // Custom styles for react-select (matches site theme)
  const selectStyles = {
    control: (base) => ({
      ...base,
      minHeight: '45px',
      borderColor: '#ddd',
      '&:hover': {
        borderColor: '#0066cc',
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#0066cc' : state.isFocused ? '#e6f2ff' : 'white',
      color: state.isSelected ? 'white' : '#333',
    }),
  };

  return (
    <form onSubmit={handleSubmit} className="search-form" aria-label="Property search form">
      <div className="form-grid">
        {/* Property Type */}
        <div className="form-group">
          <label htmlFor="property-type">Property Type</label>
          <Select
            inputId="property-type"
            options={typeOptions}
            value={formData.type}
            onChange={(selected) => setFormData({ ...formData, type: selected })}
            styles={selectStyles}
            placeholder="Select type..."
            isClearable
            aria-label="Select property type"
          />
        </div>

        {/* Min Price */}
        <div className="form-group">
          <label htmlFor="min-price">Min Price</label>
          <Select
            inputId="min-price"
            options={priceOptions}
            value={formData.minPrice}
            onChange={(selected) => setFormData({ ...formData, minPrice: selected })}
            styles={selectStyles}
            placeholder="No min"
            isClearable
            aria-label="Select minimum price"
          />
        </div>

        {/* Max Price */}
        <div className="form-group">
          <label htmlFor="max-price">Max Price</label>
          <Select
            inputId="max-price"
            options={priceOptions}
            value={formData.maxPrice}
            onChange={(selected) => setFormData({ ...formData, maxPrice: selected })}
            styles={selectStyles}
            placeholder="No max"
            isClearable
            aria-label="Select maximum price"
          />
        </div>

        {/* Min Bedrooms */}
        <div className="form-group">
          <label htmlFor="min-bedrooms">Min Bedrooms</label>
          <Select
            inputId="min-bedrooms"
            options={bedroomOptions}
            value={formData.minBedrooms}
            onChange={(selected) => setFormData({ ...formData, minBedrooms: selected })}
            styles={selectStyles}
            placeholder="No min"
            isClearable
            aria-label="Select minimum bedrooms"
          />
        </div>

        {/* Max Bedrooms */}
        <div className="form-group">
          <label htmlFor="max-bedrooms">Max Bedrooms</label>
          <Select
            inputId="max-bedrooms"
            options={bedroomOptions}
            value={formData.maxBedrooms}
            onChange={(selected) => setFormData({ ...formData, maxBedrooms: selected })}
            styles={selectStyles}
            placeholder="No max"
            isClearable
            aria-label="Select maximum bedrooms"
          />
        </div>

        {/* Postcode Area */}
        <div className="form-group">
          <label htmlFor="postcode-area">Postcode Area</label>
          <Select
            inputId="postcode-area"
            options={postcodeOptions}
            value={formData.postcodeArea}
            onChange={(selected) => setFormData({ ...formData, postcodeArea: selected })}
            styles={selectStyles}
            placeholder="All areas"
            isClearable
            aria-label="Select postcode area"
          />
        </div>

        {/* Date Added */}
        <div className="form-group">
          <label htmlFor="date-added">Added After</label>
          <DatePicker
            id="date-added"
            selected={formData.dateAdded}
            onChange={(date) => setFormData({ ...formData, dateAdded: date })}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select date..."
            className="date-picker-input"
            isClearable
            maxDate={new Date()}
            aria-label="Select date added after"
          />
        </div>

        {/* Search Button */}
        <div className="form-group form-submit">
          <button type="submit" className="btn btn-primary" aria-label="Search properties">
            Search Properties
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;