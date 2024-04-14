// import "./Home.scss";
import {getMembers, getUserById} from "../../functions/members";
import {useEffect, useState} from "react";

const Home = () => {
    const [members, setMembers] = useState([]);
    const [oneUser, setOneUser] = useState({})
    const [oneCommunity, setOneCommunity] = useState({})
    const [inputValueMember, setInputValueMember] = useState('');
    const [inputValueCommunity, setInputValueCommunity] = useState('');

    useEffect(() => {
        const fetchMembers = async () => {
            const members = await getMembers();
            console.log(members)
            setMembers(members);
        }

        fetchMembers();
    }, []);

    const handleSubmitMember = async (event) => {
        event.preventDefault();
        try {
            const singleMember = await getUserById(inputValueMember);
            console.log(singleMember);
            setOneUser(singleMember);
        } catch (error) {
            console.log(error);
        }
    };
    const handleSubmitCommunity = async (event) => {
        event.preventDefault();
        try {
            const singleMember = await getUserById(inputValueCommunity);
            console.log(singleMember);
            setOneCommunity(singleMember);
        } catch (error) {
            console.log(error);
        }
    };
    const handleChangeMember = (event) => {
        setInputValueMember(event.target.value); // Update the input value state
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
                <input type="submit" className="button-input" />
            </form>
            <p className="show">name: {oneCommunity.fullName ? oneCommunity.fullName : 'Loading...'}</p>
            <p className="show">email: {oneCommunity.email ? oneCommunity.email : 'Loading...'}</p>
            <p className="show">createdAt: {oneCommunity.createdAt ? new Date(oneCommunity.createdAt.seconds * 1000).toLocaleDateString("en-US") : 'Loading...'}</p>
            <ul>
                {oneUser.CommunitiesManage ? oneUser.CommunitiesManage.map(community => <li>{community}</li>) : 'Loading...'}
            </ul>    
        </fieldset>

        <fieldset>
            <h3>Search for Single User by ID</h3>
            <form onSubmit={handleSubmitMember}>
                {/* Input field with onChange event to update inputValue state */}
                <input 
                    type="text" 
                    className="text-field" 
                    value={inputValueMember} 
                    onChange={handleChangeMember} 
                />
                <input type="submit" className="button-input" />
            </form>
            <p className="show">name: {oneUser.fullName ? oneUser.fullName : 'Loading...'}</p>
            <p className="show">email: {oneUser.email ? oneUser.email : 'Loading...'}</p>
            <p className="show">createdAt: {oneUser.createdAt ? new Date(oneUser.createdAt.seconds * 1000).toLocaleDateString("en-US") : 'Loading...'}</p>
            <ul>
                {oneUser.CommunitiesManage ? oneUser.CommunitiesManage.map(community => <li>{community}</li>) : 'Loading...'}
            </ul>
        </fieldset>
        <ul style={{height: '400px', overflowY: 'scroll'}}>
            {members.map(member => <li style={{ listStyle: 'none', border: '1px solid red' }} key={member.id}>
                <p>ID: {member.userID}</p>
                <p>Full Name: {member.fullName}</p>
                {member.email && <p>Email Address: {member.email}</p>}
            </li>)}
        </ul>
    </div>;
};

export default Home;
