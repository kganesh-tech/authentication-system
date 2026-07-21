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

app.listen(3000 , () => {
    console.log(`server is running on 3000`);
});