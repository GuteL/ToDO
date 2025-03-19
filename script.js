const input = document.querySelector("#toDoEingabe");
const add = document.querySelector("#toDoHinzufügen");



const todo = [{ description: "input", checked: false }];
 
// strings aus dem localstorage in js-objekte parsen
// JSON.parse()
// Items für den LocalStorage in string umwandeln
// JSON.stringify()
 
localStorage.setItem("todo-app", JSON.stringify(todo));
 
const todoItemsString = localStorage.getItem("todo-app");
 
const todoItems = todoItemsString !== null ? JSON.parse(todoItemsString) : [];
 
const inputElementValue = 'new'
 
const newToDo = { description: inputElementValue, checked: false };
 
todoItems.push(newToDo);
 
localStorage.setItem("todo-app", JSON.stringify(todo));
 
 
// leere die view komplett, lese den localstorage erneut aus, rendere die vollständige todo-liste wieder in die view