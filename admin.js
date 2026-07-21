const showUsersBtn = 
document.getElementById("showUsersBtn");

showUsersBtn.addEventListener("click" , function()  {

    fetch("http://localhost:3000/users" , {
        method : "GET" ,
    })

        .then(res => res.json())
        .then(data => {
            
            

            const tableBody =
              document.getElementById("tableBody");

            tableBody.innerHTML = "";

            data.forEach(user => {
                console.log(user.username);
                console.log(user.password);

                const row =
                  document.createElement("tr");
                
                  row.innerHTML = `
                  <td>${user.username}</td>
                  <td>${user.password}</td>
                  
                  <td> <button class = "updateBtn">Update</button>
                  <button class ="deleteBtn">Delete</button>
                  </td>`;

                  tableBody.appendChild(row);
            });

        })
        .catch(error => {
            console.log(error);
        });
        
});


