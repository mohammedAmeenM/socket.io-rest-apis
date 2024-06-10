const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const authSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
},
{
    timestamps: true,
});

authSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        next();
    } catch (error) {
        console.error('Error hashing password:', error);
        next(error);
    }
});

const User = mongoose.model('User',authSchema);
module.exports = User;
