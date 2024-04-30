import './MembersView.scss';
import {useEffect, useState} from "react";
import {getUsers} from "../../functions/users";
import EmailModal from '../EmailModal/EmailModal';
import MembersList from '../MembersList/MembersList';
import SearchBar from '../SearchBar/SearchBar';
import FilterSidebar from '../FilterComponent/FilterSidebar';
import FilterSummary from '../FilterSummary/FilterSummary';
import Icons from '../../functions/icons_holder';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MembersView() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const fetchedUsers = await getUsers();
    //         setUsers(fetchedUsers);
    //         setFilteredUsers(fetchedUsers);
    //         setSearchedUsers(fetchedUsers);
    //         setLoading(false);
    //     };
    //     fetchUsers();
    // }, []);

    const [filteredUsers, setFilteredUsers] = useState([]);
    const filterUsers = (selectedFilters) => {
        if (!selectedFilters.length) {
            return setFilteredUsers(users);
        }

        setFilteredUsers(users.filter(user => {
            for (let i = 0; i < selectedFilters.length; i++) {
                if (selectedFilters[i] === 'Active' && user.lastActive >= new Date().getDay() - 30) return true;
                if (selectedFilters[i] === 'Inactive' && user.lastActive < new Date().getDay() - 30) return true;
                if (selectedFilters[i] === 'Today' && user.birthday === new Date().getDay()) return true;
                if (selectedFilters[i] === 'This Week' && user.birthday >= new Date().getDay() && user.birthday <= new Date().getDay() + 7) return true;
                if (selectedFilters[i] === 'This Month' && user.birthday >= new Date().getDay() && user.birthday <= new Date().getDay() + 30) return true;
                if (selectedFilters[i] === user.role) return true;
                if (selectedFilters[i] === user.location) return true;
                if (selectedFilters[i] === user.interest) return true;
            }
            return false;
        }));
    };
    const resetFilteredUsers = () => {
        setFilteredUsers(users);
    }

    const [searchedUsers, setSearchedUsers] = useState([]);
    // Function to filter user array by search term
    const searchForUsers = (searchInput) => {
        const searchTerm = searchInput.toLowerCase().trim()
        if (!searchTerm) return setSearchedUsers(filteredUsers);

        const searchedUsers = filteredUsers.filter(user => (
                user.firstName?.toLowerCase().includes(searchTerm)
                || user.lastName?.toLowerCase().includes(searchTerm)
                || user.email?.toLowerCase().includes(searchTerm)
            )
        );
        setSearchedUsers(searchedUsers)
    }

    const [membersSelected, setMembersSelected] = useState([]);
    const [onOpen, setOnOpen] = useState(false);
    const handleModalOpen = () => {
        setOnOpen(prevState => !prevState);
    }
    const notify = () => toast("Sent!")
    const dummyFilters = ["filterOne", "filterTwo", "filterOne", "filterTwo",];

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar
            />
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <FilterSidebar filterUsers={filterUsers} resetFilteredUsers={resetFilteredUsers}/>
                <div style={{marginLeft: '20px', flex: 1}}>
                    <div className="member-list__top">
                        <div className="member-list__count-wrapper">
                            <img src={Icons().IconMembers} alt="meeples" className="member-list__icon"></img>
                            <p className="member-list__count body-copy">{membersSelected.length ? `Members (${membersSelected.length})` : `Members (${users.length})`}</p>
                        </div>
                        <SearchBar searchForUsers={searchForUsers}/>
                    </div>
                    {!loading && <MembersList users={searchedUsers} membersSelected={membersSelected}
                                              setMembersSelected={setMembersSelected}/>}
                    <button onClick={handleModalOpen}>Action</button>
                </div>
            </div>
            <EmailModal onOpen={onOpen} handleModal={handleModalOpen} notify={notify} filtersApplied={dummyFilters}
                        membersSelected={membersSelected}/>
        </>
    )

}