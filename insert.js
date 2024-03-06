const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'online-voting';
client.connect();
console.log("connected to client sucessfully");
const db = client.db(dbName);
const collection = db.collection('users');


class Users{
    myColl = db.collection('users');

    constructor(fullname, email, phone_no, password, photopath, verified){
        this.fullname = fullname;
        this.email = email;
        this.phone_no = phone_no;
        this.password = password;
        this.photopath = photopath;
        this.verified = verified;
    }

    async save(){
        try{
            await this.myColl.insertOne({
                

                    "name": this.fullname,
                    "email":this.email,
                    "phone number": this.phone_no,
                    "password": this.password,
                  "photopath":this.photopath,
                  "verified":this.verified
            });
            console.log("User sucessfully registered.");
        }catch(error){
            if(error instanceof MongoClient){
                console.error("Unable to insert data");
                throw error;    
            }
            
        }finally{
            client.close();
        };
    }

}

// module.exports = Users;
u = new Users("dawa lama", "lama6@gmail.com", "123", "999", "a", "true");
save = u.save();