import React, { useState } from 'react';

const RoleFilter = ({ onChange }) => {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const roles = ['Software Development', 'Data Analytics', 'Solution Architect', 'Web Design', 'Database Administration', 'All', 'Other'];


  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleRole = (role) => {
    let newSelectedRoles = [];

    if (role === 'All') {
      newSelectedRoles = selectedRoles.includes('All') ? [] : [...roles];
    } else {
      if (selectedRoles.includes(role)) {
        newSelectedRoles = selectedRoles.filter(selectedRole => selectedRole !== role);
      } else {
        newSelectedRoles = [...selectedRoles, role];
      }

      if (newSelectedRoles.length < roles.length - 1) {
        newSelectedRoles = newSelectedRoles.filter(selectedRole => selectedRole !== 'All');
      }
    }

    setSelectedRoles(newSelectedRoles);

    onChange && onChange(newSelectedRoles);
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
