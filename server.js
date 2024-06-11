const dotenv=require('dotenv')
dotenv.config({path:'./.env'})
const app = require('./app');
const connectDB = require('./db/connect');
const { server } = require('./socket/socket');


connectDB()
const PORT = process.env.PORT
server.listen(PORT,()=>{
    console.log(`server running in : ${PORT}`)   
});   