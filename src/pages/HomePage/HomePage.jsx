// import "./Home.scss";
import {getUsers, getUserById} from "../../functions/users";
import {getCommunities, getCommunityById} from "../../functions/communities";
import {useEffect, useState} from "react";

const Home = () => {
    const [users, setUsers] = useState([]);
    const [communities, setCommunities] = useState([]);
    const [oneUser, setOneUser] = useState({})
    const [oneCommunity, setOneCommunity] = useState({})
    const [createdByName, setCreatedByName] = useState('Loading...');
    const [inputValueUser, setInputValueUser] = useState('');
    const [inputValueCommunity, setInputValueCommunity] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const users = await getUsers();
            const communities = await getCommunities();
            console.log(users);
            setUsers(users);
            setCommunities(communities);
        }

        fetchData();
    }, []);

    const handleSubmitUser = async (event) => {
        event.preventDefault();
        try {
            const singleUser = await getUserById(inputValueUser);
            console.log(singleUser);
            setOneUser(singleUser);
        } catch (error) {
            console.log(error);
        }
    };
    const handleSubmitCommunity = async (event) => {
        event.preventDefault();
        try {
            const singleCommunity = await getCommunityById(inputValueCommunity);
            const creatorName = await getCreatorName(singleCommunity.CreatedBy);

            console.log(singleCommunity);
            setOneCommunity(singleCommunity);
            setCreatedByName(creatorName);
            console.log(createdByName);
        } catch (error) {
            console.log(error);
        }
    };

    const getCreatorName = async (userId) => {
        try {
            const user = await getUserById(userId);
            return user.fullName; // Assuming the user object has a 'name' field
        } catch (error) {
            console.error("Error fetching creator's name:", error);
            return 'Unknown';
        }
    };

    const handleChangeUser = (event) => {
        setInputValueUser(event.target.value); // Update the input value state
    };
    const handleChangeCommunity = (event) => {
        setInputValueCommunity(event.target.value); // Update the input value state
    };

    return <div className="home">
        <h1>Routes Test Page</h1>
        <fieldset>
            <h3>Search for Single Community by ID</h3>
            <form onSubmit={handleSubmitCommunity}>
                <input
                    type="text"
                    className="text-field"
                    value={inputValueCommunity}
                    onChange={handleChangeCommunity}
                />
                <input type="submit" className="button-input"/>
            </form>

            <p className="show">CreatedBy (id): {oneCommunity.CreatedBy ? oneCommunity.CreatedBy : 'Loading...'}</p>
            <p className="show">CreatedBy (name): {createdByName ? createdByName : 'Loading...'}</p>
            <p>Description: {oneCommunity.Description}</p>
            <p>Date
                Created: {oneCommunity.Created ? new Date(oneCommunity.Created.seconds * 1000).toLocaleDateString("en-US") : 'Loading...'}</p>
            <p>Locations:</p>
            <ul>
                {oneCommunity.Location ? oneCommunity.Location.map(location => <li
                    key={location}>{location}</li>) : 'Loading...'}
            </ul>
        </fieldset>

        <h3>All Communities</h3>
        <ul style={{height: '300px', overflowY: 'scroll', border: '2px solid black'}}>
            {communities.map(community => <li style={{listStyle: 'none', border: '1px solid red', padding: '0 16px'}}
                                              key={community.id}>
                <p>Name: {community.Name}</p>
                <p>Description: {community.Description}</p>
                <p>Created By (*note: this is NOT the community ID*): {community.CreatedBy}</p>
                <p>Date
                    Created: {community.Created ? new Date(community.Created.seconds * 1000).toLocaleDateString("en-US") : 'Loading...'}</p>
                {/* <p>Full Name: {user.fullName}</p>
                {communities.email && <p>Email Address: {communities.email}</p>} */}
            </li>)}
        </ul>

        <fieldset>
            <h3>Search for Single User by ID</h3>
            <form onSubmit={handleSubmitUser}>
                <input
                    type="text"
                    className="text-field"
                    value={inputValueUser}
                    onChange={handleChangeUser}
                />
                <input type="submit" className="button-input"/>
            </form>
            <p className="show">name: {oneUser.fullName ? oneUser.fullName : 'Loading...'}</p>
            <p className="show">email: {oneUser.email ? oneUser.email : 'Loading...'}</p>
            <p className="show">createdAt: {oneUser.createdAt ? new Date(oneUser.createdAt.seconds * 1000).toLocaleDateString("en-US") : 'Loading...'}</p>
            <ul>
                {oneUser.CommunitiesManage ? oneUser.CommunitiesManage.map(community =>
                    <li>{community}</li>) : 'Loading...'}
            </ul>
        </fieldset>

        <h3>All Users</h3>
        <ul style={{height: '300px', overflowY: 'scroll', border: '2px solid black'}}>
            {users.map(user => <li style={{listStyle: 'none', border: '1px solid red', padding: '0 16px'}}
                                   key={user.id}>
                <p>ID: {user.userID}</p>
                <p>Full Name: {user.fullName}</p>
                {user.email && <p>Email Address: {user.email}</p>}
            </li>)}
        </ul>
    </div>
};

export default Home;
