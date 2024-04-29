import './MembersView.scss';
import {useEffect, useState} from "react";
import {getUsers} from "../../functions/users";
import EmailModal from '../EmailModal/EmailModal';
import MembersList from '../MembersList/MembersList';
import SearchBar from '../SearchBar/SearchBar';
 import Icons from '../../functions/icons_holder';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MembersView() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([users]);
    const [onOpen, setOnOpen] = useState(false);
    const [membersSelected, setMembersSelected] = useState([]);
    const [loading, setLoading] = useState(true);
    const dummyFilters = ["filterOne", "filterTwo", "filterOne", "filterTwo",];

    const notify = () => toast("Sent!")

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

    // Function to filter user array by search term 
    const filterUsersBySearchTerm = (searchInput) => {
        const searchTerm = searchInput.toLowerCase().trim()
        const searchedUsers = users.filter(user => (
            user.firstName?.toLowerCase().includes(searchTerm) 
            || user.lastName?.toLowerCase().includes(searchTerm) 
            || user.email?.toLowerCase().includes(searchTerm) 
            || user.discipline?.toLowerCase().includes(searchTerm) 
            || user.locationCity?.toLowerCase().includes(searchTerm)
            || user.locationCountry?.toLowerCase().includes(searchTerm)
            || user.locationState?.toLowerCase().includes(searchTerm)
            )
        );
        setFilteredUsers(searchedUsers)
    }

    const resetFilteredUsers = () => {
        setFilteredUsers(users);
    }

    return (
        <>       
            <ToastContainer 
                position="top-center"
                autoClose={3000}
                hideProgressBar
            />
            <div className="member-list__top">
                <div className="member-list__count-wrapper">
                    <img src={Icons().IconMembers} alt="meeples" className="member-list__icon"></img>
                    <p className="member-list__count body-copy">{membersSelected.length ? `Members (${membersSelected.length})`: `Members (${users.length})`}</p>
                </div>
            <SearchBar filterUsersBySearchTerm={filterUsersBySearchTerm}/>
            </div>
            {!loading && <MembersList users={filteredUsers} membersSelected={membersSelected} setMembersSelected={setMembersSelected}/>}
            <button onClick={handleModalOpen}>Action</button>
            
            <EmailModal onOpen={onOpen} handleModal={handleModalOpen} notify={notify} filtersApplied={dummyFilters} membersSelected={membersSelected}/>
        </>
    )
    
}