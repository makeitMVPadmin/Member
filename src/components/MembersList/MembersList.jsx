import './MembersList.scss';


export default function MembersList ({users, membersSelected, setMembersSelected}) {
    // useState in parent component to store checked members
    // membersSelected function (for checkboxes)
    // Row styled component: map through members
    // PAGINATION Logic: https://dev.to/canhamzacode/how-to-implement-pagination-with-reactjs-2b04
    // render page numbers 
    // function currentPage to parent component

console.log(users[0]);

const createDate = (timestampSeconds)=>{    
    const timestampMilliseconds = timestampSeconds * 1000;
    const lastLoginDate = new Date(timestampMilliseconds);
    return lastLoginDate.toLocaleDateString();
}

    return(
        <>
        <div >
            <ul className="member-list__header body-copy">
                <li className="column--short"><input type="checkbox" /></li>
                <li className="column column--userinfo">Member</li>
                <li className="column">Role</li>
                <li className="column column--hidden">Location</li>
                <li className="column column--hidden">Last Active</li>
            </ul>
        </div>
        <div>
            {users.map((user,index)=> index <10 &&
            (<div className="member-card__background" key={user.id}>
                <ul className="member-card body-copy">
                    <li className="member-card__checkbox column--short"><input type="checkbox"/></li>
                    <li className="member-card__userinfo-container column column--userinfo">
                        <div className="member-card__userinfo-subcontainer">
                            <img src={user.profilePicture} alt={`${user.firstName}'s avatar`} className="member-card__avatar"/>
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

