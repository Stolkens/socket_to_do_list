import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import shortid from 'shortid';

const App = () => {

  const [socket, setSocket] = useState('');
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('')

  useEffect(() => {
    const newSocket = io(process.env.PORT || "http://localhost:8000/");
    setSocket(newSocket);
    
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('addTask', (task) => {
        addTask(task);
      });
      socket.on('removeTask', (taskId) => {
        removeTask(taskId);
      });
      socket.on('updateData', (tasksList) => {
        updateTasks(tasksList);
      });
      console.log('po useeffect',tasks);
    }
  }, [socket]);


  const updateTasks = tasks => {
    setTasks(tasks);
  };

  const removeTask = (id) => {
    setTasks(tasks => tasks.filter(task => task.id !== id));
    if(socket) {
      socket.emit('removeTask', id);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    addTask({name: taskName, id: shortid()});
    socket.emit('addTask', {name: taskName, id: shortid()});
    setTaskName('');
  };

  const addTask = (task) => {
    setTasks(tasks => [...tasks, task]);
  };

  return (
    <div className="app">
      <header className="app-title">
        <h1>My to do list</h1>
      </header>
      <section className="tasks-section" id="tasks-section">
        <h2>Tasks</h2>
        <ul className="tasks-list" id="tasks-list">
          {tasks.map(task => <li className="task" key={task.name}>{task.name}<button className="btn btn-red" onClick={() => removeTask(task.id)} >Remove</button></li>)}
        </ul>
        <form id="add-task-form" onSubmit={(e) => submitForm(e)}>
          <input className="text-input" type="text" placeholder="add task" id="task-name" value={taskName} onChange={(e) => setTaskName(e.target.value)}></input>
          <button className="btn" type="submit">Add task</button>
        </form>
      </section>
    </div>
  );
}

export default App;
