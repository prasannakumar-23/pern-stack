//import fetch from "cross-fetch";

const express = require("express");
const app = express(); //USED EXPRESS HERE TO CREATE A ROUTE TO GET THE STORED DATA FROM DATABASE
const cors = require("cors");
const pool = require("./db");
//const { json } = require("express");
const https = require("https");

app.use(cors());
app.use(express.json());

const url = "https://api.wazirx.com/api/v2/tickers";

https
  .get(url, (res) => {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("end", () => {
      data = JSON.parse(data);
      //console.log("data fetched");
      console.log("data fetched", data[Object.keys(data)[0]]); //PRINTS THE FIRST OBJECT OF JSON ARRAY
    });
  })
  .on("error", (err) => {
    console.log(err.message);
  })
  .end();

//fetch(url)
//.then((res) => res.json())
//.then((out) => {
//console.log("Checkout this JSON! ", out);
//})
//.catch((err) => {
//throw err;
//});

//store data into database

app.post("/todos", async (req, res) => {
  for (let i = 0; i < 10; i++) {
    try {
      const { description } = data[Object.keys(data)[i]];
      const newTodo = await pool.query(
        "INSERT INTO todo (description) VALUES($1) RETURNING *",
        [description]
      );

      res.json(newTodo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  }
});

//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(8000, () => {
  console.log("listening on port 8000");
});
