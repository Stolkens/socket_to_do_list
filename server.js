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

    io.to(socket.id).emit('updateData', tasks);

    socket.on('addTask', (taskData) => { 
        
        tasks.push({name: taskData.name, taskDataId: taskData.id});

        socket.broadcast.emit('addTask', taskData + ' was added to tasks');
    
      });

      socket.on('removeTask', (taskDataId) => { 
        
        const taskIndex = tasks.findIndex(task => taskDataId === task.id);
        const taskName = tasks.findIndex(task => taskName === task.name);
        if(taskIndex !== -1) {
          tasks.splice(taskIndex, 1);
          socket.broadcast.emit('removeTask', taskName + ' was removed from tasks');
        }
    
      });

  })