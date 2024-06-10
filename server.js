const dotenv=require('dotenv')
dotenv.config({path:'./.env'})
const app = require('./app');
const connectDB = require('./db/connect');


connectDB()
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server running in : ${PORT}`)  
});   