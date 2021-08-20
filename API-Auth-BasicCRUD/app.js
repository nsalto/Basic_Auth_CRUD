const express = require('express');
const mongoose = require('mongoose');
const bodyParser =  require('body-parser');
const cors = require('cors');

// From files
const { MONGODB } = require('./config');
const itemRoutes = require('./routes/items');
const userRoutes = require('./routes/user');
const auth = require('./middleware/auth');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

// Middeware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

// Item Routes
app.use('/api/item',auth, itemRoutes);
app.use('/auth', userRoutes)

// Conect to te DB
mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to mongodb');
        return app.listen(3300);
    })
    .then(() => console.log('server running at 3300'))
    .catch(err => console.log(err.message));

 