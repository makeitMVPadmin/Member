// import "./Home.scss";
import {getMembers, getUserById} from "../../functions/members";
import {useEffect, useState} from "react";

const Home = () => {
    const [members, setMembers] = useState([]);
    const [oneUser, setoneUser] = useState({})
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const fetchMembers = async () => {
            const members = await getMembers();
            console.log(members)
            setMembers(members);
        }

        fetchMembers();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const singleMember = await getUserById(inputValue);
            console.log(singleMember);
            setoneUser(singleMember);
        } catch (error) {
            console.log(error);
        }
    };
    const handleChange = (event) => {
        setInputValue(event.target.value); // Update the input value state
    };

    return <div className="home">
        <h1 className="home__title">Members</h1>
        <fieldset>
            <h3>Test Single User by ID</h3>
            <form onSubmit={handleSubmit}>
                {/* Input field with onChange event to update inputValue state */}
                <input 
                    type="text" 
                    className="text-field" 
                    value={inputValue} 
                    onChange={handleChange} 
                />
                <input type="submit" className="button-input" />
            </form>
            <p className="show">name: {oneUser.fullName ? oneUser.fullName : 'Loading...'}</p>
            <p className="show">email: {oneUser.email ? oneUser.email : 'Loading...'}</p>
            <p className="show">createdAt: {oneUser.createdAt ? new Date(oneUser.createdAt.seconds * 1000).toLocaleDateString("en-US") : 'Loading...'}</p>
            <ul>
                {oneUser.CommunitiesManage.map(community => <li>{community}</li>)}
            </ul>
        

        </fieldset>
        <ul>
            {members.map(member => <li style={{ listStyle: 'none', border: '1px solid red' }} key={member.id}>
                <p>ID: {member.userID}</p>
                <p>Full Name: {member.fullName}</p>
                {member.email && <p>Email Address: {member.email}</p>}
            </li>)}
        </ul>
    </div>;
};

export default Home;
