import './MembersView.scss';
import { useState } from 'react';
import EmailModal from '../EmailModal/EmailModal';;
import { getUsers } from '../../functions/users';
import { useEffect, useState } from 'react';
import MembersList from '../MembersList/MembersList';


export default function MembersView(){
    const [onOpen, setOnOpen] = useState(false);
    
    const handleModalOpen = () => {
        setOnOpen(prevState => !prevState);
        console.log("Modal has been clicked: ", onOpen)
    }

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

            <div>
                <button onClick={handleModalOpen}>Action</button>
                <EmailModal onOpen={onOpen} handleModal={handleModalOpen}/>
            </div>
    </>
)
}