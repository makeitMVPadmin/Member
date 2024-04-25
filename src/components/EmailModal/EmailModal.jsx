import React from 'react'
import '../EmailModal/EmailModal.scss'
import FilterSummary from '../FilterSummary/FilterSummary';
import Icons from '../../functions/icons_holder';

export default function EmailModal({onOpen, handleModal, filtersApplied, membersSelected}) {
    
    if (onOpen !== true) {
        return null;
    }

    return (
            <div className="overlay">
                <div className='email-modal'>
                    <h1 className="email-modal__title">New Message</h1>
                    <section className='send-info'>
                         <h2 className="send-info__email-header">To</h2>
                        <FilterSummary filtersApplied={filtersApplied} membersSelected={membersSelected}/>
                         <button className='send-info__close-button' onClick={handleModal}>Cancel</button>
                     </section>
                     <form className='text-area'>
                        <textarea className='text-area__subject-field' placeholder='Type your subject here'></textarea>
                        <textarea className='text-area__message-field' placeholder='Type your message here'></textarea>
                        <button className="email-modal__send-button">
                            <img src={Icons().IconMail} alt="email" className="email-icon"/>
                            Send Email
                        </button>
                     </form>
                     
                 </div>
            </div>

            // <div className='overlay'>
            //     
            // </div>
    )
}


