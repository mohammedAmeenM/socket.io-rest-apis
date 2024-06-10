const express = require('express');
const authRouter = require('./routes/authRouter');
const app = express();
const morgan = require('morgan');
const messageRouter = require('./routes/messageRouter');
const usersRouter = require('./routes/usersRouter');
const cors = require('cors')


app.use(cors())
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/auth/',authRouter);
app.use('/api/messages/',messageRouter);
app.use('/api/users/',usersRouter);


module.exports = app;