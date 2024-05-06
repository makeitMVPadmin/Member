import {useState, useEffect} from 'react';
import chevronIcon from "../../assets/icons/icon_chevron.svg";

export default function Filter({filterUsers, filterIcon, filterTitle, filterItems, setSelectedFilters, selectedFilters}) {
    const [isOpened, setIsOpened] = useState(false);
    
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

    const changeChevron = ()=>{
        setIsOpened(!isOpened)
    }

    return (
        <div className="filter">
            <details>
                <summary onClick={changeChevron}>
                    <img src={filterIcon} alt=""/>
                    <h3>{filterTitle}</h3>
                    <img src={chevronIcon} alt="" className={isOpened ? "chevron--up" : "chevron"}/>
                </summary>
                {filterItems.map((filter, index) => (
                    <div key={index}>
                        <input
                            id={`${filter}-${index}`}
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