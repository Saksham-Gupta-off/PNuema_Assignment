const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client/build")));

if (process.env.NODE_ENV == "production") {
    //server static content
    app.use(express.static(path.join(__dirname, "client/build")));
}


// ROUTES

// create user with data
//function to return user data:
function userData (arr) {
    for(let i = 0; i<arr.length ; i++){
        if(typeof(arr[i])=="string") arr[i] = "\'"+arr[i]+"\'";
    }
    return arr;
}

app.post("/userpage", async(req, res) => {
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
app.get("/userpage", async(req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// get one user data
app.get("/userpage/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// delete user data
app.delete("/userpage/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await pool.query("DELETE FROM users WHERE user_id = $1", [id]);
        res.json("User Data Deleted!");
    } catch (err) {
        console.log(err.message);        
    }
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

//on starting/editing app
app.listen(PORT, () => {
    console.log(`Server started port ${PORT}`);
});
