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
import ActionModal from '../ActionModal/ActionModal'
import { convertDaysToMilliseconds, getRandomDate } from '../../utils/utils';

// TODO: Something is causing MembersView to render twice on page load. This is slowing things down. To check, add a console.log to the useEffect and log the length of the mockUsers array.
// In theory, this useEffect should only run once since it has an empty dependency array, but it's running twice.
export default function MembersView() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // START OF MOCK USERS FUNCTIONALITY
    const numOfMockedUsers = 1000;
    const mockFirstNames = [
        'John', 'Jane', 'Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivy', 'Jack', 'Karl', 'Liam', 'Mia', 'Nina', 'Oscar', 'Pam', 'Quinn', 'Ruth', 'Sam', 'Tina', 'Uma', 'Vic', 'Will', 'Xena', 'Yara', 'Zara'
    ]
    const mockLastNames = [
        'Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez',
    ]
    const mockRoles = ['Software Development', 'Data Analytics', 'Solution Architect', 'Web Design', 'Database Administration', 'Data Engineering', 'Other'];
    const mockLocations = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];
    const mockInterests = ['Development', 'Design', 'Data', 'Management', 'Other'];

    useEffect(() => {
        const mockUsers = [];
        for (let i = 0; i < numOfMockedUsers; i++) {
            const firstNamesRandomIndex = Math.floor(Math.random() * mockFirstNames.length);
            const lastNamesRandomIndex = Math.floor(Math.random() * mockLastNames.length);
            mockUsers.push({
                id: i,
                firstName: mockFirstNames[firstNamesRandomIndex],
                lastName: mockLastNames[lastNamesRandomIndex],
                email: `${mockFirstNames[firstNamesRandomIndex].toLowerCase()}${mockLastNames[lastNamesRandomIndex][0].toLowerCase()}${Math.floor(Math.random() * 1000)}@example.com`,
                discipline: mockRoles[Math.floor(Math.random() * mockRoles.length)],
                locationCity: mockLocations[Math.floor(Math.random() * mockLocations.length)],
                interest: mockInterests[Math.floor(Math.random() * mockInterests.length)],
                lastActive: getRandomDate(),
                birthday: getRandomDate(),
            });
        }
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
        setSearchedUsers(mockUsers)
        setLoading(false);
    }, []);
    // END OF MOCK USERS FUNCTIONALITY

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const fetchedUsers = await getUsers();
    //         setUsers(fetchedUsers);
    //         setFilteredUsers(fetchedUsers);
    //         setSearchedUsers(mockUsers)
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
                if (filter === 'Today' && (userBirthdayDate.getDate() !== currentDate.getDate() || userBirthdayDate.getMonth() !== currentDate.getMonth())) return false;
                if (filter === 'This Week' && (userBirthdayDate < currentDate - convertDaysToMilliseconds(7))) return false;
                if (filter === 'This Month' && (userBirthdayDate < currentDate - convertDaysToMilliseconds(30))) return false;
                if (filter !== 'Active' && filter !== 'Inactive' && filter !== 'Today' && filter !== 'This Week' && filter !== 'This Month' && user.discipline !== filter && user.locationCity !== filter && user.interest !== filter) return false;
            }
            return true;
        }));
    };
    const resetFilteredUsers = () => {
        setFilteredUsers(users);
    }

    const [searchedUsers, setSearchedUsers] = useState([])
    const searchForUsers = (searchInput) => {
        const searchTerm = searchInput.toLowerCase().trim();

        const searchedForUsers = users.filter(user => (
                user.firstName?.toLowerCase().includes(searchTerm)
                || user.lastName?.toLowerCase().includes(searchTerm)
                || user.email?.toLowerCase().includes(searchTerm)
            )
        );
        setSearchedUsers(searchedForUsers)
    }

    const displayedUsers = users.filter(user => filteredUsers.includes(user) && searchedUsers.includes(user));

    // TODO: membersSelected does not update to remove users when displayedUsers changes.
    // For example, if a user is selected and then the filters are changed to exclude that user, the user remains selected.
    const [membersSelected, setMembersSelected] = useState([]);
    const [emailOpen, setEmailOpen] = useState(false);
    const toggleEmailModal = () => {
        setEmailOpen(prevState => !prevState);
        console.log("email toggled")
    }
    const [actionOptionsOpen, setActionOptionsOpen] = useState(false);
    const toggleActionOptions = () => {
        setActionOptionsOpen(prevState => !prevState);
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
    const dummyFilters = ["AB", "Software Development"];

    return (
        <div className='members-view'>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar
            />
            <div className="member-component-wrapper">
                <FilterSidebar filterUsers={filterUsers} resetFilteredUsers={resetFilteredUsers}/>
                <div className='members-container'>
                    <div className="member-list__top">
                        <div className="member-list__count-wrapper">
                            <img src={Icons().IconMembers} alt="meeples" className="member-list__icon"></img>
                            <h2 className="member-list__count">{membersSelected.length >= 1 ? `Members (${membersSelected.length})` : `Members (${displayedUsers.length})`}</h2>
                        </div>
                        <SearchBar searchForUsers={searchForUsers}/>
                    </div>
                    {!loading &&
                        <MembersList users={displayedUsers} membersSelected={membersSelected}
                                     setMembersSelected={setMembersSelected}/>
                    }

                    <ActionModal actionOptionsOpen={actionOptionsOpen} toggleActionOptions={toggleActionOptions}
                                 toggleEmailModal={toggleEmailModal}/>
                </div>
            </div>
            {emailOpen &&
                <EmailModal emailOpen={emailOpen} handleModal={toggleEmailModal} notify={notify}
                            filtersApplied={dummyFilters}
                            membersSelected={membersSelected}/>
            }
        </div>
    )

}