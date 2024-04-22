import './MembersList.scss';
import {useState} from "react";
import Icons from '../../functions/icons_holder';


export default function MembersList ({users, membersSelected, setMembersSelected}) {

const [selectAll, setSelectAll] = useState(false);

// Function to handle the checkbox that selects all members
const handleSelectAll = ()=>{
    if (selectAll) {
        setMembersSelected([])
    } else {
        const allMembers = users.map((user)=>{return user.email}) //gets emails from all members
        setMembersSelected(allMembers) // puts all member emails into membersSelected array
    }
    setSelectAll(!selectAll) //toggles select all button
}

// Function to handle individual checkbox changes and update selected members
// Currently set to add member emails 
const handleCheckboxChange = (member) => {
    if (membersSelected.includes(member)) {
        setMembersSelected(membersSelected.filter(membersSelected => membersSelected !== member));
    } else {
        setMembersSelected([...membersSelected, member]);
    }
};

// function to convert last login information into preferred date format (mm/dd/yy)
const createDate = (timestampSeconds)=>{    
    const timestampMilliseconds = timestampSeconds * 1000;
    const lastLoginDate = new Date(timestampMilliseconds);
    return lastLoginDate.toLocaleDateString();
}

    return(
        <>
        {/* Sample list to show selected members */}
        <div>
            <p>Selected members: {membersSelected.join(",")}</p>
        </div>
        <div className="member-list__count-wrapper">
            <img src={Icons().IconMembers} alt="meeples" className="member-list__icon"></img>
            <p className="member-list__count body-copy">{membersSelected.length ? `Members (${membersSelected.length})`: `Members (${users.length})`}</p>
        </div>
        {/* Header */}
        <div className="body-copy">
            <ul className="member-list__header">
                <li className="column--short body-copy"><input type="checkbox" onChange={handleSelectAll}/></li>
                <li className="column column--userinfo body-copy">Member</li>
                <li className="column body-copy">Role</li>
                <li className="column column--hidden body-copy">Location</li>
                <li className="column column--hidden body-copy">Last Active</li>
            </ul>
        </div>
        {/* List out individual members */}
        <div className="member-list__container">
            {users.map((user,index)=> 
            (<div className="member-card__background" key={user.id}>
                <ul className="member-card body-copy">
                    <li className="member-card__checkbox column--short"><input type="checkbox" checked={selectAll || membersSelected.includes(user.email)} onChange={()=>{handleCheckboxChange(user.email)}}/></li>
                    <li className="member-card__userinfo-container column column--userinfo">
                        <div className="member-card__userinfo-subcontainer">
                            <img src={user.profilePicture ? user.profilePicture: Icons().IconUser} alt={`${user.firstName}'s avatar`} className="member-card__avatar"/>
                            <p className="member-card__name body-copy">{user.firstName} {user.lastName}</p>
                        </div>
                        <p className="member-card__email body-copy">{user.email}</p>
                    </li>
                    <li className="member-card__role body-copy column">{user.discipline}</li>
                    <li className="member-card__location body-copy column column--hidden">{user.location}</li>
                    <li className="member-card__last-active body-copy column column--hidden">{createDate(user.lastLogin.seconds)}</li>
                </ul>
            </div>
))}
        </div>
        </>
    )
}

