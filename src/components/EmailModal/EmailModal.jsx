import React from 'react'
import '../EmailModal/EmailModal.css'

export default function EmailModal({onOpen, handleModal}) {
    if (onOpen !== true) {
        return null;
    }

    return (
        <div className='modal'>
            <div className='overlay'>
                <div className='modal-content'>
                    <div className='to-sender'>
                        <header>To</header>
                        <button className='close-modal' onClick={handleModal}>Cancel</button>
                    </div>
                    <div className='text-area'>
                        <textarea className='header-textbox' placeholder='Type your subject here'></textarea>
                        <textarea className='main-text' placeholder='Type your message here'>
                        </textarea>
                    </div>
                </div>
            </div>
        </div>
    )
}


