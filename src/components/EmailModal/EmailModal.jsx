import React, { useState } from 'react'
import '../EmailModal/EmailModal.scss'
import FilterSummary from '../FilterSummary/FilterSummary';
import Icons from '../../functions/icons_holder';

export default function EmailModal({onOpen, handleModal, filtersApplied, membersSelected}) {
    
    const [formData, setFormData] = useState({
        subject: '',
        message: ''
    })


    if (onOpen !== true) {
        return null;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log('form submitted: ', formData)

        setFormData({
            subject: '',
            message: ''
        })
        handleModal();
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
                    <form className='text-area' onSubmit={handleSubmit}>
                    <textarea className='text-area__subject-field' name='subject' value={formData.subject} onChange={handleInputChange} placeholder='Type your subject here'></textarea>
                    <textarea className='text-area__message-field' name='message' value={formData.message} onChange={handleInputChange} placeholder='Type your message here'></textarea>
                    <button className="text-area__send-button" type='submit'>
                        <img src={Icons().IconMail} alt="email" className="email-icon"/>
                        Send Email
                    </button>
                    </form>
                </div>
        </div>
    )
}


