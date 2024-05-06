import {useState} from "react";

import './FilterSidebar.scss';

import Filter from "../Filter/Filter";

import roleFilterIcon from '../../assets/icons/icon_filter_role.svg';
import locationFilterIcon from '../../assets/icons/icon_filter_location.svg';
import statusFilterIcon from '../../assets/icons/icon_filter_status.svg';
import birthdayFilterIcon from '../../assets/icons/icon_filter_birthday.svg';
import interestFilterIcon from '../../assets/icons/icon_filter_interest.svg';

const FilterSidebar = ({filterUsers, resetFilteredUsers}) => {
    const [selectedFilters, setSelectedFilters] = useState([])

    const filters = [{
        title: 'Role',
        icon: `${roleFilterIcon}`,
        items: ['Software Development', 'Data Analytics', 'Solution Architect', 'Web Design', 'Database Administration', 'Data Engineering', 'Other'],
    }, {
        title: 'Location',
        icon: `${locationFilterIcon}`,
        items: ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT']
    }, {
        title: 'Status', icon: `${statusFilterIcon}`, items: ['Active', 'Inactive']
    }, {
        title: 'Birthday', icon: `${birthdayFilterIcon}`, items: ['Today', 'This Week', 'This Month']
    }, {
        title: 'Interest',
        icon: `${interestFilterIcon}`,
        items: ['Development', 'Design', 'Data', 'Management', 'Other']
    },];

    return (
        <div className={`filter-component`}>
            
                <div className="filter-component__header">
                    <h2>Filters</h2>
                    <button className="button--reset button">Reset Filter</button>
                </div>
               <div> 
                    {filters.map((filter, index) => (
                        <Filter key={index}
                                filterUsers={filterUsers}
                                filterIcon={filter.icon}
                                filterTitle={filter.title}
                                filterItems={filter.items}
                                setSelectedFilters={setSelectedFilters}
                                selectedFilters={selectedFilters}
                        />
                    ))}
            </div>
        </div>);
};

export default FilterSidebar;
