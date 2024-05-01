import './MembersView.scss';
import {useEffect, useState} from "react";
import {getUsers} from "../../functions/users";
import EmailModal from '../EmailModal/EmailModal';
import MembersList from '../MembersList/MembersList';
import SearchBar from '../SearchBar/SearchBar';
import FilterSidebar from '../FilterSidebar/FilterSidebar';
import FilterSummary from '../FilterSummary/FilterSummary';
import Icons from '../../functions/icons_holder';
import {ToastContainer, toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MembersView() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const numOfMockedUsers = 500;
        const mockNames = [
            'John Doe', 'Jane Doe', 'Alice Doe', 'Bob Doe', 'Charlie Doe', 'David Doe', 'Eve Doe', 'Frank Doe', 'Grace Doe', 'Heidi Doe', 'Ivy Doe', 'Jack Doe', 'Karl Doe', 'Liam Doe', 'Mia Doe', 'Nina Doe', 'Oscar Doe', 'Pam Doe', 'Quinn Doe', 'Ruth Doe', 'Sam Doe', 'Tina Doe', 'Uma Doe', 'Vic Doe', 'Will Doe', 'Xena Doe', 'Yara Doe', 'Zara Doe'
        ];
        const mockRoles = ['Software Development', 'Data Analytics', 'Solution Architect', 'Web Design', 'Database Administration', 'Data Engineering', 'Other'];
        const mockLocations = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];
        const mockInterests = ['Development', 'Design', 'Data', 'Management', 'Other'];
        const mockUsers = [];

        const randomDate = () => {
            return new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 365));
        }
        for (let i = 0; i < numOfMockedUsers; i++) {
            mockUsers.push({
                id: i,
                firstName: mockNames[Math.floor(Math.random() * mockNames.length)].split(' ')[0],
                lastName: mockNames[Math.floor(Math.random() * mockNames.length)].split(' ')[1],
                email: `${mockNames[Math.floor(Math.random() * mockNames.length)].split(' ')[0].toLowerCase()}${Math.floor(Math.random() * 1000)}@example.com`,
                discipline: mockRoles[Math.floor(Math.random() * mockRoles.length)],
                locationCity: mockLocations[Math.floor(Math.random() * mockLocations.length)],
                interest: mockInterests[Math.floor(Math.random() * mockInterests.length)],
                lastActive: randomDate(),
                birthday: randomDate(),
            });
        }
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
        setLoading(false);
    }, []);

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const fetchedUsers = await getUsers();
    //         setUsers(fetchedUsers);
    //         setFilteredUsers(fetchedUsers);
    //         setLoading(false);
    //     };
    //     fetchUsers();
    // }, []);
    // TODO: Consider adding useMemo or useCallback to filterUsers and searchForUsers to memoize their filters.
    const [filteredUsers, setFilteredUsers] = useState([]);
    const filterUsers = (selectedFilters) => {
        if (!selectedFilters.length) {
            return setFilteredUsers(users);
        }
        // TODO: Make filters additive.
        setFilteredUsers(users.filter(user => {
            for (let i = 0; i < selectedFilters.length; i++) {
                if (selectedFilters[i] === 'Active' && user.lastActive >= new Date().getDay() - 30) return true;
                if (selectedFilters[i] === 'Inactive' && user.lastActive < new Date().getDay() - 30) return true;
                if (selectedFilters[i] === 'Today' && user.birthday === new Date().getDay()) return true;
                if (selectedFilters[i] === 'This Week' && user.birthday >= new Date().getDay() && user.birthday <= new Date().getDay() + 7) return true;
                if (selectedFilters[i] === 'This Month' && user.birthday >= new Date().getDay() && user.birthday <= new Date().getDay() + 30) return true;
                if (selectedFilters[i] === user.discipline) return true;
                if (selectedFilters[i] === user.locationCity) return true;
                if (selectedFilters[i] === user.interest) return true;
            }
            return false;
        }));
    };
    const resetFilteredUsers = () => {
        setFilteredUsers(users);
    }
    // TODO: Make search and filter play nice.
    const searchForUsers = (searchInput) => {
        const searchTerm = searchInput.toLowerCase().trim()

        const searchedUsers = filteredUsers.filter(user => (
                user.firstName?.toLowerCase().includes(searchTerm)
                || user.lastName?.toLowerCase().includes(searchTerm)
                || user.email?.toLowerCase().includes(searchTerm)
            )
        );
        setFilteredUsers(searchedUsers)
    }

    const [membersSelected, setMembersSelected] = useState([]);
    const [onOpen, setOnOpen] = useState(false);
    const handleModalOpen = () => {
        setOnOpen(prevState => !prevState);
    }
    const notify = () => toast.success(`Your message has been successfully sent to ${membersSelected.length} members!`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    });
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
                            <p className="member-list__count body-copy">{membersSelected.length ? `Members (${membersSelected.length})` : `Members (${filteredUsers.length})`}</p>
                        </div>
                        <SearchBar searchForUsers={searchForUsers}/>
                    </div>
                    {!loading && <MembersList users={filteredUsers} membersSelected={membersSelected}
                                              setMembersSelected={setMembersSelected}/>}
                    <button className="action-button" onClick={handleModalOpen}>+ Action</button>
                </div>
            </div>
            <EmailModal onOpen={onOpen} handleModal={handleModalOpen} notify={notify} filtersApplied={dummyFilters}
                        membersSelected={membersSelected}/>
        </>
    )

}