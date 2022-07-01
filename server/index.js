const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());



// ROUTES

// create user with data
//function to return user data:
function userData (arr) {
    for(let i = 0; i<arr.length ; i++){
        if(typeof(arr[i])=="string") arr[i] = "\'"+arr[i]+"\'";
    }
    return arr;
}

app.post("/userpage1", async(req, res) => {
    try{
        const userinfo = req.body;
        const newUser = await pool.query(
            "INSERT INTO users(" + Object.keys(userinfo).toString() + ") VALUES (" + userData(Object.values(userinfo)).toString() + ") RETURNING *"
        ) ;
        res.json(newUser.rows[0]);
    } catch(err) {
        console.error(err.message);
    }
})

// get all user info
app.get("/userpage2", async(req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// get one user data
app.get("/userpage2/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// delete user data
app.delete("/userpage2/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await pool.query("DELETE FROM users WHERE user_id = $1", [id]);
        res.json("User Data Deleted!");
    } catch (err) {
        console.log(err.message);        
    }
})

//on starting/editing app
app.listen(5000, () => {
    console.log("Server started port 5000");
});

