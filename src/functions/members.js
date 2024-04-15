import {db} from '../firebase-config';
import { collection, getDocs, doc, getDoc, setDoc, addDoc, deleteDoc } from 'firebase/firestore';

async function doesMemberExist(snapshot) {
    if (!snapshot.exists()) throw new Error('Member not found.');
}

// Change 'Users' path to appropriate members path when the collection is created
async function getMembers() {
    const membersCollection = collection(db, 'Users');
    const membersSnapshot = await getDocs(membersCollection);
    const membersList = membersSnapshot.docs.map(doc => doc.data());
    return membersList;
}

async function getUserById(id) {
    const userRef = doc(db, 'Users', id);
    const userSnapshot = await getDoc(userRef);
    doesMemberExist(userSnapshot);
    return userSnapshot.data();
}

async function addMember(member) {
    if (!member.fullName || !member.email) {
        throw new Error('Member must have a name and an email address.');
    }
    const newMemberRef = await addDoc(collection(db, 'members'), member);
    return newMemberRef.id;
}

// The shouldMerge parameter is optional and defaults to false.
// If set to true, the member object will be merged with the existing document and will not overwrite any existing fields.
// If set to false, the member object will overwrite the existing document.
async function updateMember(id, member, shouldMerge = false) {
    const memberRef = doc(db, 'members', id);
    const memberSnapshot = await getDoc(memberRef);
    doesMemberExist(memberSnapshot);
    await setDoc(memberRef, member, { merge: shouldMerge });
}

async function deleteMember(id) {
    const memberRef = doc(db, 'members', id);
    const memberSnapshot = await getDoc(memberRef);
    doesMemberExist(memberSnapshot);
    await deleteDoc(memberRef);
}

export { getMembers, getUserById, addMember, updateMember, deleteMember };