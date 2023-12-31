import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Todo from "./components/Todos";
import React, { Component } from "react";
import Headers from "./components/layout/Headers";
import AddTodo from "./components/AddTodo";
import About from "./components/pages/About";
import axios from "axios";

class App extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=25").then((res) => {
      this.setState({ todos: res.data });
    });
  }

  // Toggle Completed
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };

  // Delete Todo
  delTodo = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) =>
        this.setState({
          todos: [...this.state.todos.filter((todo) => todo.id !== id)],
        })
      );
  };

  // Add Todo
  addTodo = (title) => {
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title,
        completed: false,
      })
      .then((res) => this.setState({ todos: [...this.state.todos, res.data] }));
  };

  render() {
    return (
      <Router>
        <div>
          <div className="container">
            <Headers />
            <Routes>
              <Route
                path="/"
                Component={(props) => (
                  <React.Fragment>
                    <AddTodo addTodo={this.addTodo} />
                    <Todo
                      todos={this.state.todos}
                      markComplete={this.markComplete}
                      delTodo={this.delTodo}
                    />
                  </React.Fragment>
                )}
              />
              <Route path="/about" Component={About} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
