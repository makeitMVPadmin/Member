import React, { useState } from 'react';
import { useEffect } from 'react';

const RoleFilter = ({ filterUsersByRole }) => {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const roles = ['software development', 'data analytics', 'solution architect', 'web design', 'database administration', 'data engineering', 'all', 'other'];


  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    filterUsersByRole(selectedRoles);
  }, [selectedRoles])

  const toggleRole = (role) => {
    let updatedRoles;
    if (selectedRoles.includes(role)) {
      updatedRoles = selectedRoles.filter(r => r !== role);
    } else {
      updatedRoles = [...selectedRoles, role];
    }
    setSelectedRoles(updatedRoles);
  };

  return (
    <div className="role-filter">
      <div className={`filter-section ${isCollapsed ? 'collapsed' : ''}`}>
        <h3 onClick={toggleCollapse}>Role</h3>
        {!isCollapsed && (
          roles.map((role, index) => (
            <div key={index}>
              <input
                id={`role-${index}`}
                type="checkbox"
                checked={selectedRoles.includes(role)}
                onChange={() => toggleRole(role)}
              />
              <label htmlFor={`role-${index}`}>{role}</label>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RoleFilter;
