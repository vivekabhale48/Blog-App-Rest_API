const express = require('express');
const app = express();
const port = process.env.port || 3000;
const todoRoute = require('./routes/todoRoutes');
const logRoute = require('./routes/registration&loginRoute');
const commentRoute = require('./routes/commentRoute');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const authMiddleWare = (req, res, next) => {
    const secretKey = process.env.SECRET_KEY;
    const token = req.header('Authorization') || '';
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
    const decode = jwt.decode(token, secretKey);
    if (!decode) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
    req.user = decode;
    next();
}



app.use('/todo',authMiddleWare, todoRoute);

app.use('/', logRoute);

app.use('/comment',authMiddleWare, commentRoute );



mongoose.connect('mongodb://localhost/angularTodo')
    .then(() => {
        app.listen(port, () => {
            console.log('Connected to port :', port);
        })
    })
    .catch((err) => {

        console.log('db not connected');

    })





