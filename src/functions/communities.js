import {db} from '../firebase-config';
import { collection, getDocs, doc, getDoc, setDoc, addDoc, deleteDoc } from 'firebase/firestore';

async function doesCommunityExist(snapshot) {
    if (!snapshot.exists()) throw new Error('Community not found.');
}

async function getCommunities() {
    const communitiesCollection = collection(db, 'Communities');
    const communitiesSnapshot = await getDocs(communitiesCollection);
    const communitiesList = communitiesSnapshot.docs.map(doc => doc.data());
    return communitiesList;
}

async function getCommunityById(id) {
    const communityRef = doc(db, 'Communities', id);
    const communitySnapshot = await getDoc(communityRef);
    doesCommunityExist(communitySnapshot);
    return communitySnapshot.data();
}

export { getCommunities, getCommunityById };
