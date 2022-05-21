const express = require('express')
const cors = require('cors')
const app = express()
const { DBURL } = require('./config/db.config');


var corsOption = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOption));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const db = require('./model');
const Role = db.role;

db.mongoose.connect(DBURL)
.then(()=>{
    console.log("Successfully connected to database");
    initial()
})
.catch(err=>{
    console.error(err);
    process.exit;
})

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.get('/', (req,res)=>{
    res.json({message: "welcome to my page"})
})


app.listen(8080,()=>{
    console.log("server is running.......");
})

function initial(){
        Role.estimatedDocumentCount((err,count)=>{
            if(!err && count===0){
                new Role({
                    name:"user"
                }).save(err=>{
                    if(err) console.log("error"+err);
                    else console.log("added user to roles collection");
                });
                new Role({
                    name:"moderator"
                }).save(err=>{
                    if(err) console.log("error"+err);
                    else console.log("added moderator to roles collection");
                });
                new Role({
                    name:"admin"
                }).save(err=>{
                    if(err) console.log("error"+err);
                    else console.log("added admin to roles collection");
                });
            }
        })
}


