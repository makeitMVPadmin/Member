// import searchIcon from '../../assets/search-icon.svg';
import {debounce} from "../../utils/utils";


export default function SearchBar({filterUsersBySearchTerm}) {
    const handleSearch = (e) => {
        debounce(filterUsersBySearchTerm(e.target.value));
    }

    return (
        <div>
            <img src={''} alt="search-icon" />
            <input type="text" className="search-bar" onChange={handleSearch} />
        </div>
    )
}