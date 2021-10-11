function onPageLoaded() {
    const input = document.querySelector("#textInput");
    const ul = document.querySelector(".todos");
    const saveButton = document.querySelector("button.save");
    const clearButton = document.querySelector("button.clear");
    const btnAddTask = document.querySelector(".addTask");
    

    function createTodo() {
        if(input.value === ''){
            alert('Введите название задачи');
        }
        else{
        const li = document.createElement("li");
        const textSpan = document.createElement("span");
        textSpan.classList.add("todo-text");
        const newTodo = input.value;
        textSpan.append(newTodo);

        const deleteBtn = document.createElement("span");
        deleteBtn.classList.add("todo-trash");
        const icon = document.createElement("i");
        icon.classList.add("fas", "fa-trash-alt");
        deleteBtn.appendChild(icon);

        ul.appendChild(li).append(textSpan, deleteBtn);
        input.value = "";
        listenDeleteTodo(deleteBtn);
        }
    }

    function listenDeleteTodo(element) {
        element.addEventListener("click", (event) => {
            element.parentElement.remove();
            event.stopPropagation();
        });
    }

    function onClickTodo(event){
        if (event.target.tagName === "LI") {
            event.target.classList.toggle("checked");
        }
    }
    function loadTodos() {
        const data = localStorage.getItem("todos");
        if (data) {
            ul.innerHTML = data;
        }
        const deleteButtons = document.querySelectorAll("span.todo-trash");
        for (const button of deleteButtons) {
            listenDeleteTodo(button);
        }
    }

    function saveTask(){
        localStorage.setItem("todos", ul.innerHTML);
        
    }

    btnAddTask.addEventListener("click", () =>{
        createTodo();
        saveTask();
    })
    saveButton.addEventListener("click", () => {
        saveTask();
    });
    clearButton.addEventListener("click", () => {
        ul.innerHTML = "";
        saveTask();
    });

    ul.addEventListener("click", onClickTodo);
    input.addEventListener("keypress", (keyPressed) => {
        const keyEnter = 13;
        if (keyPressed.which == keyEnter) {
            createTodo();
        }
    });
    ul.addEventListener("click", onClickTodo);

    loadTodos();
}

document.addEventListener("DOMContentLoaded", onPageLoaded);