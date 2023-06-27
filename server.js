const express = require('express');
const socket = require('socket.io');

const app = express();

let tasks = [];

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('we got new socket! ' + socket.id);

    io.to(socket.id).emit('updateData', tasks);
    console.log('tasks server',tasks)

    socket.on('addTask', (taskData) => { 
        
        tasks.push({name: taskData.name, id: taskData.id});

        socket.broadcast.emit('addTask', taskData + ' was added to tasks');
    
      });

      socket.on('removeTask', (taskDataId) => { 

        tasks = tasks.filter( task=> task.id !== taskDataId);

        socket.broadcast.emit('removeTask', taskDataId + ' was removed from tasks');

        console.log('tasks po usunieciu', tasks);
    
      });

  })