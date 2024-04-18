import {useEffect, useState} from "react";
import {getUsers} from "../../functions/users";

import SearchBar from '../SearchBar/SearchBar';

import './MembersView.scss';

export default function MembersView(){
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([users]);

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getUsers();
            setUsers(users);
        }

        fetchUsers();
    }, []);

    const filterUsersBySearchTerm = (searchTerm) => {
        const searchedUsers = users.filter(user => (
            user.fullName?.includes(searchTerm) || user.email?.includes(searchTerm)) || user.industry?.includes(searchTerm)
        );
        setFilteredUsers(searchedUsers)
    }

    return (
        <>
            <SearchBar filterUsersBySearchTerm={filterUsersBySearchTerm} />
            <div className="members-view">
                {filteredUsers.map(user => (
                    <div key={user.id} className="member-card">
                        <h3>{user.fullName}</h3>
                        <p>{user.email}</p>
                        <p>{user.industry}</p>
                    </div>
                ))}
            </div>
        </>
    )
}