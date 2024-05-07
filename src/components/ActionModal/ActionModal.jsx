import './ActionModal.scss'
import Icons from '../../functions/icons_holder';

export default function ActionModal({toggleActionOptions, actionOptionsOpen, toggleEmailModal}){

//     const handleEmailClick = () =>{
//         toggleEmailModal();
// }
// const handleClick = () =>{
//     console.log("click")
// }
    return(
        <div className='action-modal'>
            {
                actionOptionsOpen ?
                <>
                    <div className="action-modal__overlay" onClick={toggleActionOptions}></div>
                    <section className="action-options">
                        
                        <button className="action-options__option" onClick={()=>{
                            toggleEmailModal();
                            toggleActionOptions();}}><img src={Icons().IconMail} alt="IMG" className="option-image" />Send Email</button>
                        <hr />
                        <button className="action-options__option"><img src={Icons().IconNewsletter} alt="IMG" className="option-image" />Send Newsletter </button>
                        <hr />
                        <button className="action-options__option"><img src={Icons().IconEvent} alt="IMG" className="option-image" />Send Event</button>
                    </section>
                
                </>

                :

                <button className="action-button" onClick={toggleActionOptions}>+ Action</button>            
            }
        </div>
    )
}