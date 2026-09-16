import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const USERS_COLLECTION = 'users';

export async function createUserProfile(uid, email, profile) {
  await setDoc(doc(db, USERS_COLLECTION, uid), {
    fullName: profile.fullName,
    birthDate: profile.birthDate,
    institutionalId: profile.institutionalId,
    photoURL: profile.photoURL,
    email,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function getUserProfile(uid) {
  const snapshot = await getDoc(doc(db, USERS_COLLECTION, uid));
  if (!snapshot.exists()) {
    return null;
  }
  return { uid, ...snapshot.data() };
}

export async function updateUserProfile(uid, profile) {
  await updateDoc(doc(db, USERS_COLLECTION, uid), {
    ...profile,
    updatedAt: serverTimestamp(),
  });
}
