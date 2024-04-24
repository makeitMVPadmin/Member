import React, { useState } from 'react';
import './FilterComponent.scss';

import RoleFilter from '../FilterComponent/RoleFilter/RoleFilter';
//import LocationFilter from '../FilterComponent/LocationFilter/LocationFilter';

const FilterComponent = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  <RoleFilter onChange={(selectedRoles) => console.log(selectedRoles)} />


  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`filter-component ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      <h2 onClick={toggleCollapse}>Filters</h2>
      {!isCollapsed && (
        <div>
          { <RoleFilter /> }
          {/* <IndustryFilter onChange={handleIndustryChange} selectedOptions={selectedIndustry} /> */}
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
