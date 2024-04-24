import './MainNavigation.scss'

export default function MainNavigation({currentView, setCurrentView}){

    const handleTabClick = ((target)=>{
        const buttons = document.querySelectorAll('.main-nav__tab');
        buttons.forEach(button => {
            button.classList.remove('isActive')
        })
        target.className += " isActive"
        setCurrentView(target.value)
    })

    return(
        <>
            <nav className="main-nav">
                <button className="main-nav__tab" value="viewAnnouncements" onClick={(e) => handleTabClick(e.target)}>Announcements</button>
                <button className="main-nav__tab" value="viewEvents" onClick={(e) => handleTabClick(e.target)}>Events</button>
                <button className="main-nav__tab isActive" value="viewMembers" onClick={(e) => handleTabClick(e.target)}>Members</button>
                <button className="main-nav__tab" value="viewNewsletters" onClick={(e) => handleTabClick(e.target)}>Newsletters</button>
            </nav>
        </>
    )
}