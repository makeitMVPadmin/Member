import './MainNavigation.scss'

export default function MainNavigation({currentView, setCurrentView}){

    const handleTabClick = ((value)=>{
        setCurrentView(value)
    })

    return(
        <>
            Hello from MainNavigation
            last clicked: {currentView}
            <nav className="main-nav">
                <button className="main-nav__tab" value="viewAnnouncements" onClick={(e) => handleTabClick(e.target.value)}>Announcements</button>
                <button className="main-nav__tab" value="viewEvents" onClick={(e) => handleTabClick(e.target.value)}>Events</button>
                <button className="main-nav__tab" value="viewMembers" onClick={(e) => handleTabClick(e.target.value)}>Members</button>
                <button className="main-nav__tab" value="viewNewsletters" onClick={(e) => handleTabClick(e.target.value)}>Newsletters</button>
            </nav>
        </>
    )
}