import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
getDocs,
query,
where,
doc,
setDoc,
getDoc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {


apiKey: "AIzaSyDWQaqR6JsM1PDm13vMDuJLnZcIn7GPpZE",

authDomain:
"smurfee-5afe7.firebaseapp.com",

projectId:
"smurfee-5afe7",

storageBucket:
"smurfee-5afe7.firebasestorage.app",

messagingSenderId:
"658384225361",

appId:
"1:658384225361:web:acdf95c219f2779e86a470"


};

const app =
initializeApp(firebaseConfig);

/* FIRESTORE */

export const db =
getFirestore(app);

/* AUTH */

export const auth =
getAuth(app);

/* EXPORTS */

export {


collection,
addDoc,
getDocs,
query,
where,

doc,
setDoc,
getDoc,

createUserWithEmailAndPassword,
signInWithEmailAndPassword,

signOut,

onAuthStateChanged


};
