import './MembersView.scss';
import {useEffect, useState} from "react";
import {getUsers} from "../../functions/users";
import EmailModal from '../EmailModal/EmailModal';
import MembersList from '../MembersList/MembersList';
import SearchBar from '../SearchBar/SearchBar';
import FilterSummary from '../FilterSummary/FilterSummary';
import FilterComponent from '../FilterComponent/FilterComponent';
import Icons from '../../functions/icons_holder';

export default function MembersView() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([users]);
    const [onOpen, setOnOpen] = useState(false);
    const [membersSelected, setMembersSelected] = useState([]);
    const [loading, setLoading] = useState(true);
    const dummyFilters = ["filterOne", "filterTwo", "filterThree", "filterOne", "filterTwo","filterOne", "filterTwo","filterOne", "filterTwo",];
    const dummyMembers = ["memOne", "memTwo", "memThree", "memFour", "memFive", "memSix", "memSeven"];

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getUsers();
            setUsers(users);
            setFilteredUsers(users);
            setLoading(false)
        }

        fetchUsers();
    }, []);

    const handleModalOpen = () => {
        setOnOpen(prevState => !prevState);
        console.log("Modal has been clicked: ", onOpen)
    }

    const filterUsersBySearchTerm = (searchTerm) => {
        const searchedUsers = users.filter(user => (
            user.firstName?.includes(searchTerm) || user.lastName?.includes(searchTerm) || user.email?.includes(searchTerm)) || user.discipline?.includes(searchTerm)
        );
        setFilteredUsers(searchedUsers)
    }

    const resetFilteredUsers = () => {
        setFilteredUsers(users);
    }

    return (
        <>
            <FilterSummary filtersApplied={dummyFilters} membersSelected={dummyMembers}/>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
            <FilterComponent />
            <div style={{ marginLeft: '20px', flex: 1 }}>
            <div className="member-list__top">
                <div className="member-list__count-wrapper">
                    <img src={Icons().IconMembers} alt="meeples" className="member-list__icon"></img>
                    <p className="member-list__count body-copy">{membersSelected.length ? `Members (${membersSelected.length})`: `Members (${users.length})`}</p>
                </div>
            <SearchBar filterUsersBySearchTerm={filterUsersBySearchTerm}/>
            </div>
            {!loading && <MembersList users={filteredUsers} membersSelected={membersSelected} setMembersSelected={setMembersSelected}/>}
            <button onClick={handleModalOpen}>Action</button>
            </div>
            </div>
            <EmailModal onOpen={onOpen} handleModal={handleModalOpen}/>
        </>
    )
    
}