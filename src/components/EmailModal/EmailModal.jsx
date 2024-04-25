import React from 'react'
import '../EmailModal/EmailModal.scss'

export default function EmailModal({onOpen, handleModal}) {
    if (onOpen !== true) {
        return null;
    }

    return (
            <div className="overlay">
                <div className='email-modal'>
                     <section className='email-modal__send'>
                         <header>To</header>
                         <button className='close-modal' onClick={handleModal}>Cancel</button>
                     </section>
                     <section className='text-area'>
                         <textarea className='header-textbox' placeholder='Type your subject here'></textarea>
                         <textarea className='main-text' placeholder='Type your message here'>
                         </textarea>
                     </section>
                 </div>
            </div>

            // <div className='overlay'>
            //     
            // </div>
    )
}


