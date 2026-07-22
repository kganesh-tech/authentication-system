const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/users" , (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    fs.readFile("users.json", "utf-8" , (err , data) => {
        if(err) {
           return res.status(500).json({
                message: "error in file reading"
            });
        }
        const users = JSON.parse(data);

        users.push ({
            username : username,
            password : password 
        });

        fs.writeFile("users.json" , JSON.stringify(users , null , 2) , (err) => {
            if(err) {
                res.status(400).json({
                    message : "error in saving user"
                });
            }
            res.json({
                message : "user saved successfully"
            });
        });
    });
});

app.get("/users" , (req, res) => {
    fs.readFile("users.json" , "utf-8" , (err, data) => {
        if(err) {
            return res.status(500).json({
                     message: "Error reading file"
            });
        }

        const users = JSON.parse(data);
        res.json(users);
    });

});

app.put("/users", (req,res) => {
    const oldUsername = req.body.oldUsername;
    const newUsername = req.body.newUsername;
    const newPassword = req.body.newPassword;

fs.readFile("users.json" , "utf-8" , (err,data) => {
    if(err) {
        return res.status(400).json({
            message : "unable to read the file"
        });
    }

    let users = JSON.parse(data);

    users.forEach(user => {
        if(user.username === oldUsername) {
            user.username = newUsername;
            user.password = newPassword;
        }
    });
    fs.writeFile("users.json" , JSON.stringify(users, null, 2), (err) => {
        if(err) {
            return res.status(500).json({
                message: "unable to update user"
            });
        }
        res.json({
            message: "User updated successfully"
        });
    });
});


});

app.delete("/users/:username", (req,res) => {
    const username =
        req.params.username;
    
      fs.readFile("users.json" , "utf-8" , (err,data) => {
         if(err) {
            return res.status(400).json({
                message : "Unable to read a file"
            });
         }
         let users = JSON.parse(data);
         users = users.filter(user => user.username !== username);

         fs.writeFile("users.json" , JSON.stringify(users , null , 2), (err) => {
            if(err) {
                return res.status(500).json ({
                      message : "Error deleting user"
                });
            }
            res.json({
                message: "User deleted successfully"
            });
         });
      });
});

app.listen(3000 , () => {
    console.log(`server is running on 3000`);
});