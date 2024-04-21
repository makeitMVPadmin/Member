import './MembersView.scss';
import { getUsers } from '../../functions/users';
import { useEffect, useState } from 'react';
import MembersList from '../MembersList/MembersList';


export default function MembersView(){

    const [users, setUsers] = useState([]);
    const [membersSelected, setMembersSelected] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        try {
            const fetchData = async ()=>{
                const users = await getUsers();
                setUsers(users)
                setLoading(false);
            }
            fetchData();
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    },[])

return (
    <>
        {!loading && <MembersList users={users} membersSelected={membersSelected} setMembersSelected={setMembersSelected}/>}
    </>
)
}