const displayTodos = () => {
  const list = document.querySelector(".list");

  // remove old items from the list before updating
  while(list.firstChild) {
    list.removeChild(list.firstChild);
  }

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const text = document.createElement("input");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deleteBtn = document.createElement("button");

    todoItem.classList.add("todo-item");
    span.classList.add("bubble");
    content.classList.add("todo-content");
    text.classList.add("text-content");
    actions.classList.add("actions");
    edit.classList.add("edit");
    deleteBtn.classList.add("delete");

    input.type = "checkbox";
    input.checked = todo.done;

    text.type = "text";
    text.readOnly = true;
    text.setAttribute("value", todo.content);

    if (todo.category === "personal") {
      span.classList.add("personal");
    } else {
      span.classList.add("work");
    }

    edit.textContent = "Edit";
    deleteBtn.textContent = "Delete";

    label.appendChild(input);
    label.appendChild(span);
    content.appendChild(text);
    actions.appendChild(edit);
    actions.appendChild(deleteBtn);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);
    list.appendChild(todoItem);

    if (todo.done) {
      todoItem.classList.add("done");
    }

    input.addEventListener("click", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }

      displayTodos();
    });

    edit.addEventListener("click", (e) => {
      const textInput = content.querySelector(".text-content");
      textInput.readOnly = false;
      textInput.focus();
      textInput.addEventListener("blur", (e) => {
        textInput.setAttribute("readonly", true);
        todo.content = e.target.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        displayTodos();
      });
    });

    deleteBtn.addEventListener("click", (e) => {
      todos = todos.filter((tempTodo) => tempTodo != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      displayTodos();
    });
  });
};

(() => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];

  const nameInput = document.querySelector("#name");
  const newTodoForm = document.querySelector("#new-todo-form");

  const username = localStorage.getItem("username") || "";
  nameInput.setAttribute("value", username);

  nameInput.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value);
  });

  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime(),
    };

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    e.target.reset();
    displayTodos();
  });

  displayTodos();
})();
