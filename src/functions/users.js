import {db} from '../firebase-config';
import {collection, getDocs, doc, getDoc, setDoc, addDoc, deleteDoc} from 'firebase/firestore';

async function doesUserExist(snapshot) {
    if (!snapshot.exists()) throw new Error('User not found.');
}

// Change 'Users' path to appropriate users path when the collection is created
async function getUsers() {
    const usersCollection = collection(db, 'Users');
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map(doc => doc.data());
    return usersList;
}

async function getUserById(id) {
    const userRef = doc(db, 'Users', id);
    const userSnapshot = await getDoc(userRef);
    doesUserExist(userSnapshot);
    return userSnapshot.data();
}

async function addUser(user) {
    if (!user.fullName || !user.email) {
        throw new Error('User must have a name and an email address.');
    }
    const newUserRef = await addDoc(collection(db, 'Users'), user);
    return newUserRef.id;
}

// The shouldMerge parameter is optional and defaults to false.
// If set to true, the user object will be merged with the existing document and will not overwrite any existing fields.
// If set to false, the user object will overwrite the existing document.
async function updateUser(id, user, shouldMerge = false) {
    const userRef = doc(db, 'Users', id);
    const userSnapshot = await getDoc(userRef);
    doesUserExist(userSnapshot);
    await setDoc(userRef, user, {merge: shouldMerge});
}

async function deleteUser(id) {
    const userRef = doc(db, 'Users', id);
    const userSnapshot = await getDoc(userRef);
    doesUserExist(userSnapshot);
    await deleteDoc(userRef);
}

export {getUsers, getUserById, addUser, updateUser, deleteUser};

