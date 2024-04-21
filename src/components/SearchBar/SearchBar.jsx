import {debounce} from "../../utils/utils";
import iconSearch from "../../assets/icons/icon_search.svg";

export default function SearchBar({filterUsersBySearchTerm}) {
    const handleSearch = (e) => {
        debounce(filterUsersBySearchTerm(e.target.value));
    }

    return (
        <div className='search-bar__container'>
            <img src={iconSearch} className="search-icon" alt="search-icon" />
            <input type="text" className="search-bar" onChange={handleSearch} placeholder='Search'/>
        </div>
    )
}