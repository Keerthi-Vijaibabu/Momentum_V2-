import "./Tasks.css";

function Tasks() {
  const tasks = [
    { id: 1, title: "Design Dashboard UI", priority: "High", completed: false },
    {
      id: 2,
      title: "Implement Navbar Routing",
      priority: "Medium",
      completed: true,
    },
    { id: 3, title: "Workout", priority: "Low", completed: false },
    { id: 4, title: "Read 20 pages", priority: "Low", completed: false },
  ];

  return (
    <div className="tasks-container">
      <h1 className="tasks-title">Tasks</h1>

      {/* Add task section */}
      <div className="task-input-section">
        <input
          type="text"
          placeholder="Add a new task..."
          className="task-input"
        />
        <button className="add-task-btn">Add Task</button>
      </div>

      {/* Task list */}
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <div className="task-left">
              <input type="checkbox" checked={task.completed} readOnly />

              <span
                className={`task-title ${task.completed ? "completed" : ""}`}
              >
                {task.title}
              </span>
            </div>

            <span className={`priority ${task.priority.toLowerCase()}`}>
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
