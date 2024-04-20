import './MembersView.scss';
import { getUsers } from '../../functions/users';
import { useEffect, useState } from 'react';


export default function MembersView(){

    // useState in parent component to store checked members
    // selectMember function (for checkboxes)
    // fetch members (import fetch function from members.js)
    // Row styled component: map through members
    // PAGINATION Logic: https://dev.to/canhamzacode/how-to-implement-pagination-with-reactjs-2b04
    // render page numbers 
    // function currentPage to parent component
    // 

    const [users, setUsers] = useState([]);

    useEffect(()=>{
        try {
            const fetchData = async ()=>{
                const users = await getUsers();
                setUsers(users)
                console.log("users", users);
            }
            fetchData();
        } catch (error) {
            console.log(error)
        }
    },[])


    return(
        <>
            {/* labels bar
            map over users*/}
            {users.map((user)=>{
                <>
                <p>user.firstName</p>
                <p>user.lastName</p>
                <p>user.email</p>
                </>
            })}
        </>
    )
}