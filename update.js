const form =
  document.getElementById("updateForm");
const params =
   new URLSearchParams(window.location.search);
   const oldUsername =
    params.get("username");
    console.log(oldUsername);



 form.addEventListener("submit" , function(event) {
    event.preventDefault();

    const newUsername = 
     document.getElementById("username").value;
    const newPassword = 
     document.getElementById("password").value;
    fetch("http://localhost:3000/users" ,  {
        method : "PUT" ,
        headers : {
            "Content-Type" : "application/json"
        },

        body : JSON.stringify({
            oldUsername : oldUsername,
            newUsername : newUsername,
            newPassword : newPassword
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });
 });