import React, { useState } from 'react';
import './FilterComponent.scss';

import RoleFilter from './MemberFilters/RoleFilter';

const FilterComponent = ({ filterUsersByRole }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`filter-component ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      <h2 onClick={toggleCollapse}>Filters</h2>
      {!isCollapsed && (
        <div>
          {<RoleFilter filterUsersByRole={filterUsersByRole} />}
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
