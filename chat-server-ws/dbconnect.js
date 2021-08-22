const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/chat";
const secretKey = '123456';

const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to mongodb');
    })
    .then(() => console.log('Server running at 3300'))
    .catch(err => console.log(err.message));

module.exports = {
    connect,
    secretKey
};