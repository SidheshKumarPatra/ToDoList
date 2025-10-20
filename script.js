// select dom elements

const todoInput = document.getElementById('todo-Input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// try to load saved todos from localStorage
const todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos(){
    localStorage.setItem('todos', JSON.stringify(todos));
}

//create a dom node for a todo object and append it to the list
function createTodoItem(todo, index){
    const li = document.createElement('li');

    //text of the todo
    const textSpan = document.createElement('span');
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 8px';
    if(todo.completed){
        textSpan.style.textDecoration = 'line-through';
    }

    //checkbox to toggle completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener('change', ()=>{
        todo.completed = checkbox.checked;
        // visual feedback
        textSpan.style.textDecoration = todo.completed ? 'line-through' : '';
        saveTodos();
    });

    //Add double click event to edit the todo item
    textSpan.addEventListener('dblclick', ()=>{
        const newText = prompt('Edit ToDo Item:', todo.text);
        if(newText != null){
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            saveTodos();
        }
    });

    //delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.marginLeft = '8px';
    deleteBtn.addEventListener('click', ()=>{
        todos.splice(index, 1);
        renderTodoList();
        saveTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(deleteBtn);
    return li;
}

//render the whole todo list from todos array
function renderTodoList(){
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const node = createTodoItem(todo, index);
        todoList.appendChild(node);
    });
}

function addTodo(){
    const text = todoInput.value.trim();
    if(!text) return;

    //push a new todo object
    todos.push({text: text, completed: false});
    todoInput.value = '';
    renderTodoList();
    saveTodos();
}

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', (e) => { if(e.key === 'Enter') addTodo(); });

//initial render
renderTodoList();


