import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Keerthi@12',
    database: 'momentum'
})

conn.connect((err) => {
    if (err) {
        console.error('Error connecting to Database:', err)
        return
    }
    console.log('Connected to Database')
})

const app = express()
app.use(cors());
app.use(express.json());
const port = 3000

app.post('/tasks/update', (req, res) => {
    const { taskid } = req.body;
    conn.query(
        'UPDATE tasks SET status = "completed" WHERE taskid = ?',
        [taskid],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error updating task");
            }
            res.json({ message: "Task updated successfully" });
        }
    );
});


app.post('/tasks', (req, res) => {
    const { user_id } = req.body;

    conn.query(
        'SELECT * FROM tasks WHERE userid = ? ORDER BY due_date',
        [user_id],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error fetching tasks");
            }
            console.log("Tasks fetched for user_id:", user_id);
            res.json(results);
        }
    );
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});