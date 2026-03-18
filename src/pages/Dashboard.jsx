import "./Dashboard.css";

function Dashboard() {
  const todayTasks = [
    { id: 1, title: "Design landing page", time: "9:00 AM", completed: true },
    {
      id: 2,
      title: "Finish React dashboard UI",
      time: "11:00 AM",
      completed: true,
    },
    { id: 3, title: "Workout", time: "5:30 PM", completed: false },
    { id: 4, title: "Read 20 pages", time: "8:00 PM", completed: false },
  ];

  const weeklyProgress = 68;

  const productivityData = [
    { day: "Mon", value: 40 },
    { day: "Tue", value: 65 },
    { day: "Wed", value: 55 },
    { day: "Thu", value: 80 },
    { day: "Fri", value: 70 },
    { day: "Sat", value: 45 },
    { day: "Sun", value: 60 },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Track your day, progress, and productivity.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="card tasks-card">
          <div className="card-header">
            <h2>Today's Tasks</h2>
            <span className="card-badge">{todayTasks.length} tasks</span>
          </div>

          <div className="tasks-list">
            {todayTasks.map((task) => (
              <div key={task.id} className="task-item">
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

        <section className="card progress-card">
          <div className="card-header">
            <h2>Weekly Progress</h2>
            <span className="card-badge">{weeklyProgress}%</span>
          </div>

          <p className="card-subtext">
            You’ve completed most of your weekly goals. Keep the momentum going.
          </p>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${weeklyProgress}%` }}
            />
          </div>

          <div className="progress-meta">
            <span>0%</span>
            <span>100%</span>
          </div>
        </section>

        <section className="card chart-card">
          <div className="card-header">
            <h2>Productivity Overview</h2>
            <span className="card-badge">This Week</span>
          </div>

          <div className="chart-area">
            {productivityData.map((item) => (
              <div key={item.day} className="chart-column">
                <div className="bar-wrapper">
                  <div
                    className="chart-bar"
                    style={{ height: `${item.value}%` }}
                    title={`${item.value}%`}
                  />
                </div>
                <span className="chart-label">{item.day}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="card stats-card">
          <div className="card-header">
            <h2>Quick Stats</h2>
          </div>

          <div className="stats-grid">
            <div className="stat-box">
              <h3>12</h3>
              <p>Tasks Completed</p>
            </div>
            <div className="stat-box">
              <h3>4</h3>
              <p>Pending Tasks</p>
            </div>
            <div className="stat-box">
              <h3>5.2h</h3>
              <p>Focus Time</p>
            </div>
            <div className="stat-box">
              <h3>82%</h3>
              <p>Efficiency</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
