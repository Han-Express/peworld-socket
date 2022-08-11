import { Server } from "socket.io";

const port = process.env.PORT || 3001 

const io = new Server({
    cors: {
        origin: ["http://localhost:3000", "https://han-express-peworld.netlify.app"]
    }
});

let onlineUsers = [];

const addnewUser = (userId, socketId) => {
    !onlineUsers.some((user)=> user.userId === userId) && 
        onlineUsers.push({userId, socketId})
}

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId)
}

const getUser = (userId) => {
    return onlineUsers.find((user) => user.userId == userId)
}

io.on("connection", (socket) => {    
    
    console.log("conected")
    
    socket.on("newUser", (userId) => {
        addnewUser(userId, socket.id)
        
        console.log(onlineUsers)
    })



    socket.on("sendMessage", ({userId, receiverId, message, header}) => {
        const receiver = getUser(receiverId);
        console.log(receiver)
        io.to(receiver?.socketId).emit("getMessage", {
            userId,
            message, 
            header
        })
    })


  socket.on("disconnect", () => {
    removeUser(socket.id)
    console.log("someonehas disconnected")
  })
});

io.listen(port);