const form =
   document.getElementById("userForm");

form.addEventListener("submit" , function(event) {
    event.preventDefault();

    const username =
     document.getElementById("username").value;
    const password =
     document.getElementById("password").value;


     console.log(username);
     console.log(password);

     const user = {
        username : username,
        password : password
     };

     fetch("http://localhost:3000/users" , {

        method: "POST",
        headers : {
            "Content-Type" : "application/json"
        },

        body : JSON.stringify(user)
            
     })
     .then(res => res.json())
     .then(data => {
        console.log(data);
        alert(data.message);
     });

});