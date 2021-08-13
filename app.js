const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
var fs = require('fs');
var cors = require('cors')

app.use(cors())

app.use(cookieParser());
app.use(express.json());

const userRouter = require('./routes/user');
app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.send("routes working")
});

app.listen(5000, () => {
    console.log('express server started');
});