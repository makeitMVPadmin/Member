import './MembersView.scss';
import { useState } from 'react';
import EmailModal from '../EmailModal/EmailModal';

export default function MembersView(){
    const [onOpen, setOnOpen] = useState(false);
    
    const handleModalOpen = () => {
        setOnOpen(prevState => !prevState);
        console.log("Modal has been clicked: ", onOpen)
    }
    return(
        <>
            Hello from MembersView!
            Put components here

            <div>
                <button onClick={handleModalOpen}>Action</button>
                <EmailModal onOpen={onOpen} handleModal={handleModalOpen}/>
            </div>
        </>
    )
}