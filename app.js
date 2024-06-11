const express = require('express');
const authRouter = require('./routes/authRouter');
const morgan = require('morgan');
const messageRouter = require('./routes/messageRouter');
const usersRouter = require('./routes/usersRouter');
const cors = require('cors');
const { app } = require('./socket/socket');


app.use(cors())
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/auth/',authRouter);
app.use('/api/messages/',messageRouter);
app.use('/api/users/',usersRouter);

app.all('*', (req, res) => {
    return res.status(404).json({ message: `can't find ${req.originalUrl} on the server!` })
 })

module.exports = app;