const mongoose=require("mongoose")
const dotenv = require('dotenv');

require('dotenv').config();

const dburl = process.env.MONGODB_URI;
console.log(dburl);
mongoose.connect(dburl, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
}).then(()=>{
    console.log(`Connection done`)
}).catch((e)=>{
    console.log(`connection failed`)
})

module.exports=mongoose;