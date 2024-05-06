import {useState, useEffect} from 'react';

export default function Filter({filterUsers, filterIcon, filterTitle, filterItems, setSelectedFilters, selectedFilters}) {
    useEffect(() => {
        filterUsers(selectedFilters)
    }, [selectedFilters])

    const toggleFilter = (filter) => {
        let updatedFilters
        if (selectedFilters.includes(filter)) {
            updatedFilters = selectedFilters.filter(f => f !== filter)
        } else {
            updatedFilters = [...selectedFilters, filter]
        }
        setSelectedFilters(updatedFilters)
    }

    return (
        <div className="filter">
            <details>
                <summary>
                    <img src={filterIcon} alt=""/>
                    <h3>{filterTitle}</h3>
                </summary>
                {filterItems.map((filter, index) => (
                    <div className='filter-check' key={index}>
                        <input
                            id={`${filter}-${index}`}
                            className='filter-check__input'
                            type="checkbox"
                            checked={selectedFilters.includes(filter)}
                            onChange={() => toggleFilter(filter)}
                        />
                        <label htmlFor={`${filter}-${index}`}>{filter}</label>
                    </div>
                ))}
            </details>
        </div>
    )
}