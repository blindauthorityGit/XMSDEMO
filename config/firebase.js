import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, addDoc } from "firebase/firestore/lite";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_FIREBASE,
    authDomain: "xms-demo-a0470.firebaseapp.com",
    projectId: "xms-demo-a0470",
    storageBucket: "xms-demo-a0470.appspot.com",
    messagingSenderId: "393129373475",
    appId: "1:393129373475:web:c475a3c61850c2570e2696",
    measurementId: "G-6DKJL190MK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };

export const fetchFirestoreData = async (collectionName) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};
