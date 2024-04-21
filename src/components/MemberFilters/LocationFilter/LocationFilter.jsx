import React, { useState } from 'react';
import './LocationFilter.scss';

const LocationFilter = ({ onSelectionChange }) => {
  const [locations, setLocations] = useState({
    USA: false,
    CA: false
  });
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setLocations(prevLocations => ({
      ...prevLocations,
      [name]: checked
    }));

    onSelectionChange(name, checked);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="location-filter">
      <div className="filter-section">
        <h3 onClick={toggleCollapse}>Location</h3>
        {!isCollapsed && ( 
          <>
            <div>
              <input
                id="location-usa"
                type="checkbox"
                name="USA"
                checked={locations.USA}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="location-usa">USA</label>
            </div>
            <div>
              <input
                id="location-ca"
                type="checkbox"
                name="CA"
                checked={locations.CA}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="location-ca">CA</label>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LocationFilter;
