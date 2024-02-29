const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());

// Routes

// Create a record
app.post("/todos", async (req, res) => {
  try {
    const { c_name, age, phone, loc, created_at } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO main_table (c_name, age, phone, loc, created_at) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [c_name, age, phone, loc, created_at]
    );

    res.json(newTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get all records
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM main_table");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a record
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM main_table WHERE id = $1", [
      id,
    ]);
    res.json(todo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// update a record
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { c_name, age, phone, loc, created_at } = req.body;
    const updateTodo = await pool.query(
      `UPDATE main_table
      SET c_name = $1, age = $2, phone = $3, loc = $4, created_at = $5
      WHERE id = $6`,
      [c_name, age, phone, loc, created_at, id]
    );
    res.json("Record Updated")
  } catch (err) {
    console.error(err.message);
  }
});

// delete a record
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM main_table WHERE id = $1",
      [id]
    );
    res.json("Record deleted")
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`Listening to port at ${port}`);
});
