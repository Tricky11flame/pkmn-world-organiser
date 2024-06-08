import React from 'react';

const FilterBar = ({ filters, onFilterChange }) => {
  const handleFilterChange = (filterType, event) => {
    const value = event.target.value;

    if (/^\d+$/.test(value) || (value =="")) {
        // stage filter 
        onFilterChange(filterType, value === "" ? null : parseInt(value));
      } else {
        // other filters 
        onFilterChange(filterType, value);
      }
  };



  return (
    <div className="flex justify-between mb-4">
      <div>
        <label htmlFor="cat">Category:</label>
        <select id="cat" value={filters.cat} onChange={(e) => handleFilterChange('cat', e)}>
          <option value="">All</option>
          <option value="prey">Prey</option>
          <option value="predator">Predator</option>
          <option value="omni">Omni</option>
        </select>
      </div>
      <div>
        <label htmlFor="habitat">Habitat:</label>
        <select id="habitat" value={filters.habitat} onChange={(e) => handleFilterChange('habitat', e)}>
          <option value="">All</option>
          <option value="field">Field</option>
          <option value="forest">Forest</option>
          <option value="water">Water</option>
        </select>
      </div>
      <div>
        <label htmlFor="stage">Stage:</label>
        <select id="stage" value={filters.stage === null ? '' : filters.stage.toString()} onChange={(e) => handleFilterChange('stage', e)}>
          <option value="">All</option>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
