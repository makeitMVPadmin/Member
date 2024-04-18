import './CommunityManager.scss' 
import MainNavigation from "../MainNavigation/MainNavigation";
import { useState } from 'react';
import PlaceHolderView from '../PlaceholderView/PlaceholderView';
import MembersView from '../MembersView/MembersView';

export default function CommunityManager(){
    const [currentView, setCurrentView] = useState("viewMembers")

    return(
        <>
            <section className="community-manager">
                <MainNavigation currentView={currentView} setCurrentView={setCurrentView}/>
                <section className="view-container">
                    {
                        currentView === "viewAnnouncements" ? (<PlaceHolderView />)
                        
                        : currentView === "viewEvents" ? (<PlaceHolderView />)
                        
                        : currentView === "viewMembers" ? (<MembersView />)

                        : currentView === "viewNewsletters" ? (<PlaceHolderView />)

                        : (
                            <div className="placeholder">PLACEHOLDER</div>
                        )
                    }
                </section>
            </section>
        </>
    )
}