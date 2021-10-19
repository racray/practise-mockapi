document.body.innerHTML = `
<div class="user-form">
    <input class="add-user-name" placeholder="Enter your name">
    <input class="add-user-avatar" placeholder="Enter your pic URL">
    <button class="btn btn-info" onclick="addUser()"> ADD USER</button>
</div>    
<section class="user-list"></section>
`;


async function getusers() {
    const data = await fetch("https://6166c4d713aa1d00170a66f5.mockapi.io/users");
    const users = await data.json();
    
    const usercontainer = document.querySelector(".user-list");
    usercontainer.innerHTML = "";


    users.forEach((user) => {

        usercontainer.innerHTML += `
        <div class="user-container">
            <img  class="user-avatar" src="${user.avatar}">
            <div>
                <p class="user-name"> ${user.name}</p>
                <button class="btn btn-primary" onClick="toggleUser(${user.id})">EDIT</button>
                <button class="btn btn-warning" onClick="deleteUser(${user.id})">DELETE</button>
                <div class="edit-user-form edit-${user.id}">
                    <input value="${user.name}" class="edit-${user.id}-user-name" placeholder="Enter Your Name">
                    <input value="${user.avatar}" class="edit-${user.id}-user-avatar" placeholder="Enter Your Pic URL">
                    <button class="btn btn-secondary" onclick="saveUser(${user.id})"> SAVE </button>
                </div>    
            </div>
        </div>`;

    });

}

getusers();


async function deleteUser(userid){
    console.log(userid,"Deleting");
    const data = await fetch("https://6166c4d713aa1d00170a66f5.mockapi.io/users/" + userid,
    {method: "DELETE"}
    );
    getusers();
}

async function addUser(){
    
    const userName = document.querySelector(".add-user-name").value;
    const userAvatar = document.querySelector(".add-user-avatar").value;
    const data = await fetch("https://6166c4d713aa1d00170a66f5.mockapi.io/users",{
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body : JSON.stringify({ name: userName, avatar: userAvatar})
    });
    getusers();

}

function toggleUser(userid){
    const edituserform = document.querySelector(`.edit-${userid}`);
    console.log(edituserform.style.display);
    edituserform.style.display = edituserform.style.display === "block" ? "none" : "block";
}

async function saveUser(userid){

    const data = await fetch("https://6166c4d713aa1d00170a66f5.mockapi.io/users/" + userid,
    {method: "DELETE"}
    );
    const username = document.querySelector(`.edit-${userid}-user-name`).value;
    const useravatar = document.querySelector(`.edit-${userid}-user-avatar`).value;
    const data2 = await fetch("https://6166c4d713aa1d00170a66f5.mockapi.io/users/",{
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({name: username, avatar: useravatar, id: userid})
    });

    getusers();


}