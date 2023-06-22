const express = require('express');
const socket = require('socket.io');
const path = require('path');

const app = express();

let tasks = [];

const server = app.listen(8000, () => {
  console.log('Server is running...');
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('we got new socket!' + socket.id);

    io.to(socket.id).emit('updateData', tasks);
    console.log('tasks',tasks)

    socket.on('addTask', (taskData) => { 
        
        tasks.push({name: taskData.name, taskDataId: socket.id});

        socket.broadcast.emit('addTask', taskData + ' was added to tasks');
    
      });

      socket.on('removeTask', (taskDataId) => { 
        
        const taskIndex = tasks.findIndex(task => taskDataId === task.taskDataId);
        
        if(taskIndex !== -1) {
          const taskName = tasks[taskIndex].name;
          tasks.splice(taskIndex, 1);
          socket.broadcast.emit('removeTask', taskName + ' was removed from tasks');
        }
    
      });

  })