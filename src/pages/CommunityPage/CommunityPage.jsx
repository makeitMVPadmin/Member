import './CommunityPage.scss'
import CommunityManager from "../../components/CommunityManager/CommunityManager";
import TempUi from '../../components/TempUi/TempUi'
export default function CommunityPage(){

    return(
        <div className='CommunityPage'>
            <TempUi />
            <CommunityManager />
        </div>
    )
}