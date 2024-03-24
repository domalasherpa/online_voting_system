const express = require('express')
const jwt = require('jsonwebtoken')

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.set('view engine', 'ejs');

let user = {
    id: "01",
    email: "dawalama@gmail.com",
    password: "nhono"
}

const JWT_SECRET = "super secret.."

app.get('/',(req,res) => {
    res.send("Hello World!")
})

app.get("/forget-password", (req , res , next)=>{
    res.render("forget-password")
})

app.post("/forget-password", (req , res , next)=>{
    const {email} = req.body

    //make sure user exists in db
    if(email !== user.email ){
        res.send("user not found!!");
        return;
    }

    //user exists then create one time link valid for 5 minutes
    const secret = JWT_SECRET + user.password  //unique secretkey for everyuser
    const payload = {
        email: user.email,
        id: user.id
    }

    const token = jwt.sign(payload, secret , {expiresIn: "15m"})

    const link = `http://localhost:3000/reset-password/${user.id}/${token}`;
    console.log(link)
    res.send("password reset link has been sent!");
})

app.get("/reset-password/:id/:token", (req , res , next)=>{
    const {id,token} = req.params;
    
    //check if this id exists in db
    if(id !== user.id){
        res.send("Invalid ID");
        return;
    }
    //valid id and have valid user with this id
    const secret = JWT_SECRET + user.password;
    try{
        const payload = jwt.verify(token , secret);
        res.render("reset-password", {email: user.email});
    }catch(e){
        console.log(e.message);
        res.send(e.message)
    }

})

app.post("/reset-password/:id/:token", (req , res , next)=>{
    const {id,token} = req.params;
    const {password,password2} = req.body;

    //check if this id exists in db
    if(id !== user.id){
        res.send("Invalid ID");
        return;
    }

    const secret = JWT_SECRET + user.password;
    try {
        const payload = jwt.verify(token,secret);
        //validate password and pass2 should match
        //find the user with the pauload email and id and update with new password
        //always hash the passsword before saving
        user.password = password;
        res.send(user);
        
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
    
})


app.listen(3000, ()=> console.log("http://localhost:3000"));