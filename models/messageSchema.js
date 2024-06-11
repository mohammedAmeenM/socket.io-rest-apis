const mongoose =  require('mongoose');


const messageSchame = mongoose.Schema ({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    message:{
        type:String,
        required:true 
    }
},{
    timestamps:true
});

const Message = mongoose.model ('Message',messageSchame);
module.exports = Message;