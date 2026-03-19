import { useState, useEffect } from "react";
import "./TaskList.css";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  const toggleTask = async (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.taskid === id ? { ...task, completed: !task.completed } : task,
      ),
    );

    try {
      const res = await fetch("http://localhost:3000/tasks/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskid: id }),
      });

      if (!res.ok) {
        throw new Error("Failed to update task");
      }
    } catch (err) {
      console.error("Error updating task:", err);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.taskid === id ? { ...task, completed: !task.completed } : task,
        ),
      );
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:3000/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: 1,
          }),
        });
        const data = await res.json();

        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        // setLoading(false);
      }
    };

    fetchTasks();
  }, []);
  return (
    <section className="card tasks-card">
      <div className="card-header">
        <h2>Tasks</h2>
        <span className="card-badge">{tasks.length} tasks</span>
      </div>
      <div className="tasks-list">
        {tasks.map((task) => (
          <div
            key={task.taskid}
            className="task-item"
            onClick={() => toggleTask(task.taskid)}
          >
            <div className="task-left">
              <div
                className={`task-status ${
                  task.completed ? "completed" : "pending"
                }`}
              />
              <div>
                <h3>{task.title}</h3>
                <p>{task.time}</p>
              </div>
            </div>
            <span className={task.completed ? "done-text" : "pending-text"}>
              {task.completed ? "Done" : "Pending"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TaskList;
