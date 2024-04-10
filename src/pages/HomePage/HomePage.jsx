// import "./Home.scss";
import {getMembers} from "../../functions/members";
import {useEffect, useState} from "react";

const Home = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            const members = await getMembers();
            console.log(members)
            setMembers(members);
        }

        fetchMembers();
    }, []);

    return <div className="home">
        <h1 className="home__title">Members</h1>
        <ul>
            {members.map(member => <li style={{ listStyle: 'none' }} key={member.id}>
                <p>ID: {member.userID}</p>
                <p>Full Name: {member.fullName}</p>
                {member.email && <p>Email Address: {member.email}</p>}
            </li>)}
        </ul>
    </div>;
};

export default Home;
