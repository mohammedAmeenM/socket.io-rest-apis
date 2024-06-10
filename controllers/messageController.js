const Conversation = require('../models/coversationSchema');
const Message = require('../models/messageSchema');


const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const senderId = req.userId;
        const receiverId = req.params.id;
        
        // Check if message is not empty
        if (!message) {
            return res.status(400).json({
                status: 'failure',
                message: 'Message content is required'
            });
        }

        // Find or create a conversation
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });
        
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        // Create a new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        // Save message and update conversation
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json({
            status: 'success',
            message: 'Message sent successfully',
            newMessage
        });
    } catch (error) {
        console.error('Error sending message:', error.message);
        res.status(500).json({
            status: 'failure',
            message: 'Internal server error',
            error_message: error.message
        });
    }
};


const getMessages = async (req,res) =>{
    try {
        const userToChatId = req.params.id;
        const senderId = req.userId;
        console.log(senderId)
        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,userToChatId] },
        }).populate("messages")
        if(!conversation){
            return res.status(400).json({
                status:'failure',
                message:'Somthing went wrong'
            })
        }
        res.status(200).json({
            status:'success',
            message:'Successfully fetch messages',
            messages:conversation.messages
        })
    } catch (error) {
        res.status(500).json({
            status:'failure',
            message:"internal server error",
            error_message:error.message
        })
    }
}

module.exports = {sendMessage , getMessages}