const inputToDo = document.getElementById("toDoEingabe");
const addButton = document.getElementById("toDoHinzufügen");


addButton.addEventListener("click", () => {
    
    // strings aus dem localstorage in js-objekte parsen
    // JSON.parse()
    // Items für den LocalStorage in string umwandeln
    // JSON.stringify()
    
    const todoItemsString = localStorage.getItem("todo-app");
    
    const todoItems = todoItemsString !== null ? JSON.parse(todoItemsString) : [];
    
    const inputElementValue = inputToDo.value;
    
    const newToDo = { description: inputElementValue, checked: false };
    
    todoItems.push(newToDo);
    
    localStorage.setItem("todo-app", JSON.stringify(todoItems));
});

// leere die view komplett, lese den localstorage erneut aus, rendere die vollständige todo-liste wieder in die view