const addTodo = document.querySelector("#todoForm")
const submittedTodo = document.querySelector("#titleTodo")
const iltodoList = document.querySelector("#todo-list")

function init() {
  const url = "http://localhost:3000/todos"
  fetch(url)
    .then(function (response) {
      return response.json()
    })
    .then(function (todos) {
      for (const todo of todos) {
        renderListToDo(todo)
      }
    })

  addTodo.addEventListener("submit", function (event) {
    event.preventDefault()
    addSubmittedTodo(submittedTodo.value)
  })
}

init()

function addSubmittedTodo(submittedTodo) {
  const inputedTodo = {
    title: submittedTodo,
    completed: false,
  }

  const todoAsJson = JSON.stringify(inputedTodo)
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: todoAsJson,
  }
  fetch("http://localhost:3000/todos", options)
    .then(function (response) {
      return response.json()
    })
    .then(function (todos) {
      renderListToDo(todos)
    })
}

function renderListToDo(todo) {
  const todoList = document.querySelector("#todo-list")
  const li = document.createElement("li")
  const h3 = document.createElement("h3")
  const h3Text = document.createTextNode(todo.title)
  const button = document.createElement("button")
  const buttonText = document.createTextNode("INCOMPLETE")

  todoList.append(li, button)
  li.append(h3)
  h3.append(h3Text)
  button.append(buttonText)

  button.addEventListener("click", function () {
    const updateStatus = {
      completed: !todo.completed,
    }

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateStatus),
    }

    const url = "http://localhost:3000/todos/" + todo.id
    fetch(url, options)
      .then(function (response) {
        return response.json()
      })
      .then(function (json) {
        todo.completed = updateStatus.completed
        if (todo.completed) {
          button.innerHTML = "INCOMPLETE"
        } else {
          button.innerHTML = "COMPLETE"
        }
      })
  })
}
