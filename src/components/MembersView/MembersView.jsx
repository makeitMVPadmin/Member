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

const convertDaysToMilliseconds = (days) => {
    return days * 24 * 60 * 60 * 1000;
}

const randomDate = () => {
    return new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 365));
}

export default function MembersView() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // START OF MOCK USERS FUNCTIONALITY
    const numOfMockedUsers = 500;
    const mockNames = [
        'John Doe', 'Jane Doe', 'Alice Doe', 'Bob Doe', 'Charlie Doe', 'David Doe', 'Eve Doe', 'Frank Doe', 'Grace Doe', 'Heidi Doe', 'Ivy Doe', 'Jack Doe', 'Karl Doe', 'Liam Doe', 'Mia Doe', 'Nina Doe', 'Oscar Doe', 'Pam Doe', 'Quinn Doe', 'Ruth Doe', 'Sam Doe', 'Tina Doe', 'Uma Doe', 'Vic Doe', 'Will Doe', 'Xena Doe', 'Yara Doe', 'Zara Doe'
    ];
    const mockRoles = ['Software Development', 'Data Analytics', 'Solution Architect', 'Web Design', 'Database Administration', 'Data Engineering', 'Other'];
    const mockLocations = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];
    const mockInterests = ['Development', 'Design', 'Data', 'Management', 'Other'];
    const mockUsers = [];

    useEffect(() => {
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
    // END OF MOCK USERS FUNCTIONALITY

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

        const locationFilters = selectedFilters.filter(filter => mockLocations.includes(filter));
        const disciplineFilters = selectedFilters.filter(filter => mockRoles.includes(filter));
        const interestFilters = selectedFilters.filter(filter => mockInterests.includes(filter));
        const otherFilters = selectedFilters.filter(filter => !locationFilters.includes(filter) && !disciplineFilters.includes(filter) && !interestFilters.includes(filter));
        const currentDate = new Date();

        setFilteredUsers(users.filter(user => {
            if (locationFilters.length && !locationFilters.includes(user.locationCity)) return false;
            if (disciplineFilters.length && !disciplineFilters.includes(user.discipline)) return false;
            if (interestFilters.length && !interestFilters.includes(user.interest)) return false;

            const userBirthdayDate = new Date(user.birthday);
            const userLastActiveDate = new Date(user.lastActive);

            for (let filter of otherFilters) {
                if (filter === 'Active' && userLastActiveDate < currentDate - convertDaysToMilliseconds(30)) return false;
                if (filter === 'Inactive' && userLastActiveDate >= currentDate - convertDaysToMilliseconds(30)) return false;
                if (filter === 'Today' && userBirthdayDate !== currentDate) return false;
                if (filter === 'This Week' && (userBirthdayDate < currentDate || userBirthdayDate > currentDate + convertDaysToMilliseconds(7))) return false;
                if (filter === 'This Month' && (userBirthdayDate < currentDate || userBirthdayDate > currentDate + convertDaysToMilliseconds(30))) return false;
                if (filter !== 'Active' && filter !== 'Inactive' && filter !== 'Today' && filter !== 'This Week' && filter !== 'This Month' && user.discipline !== filter && user.locationCity !== filter && user.interest !== filter) return false;
            }
            return true;
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

    // TODO: membersSelected does not update to remove users when filteredUsers changes.
    // For example, if a user is selected and then the filters are changed to exclude that user, the user remains selected.
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
        <div className='members-view'>
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
                    {!loading &&
                        <MembersList key={filteredUsers.length} users={filteredUsers} membersSelected={membersSelected}
                                     setMembersSelected={setMembersSelected}/>}
                    <button className="button--action" onClick={handleModalOpen}>+ Action</button>
                </div>
            </div>
            <EmailModal onOpen={onOpen} handleModal={handleModalOpen} notify={notify} filtersApplied={dummyFilters}
                        membersSelected={membersSelected}/>
        </div>
    )

}