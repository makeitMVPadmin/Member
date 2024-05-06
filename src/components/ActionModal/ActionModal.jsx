import './ActionModal.scss'

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
                    <section className="action-options">
                        <button className="action-options__option" onClick={toggleEmailModal}><img src="" alt="IMG" className="option-image" />Send Email</button>
                        <hr />
                        <button className="action-options__option"><img src="" alt="IMG" className="option-image" />Send Newsletter </button>
                        <hr />
                        <button className="action-options__option"><img src="" alt="IMG" className="option-image" />Send Event</button>
                    </section>

                :

                <button className="action-button" onClick={toggleActionOptions}>+ Action</button>            
            }
        </div>
    )
}