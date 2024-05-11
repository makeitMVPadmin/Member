import './TempUi.scss'
import Icons from '../../functions/icons_holder'
import CommunitiLogo from '../../assets/logos/communiti_logo.svg'
import profileHeadshot from '../../assets/images/profileHeadshot.png'
import notebook from '../../assets/images/notebookSketch.png'
import chevron from '../../assets/icons/icon_chevron.svg'

export default function TempUi(){
    
    return(
        <>
            <nav className="nav-bar">
                <div className="left-container">
                    <img src={CommunitiLogo} alt="Communiti Logo" className="left-container__logo" />
                    <div className="icon-pair">
                        <img src={Icons().IconDashboard} alt="Home Icon" className="icon-pair__icon" />
                        <p className="icon-pair__label">Home</p>
                    </div>
                    <div className="icon-pair icon-pair--active">
                        <img src={Icons().IconMembers} alt="Community Icon" className="icon-pair__icon" />
                        <p className="icon-pair__label">Communities</p>
                    </div>
                    <div className="icon-pair">
                        <img src={Icons().IconCalendar} alt="Events Icon" className="icon-pair__icon" />
                        <p className="icon-pair__label">Events</p>
                    </div>
                    <div className="icon-pair">
                        <img src={Icons().IconMessages3} alt="Chats" className="icon-pair__icon" />
                        <p className="icon-pair__label">Chats</p>
                    </div>
                </div>
                <div className="right-container">
                    <img src={profileHeadshot} alt="Profile Headshot" className="right-container__headshot" />
                    <img src={chevron} alt="downward chevron" className="right-container__chevron" />
                </div>
            </nav>
            <section className="hero">
                <div className="back-nav">
                    <img src={Icons().IconArrowBack} alt="back arrow" className="back-nav__return-arrow" />
                    <p className="back-nav__text">Back to Communities</p>
                </div>
                <section className="community-wrapper">
                    <div className="info-wrapper">
                        <img src={notebook} alt="notebook" className="community-image" />
                        <section className="community-info">
                            <div className="title-section">
                                <h1 className="title-section__title">Product Pitchers</h1>
                                <img src={Icons().IconEdit} alt="edit" className="title-section__icon --edit" />
                                <img src={Icons().IconDelete} alt="delete" className="title-section__icon "/>
                            </div>
                            <div className="title-sub-info">
                                <div className="title-sub-info__left-container">
                                    <div className="tag">
                                        <img src={Icons().IconLocation} alt="pin" className="tag__icon" />
                                        <p className="tag__text">Alberta</p>
                                    </div>
                                    <div className="tag">
                                        <img src={Icons().IconLocation} alt="pin" className="tag__icon" />
                                        <p className="tag__text">Virtual</p>
                                    </div>
                                </div>
                                <div className="title-sub-info__right-container">
                                    <div className="title-icon">
                                        <img src={Icons().IconMembers} alt="edit" className="title-icon__image" />
                                        <p className="title-icon__text"> 1000 members</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <section className="description">
                        <h3 className="description__header">Description</h3>
                        <p className="description__text">Join our Product Enthusiasts Club for exclusive insights, discounts, and community. Stay ahead with the latest trends and meet fellow product aficionados. Your gateway to product innovation!</p>
                    </section>
                </section>
            </section>
            <div className="grey-background">
            </div>
        </>
    )
}