import {
auth,
onAuthStateChanged,
signOut,
db,
doc,
getDoc
}
from "./firebase.js";

const area =
document.getElementById(
"userArea"
);

if(area){

onAuthStateChanged(
auth,
async (user)=>{

    
window.currentUser = user;

if(user){

const userRef =
doc(
db,
"users",
user.uid
);

const snap =
await getDoc(userRef);

const username =
snap.exists()
? snap.data().username
: user.email.split("@")[0];

area.innerHTML = `

<div class="account-box">

<div class="account-avatar">

${username[0].toUpperCase()}

</div>

<span>

${username}

</span>

<button
class="logout-btn"
onclick="logout()">

Logout

</button>

</div>

`;

}else{

area.innerHTML = `

<a
href="login.html"
class="nav-icon">

👤 Login

</a>

`;

}

}

);

}

window.logout =
async function(){

await signOut(auth);

location.reload();

};
