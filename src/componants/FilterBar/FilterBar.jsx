
import { useState } from 'react';
import FilterIcon from '/icons/filter-icon-ae3ca08c.svg';
import './FilterBar.css';
import PropTypes from 'prop-types';


FilterBar.propTypes = {
  filters: PropTypes.shape({
    productsPerPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Accept both number and string
    priceRange: PropTypes.string,
    sort: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};



export default function FilterBar({ filters, onFilterChange }) {
  const [showFilters, setShowFilters] = useState(true);

  const handleCategoryChange = (event) => {
    onFilterChange('category', event.target.value);
  };

  const handleSortChange = (event) => {
    onFilterChange('sort', event.target.value);
  };

  const handleProductsPerPageChange = (event) => {
    onFilterChange('productsPerPage', event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    onFilterChange('priceRange', event.target.value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <>
      <div className="filter-section">
        <div className="filter-icons">
          <img className='filterIcon' src={FilterIcon} alt="Filter Icon" onClick={toggleFilters} style={{ cursor: 'pointer', marginRight: '8px' }} />
          <span onClick={toggleFilters} style={{ cursor: 'pointer' }}>Filter</span>
          <i className="fas fa-th-large"></i>
          <i className="fas fa-list"></i>
          <span className="results-info">Showing 1-8 of results</span>
        </div>
        {showFilters && (
          <div className="show-short">
            <span>Show</span>
            <select onChange={handleProductsPerPageChange} value={filters.productsPerPage}>
              <option value="8">8</option>
              <option value="10">10</option>
              <option value="12">12</option>
              <option value="16">16</option>
            </select>
            <span>Sort by</span>
            <select onChange={handleSortChange} value={filters.sort}>
              <option value="name-asc">Sort By Name A-Z</option>
              <option value="name-desc">Sort By Name Z-A</option>
            </select>
            <span>Category</span>
            <select className="dropdown-select" onChange={handleCategoryChange} value={filters.category}>
              <option value="">Select Category</option>
              <option value="jewelery">Jewelry</option>
              <option value="electronics">Electronics</option>
              <option value="women's clothing">Women&apos;s Wear</option>
              <option value="men's clothing">Men&apos;s Wear</option>
            </select>
            <span>Price</span>
            <select className="dropdown-select" value={filters.priceRange} onChange={handlePriceRangeChange}>
              <option value="">Select Price Range</option>
              <option value="0-50">$0 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100-200">$100 - $200</option>
              <option value="200-100000">$200 and above</option>
            </select>
          </div>
        )}
      </div>
    </>
  );
}
