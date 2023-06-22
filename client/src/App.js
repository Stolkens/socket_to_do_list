
const App = () => {
  return (
    <div className="app">
      <header className="app-title">
        <h1>My to do list</h1>
      </header>
      <section className="tasks-section" id="tasks-section">
        <h2>Tasks</h2>
        <ul className="tasks-list" id="tasks-list">
          <li className="task">Wash dishes <button className="btn btn-red">Remove</button></li>
          <li className="task">Do the laundry <button className="btn btn-red">Remove</button></li>
          <li className="task">Take out the trash <button className="btn btn-red">Remove</button></li>
        </ul>
        <form id="add-task-form">
          <input className="text-input" type="text" placeholder="add task" id="task-name"></input>
          <button className="btn" type="submit">Add task</button>
        </form>
      </section>
    </div>
  );
}

export default App;
