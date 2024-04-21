import {useEffect, useState} from "react";
import {getUsers} from "../../functions/users";

import EmailModal from '../EmailModal/EmailModal';
import SearchBar from '../SearchBar/SearchBar';

import './MembersView.scss';

export default function MembersView() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([users]);
    const [onOpen, setOnOpen] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getUsers();
            setUsers(users);
        }

        fetchUsers();
    }, []);

    const handleModalOpen = () => {
        setOnOpen(prevState => !prevState);
        console.log("Modal has been clicked: ", onOpen)
    }

    const filterUsersBySearchTerm = (searchTerm) => {
        const searchedUsers = users.filter(user => (
            user.fullName?.includes(searchTerm) || user.email?.includes(searchTerm)) || user.industry?.includes(searchTerm)
        );
        setFilteredUsers(searchedUsers)
    }

    return (
        <>
            <SearchBar filterUsersBySearchTerm={filterUsersBySearchTerm}/>
            <div className="members-view">
                {filteredUsers.map(user => (
                    <div key={user.id} className="member-card">
                        <h3>{user.fullName}</h3>
                        <p>{user.email}</p>
                        <p>{user.industry}</p>
                    </div>
                ))}
            </div>
            <button onClick={handleModalOpen}>Action</button>
            <EmailModal onOpen={onOpen} handleModal={handleModalOpen}/>
        </>
    )
}