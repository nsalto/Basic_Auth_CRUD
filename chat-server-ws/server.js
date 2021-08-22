//require the express module
const express = require("express");
const app = express();
const chatRouter = require("./routes/chatroute");
const userRoutes = require('./routes/user');
const cors = require('cors');

//require the http module
const http = require("http").Server(app);

// require the socket.io module
const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
      }
});

const socket_port = 5000;
const server_port = 3300;

// middleware
app.use(express.json());
const auth = require('./middleware/auth')

//routes
app.use("/chats", chatRouter);
app.use('/auth', userRoutes);

//database connection
const Chat = require("./models/Chat");
const { connect } = require("./dbconnect");

//setup socket
const users = [];
io.on('connection', (socket) => {
    console.info('New socket connected');

    socket.on('login', username => {
                
        if(users.find(name => name == username)) {
            console.log('user exists')
            socket.emit('USER EXISTS');
            return
        }
        socket.username = username;
        users.push(username);
        
        // Emit username, users
        socket.emit('LOGIN',{
            username: socket.username,
            users
        });

        // Someone is joined
        socket.broadcast.emit('USER_JOINED', {
            username: socket.username,
            users
        });

        // message
        socket.on('NewMessage', (message) => {
            socket.broadcast.emit('NEW_MESSAGE', {
                message: `${message}`,
                username: socket.username
            });
            socket.emit('NEW_MESSAGE', {
                message: `${message}`,
                username: socket.username
            });

            //save chat to the database
            connect.then(db => {
                console.log("Message saved");
                let chatMessage = new Chat({ message: message, sender: username });
        
                chatMessage.save();
            })
            .catch(err => console.log(err.message));
        });

        // user was disconected
        socket.on('disconected',() => {
            if(users[socket.username]) {
                delete users[socket.username];
                socket.broadcast.emit('USER_LEFT', {
                    username: socket.username,
                    users
                })
            }
         });

    });
})

// socket server
http.listen(socket_port, () => {
    console.log("Socket running on Port: " + socket_port);
});

app.listen(server_port, () => {
    console.log("Server running on Port: " + server_port);
});
