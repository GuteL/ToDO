const inputToDo = document.getElementById("toDoEingabe");
const addButton = document.getElementById("toDoHinzufügen");

const deleteButton = document.getElementById("toDoLoeschen");
const completeButton = document.getElementById("toDoAbgeschlossen");
const editButton = document.getElementById("toDoBearbeiten");


const todoItemsString = localStorage.getItem("todo-app");
const todoItems = todoItemsString !== null ? JSON.parse(todoItemsString) : [];


function neuLaden() {
        
        let container = document.getElementById("toDoListe"); // Variable für die Liste
        container.innerText = ""; 

    todoItems.forEach((item) => { //Schleife in der für jedes ToDo ein Listenpunkt erstellt wird und eine Checkbox 
        let newElement = document.createElement("li"); // Liste wird erstellt
        newElement.innerText = item.description;
        container.appendChild(newElement);
        
        let checkbox = document.createElement('input'); //Checkbox wird erstellt
            checkbox.type = "checkbox";
            checkbox.checked = item.checked;
            newElement.appendChild(checkbox);

            if (item.checked = true) {   //Checkbox soll beim neuladen der Seite keine Markierung haben bzw. im localStorage soll die Checked Eigenschaft nicht gespeichert werden
                item.checked = false;
                localStorage.setItem("todo-app", JSON.stringify(todoItems));
                checkbox.checked = false;
            }
        
        checkbox.addEventListener('change', () => { //Checkbox soll beim Klicken den Status ändern
            item.checked = checkbox.checked;
            localStorage.setItem("todo-app", JSON.stringify(todoItems));
        });
           
        

        if (newElement.innerHTML === "") { // Löschen des Elements wenn der Inhalt leer ist
            const flaseElement = newElement;
            flaseElement.remove();
        }

        if(item.completed) {
            newElement.style.textDecoration = "line-through";
        }
        });
    
    let complet = 0;
    todoItems.forEach((item) => {
        if (item.completed) {
            complet++;
        }
    });
    zaehler.innerText = complet + " von " + todoItems.length; 
  

}

    neuLaden();
    
// addButton soll ToDos im localStorage hinzufügen und anschließend die View rendern 


addButton.addEventListener("click", () => {
     
        const inputElementValue = inputToDo.value;
        if (inputElementValue === "") { // Damit der local Storage nicht leer ist
            return;
        }
        
        const newToDo = { description: inputElementValue, checked: false, completed: false };
        todoItems.push(newToDo);
        localStorage.setItem("todo-app", JSON.stringify(todoItems));

    neuLaden();
        inputToDo.value = ""; // Leeren des Eingabefeldes nach dem Hinzufügen
});

// document.addEventListener("DOMContentLoaded", neuLaden);



deleteButton.addEventListener("click", () => { // Löschen des ToDos
    for (let i=0; i<todoItems.length; i++) {
        if (todoItems[i].checked === true) {
            todoItems.splice(i, 1);
            i--;
        }
    } 
    localStorage.setItem("todo-app", JSON.stringify(todoItems));
    
    neuLaden(); 
    
});

completeButton.addEventListener("click", () => {    // ToDo als erledigt markieren (durchstreichen)
    todoItems.forEach((item) => {
        if (item.checked) {
            item.completed = true;
        }

    });
    localStorage.setItem("todo-app", JSON.stringify(todoItems));
    
    neuLaden(); 
    
});

editButton.addEventListener("click", () => { // ToDo bearbeiten
    if (todoItems.filter(item => item.checked).length === 1) {

    if (!document.getElementById("saveButton") && !document.getElementById("cancelButton")) {
    let newButton = document.createElement("button");
    newButton.id = "saveButton";
    newButton.innerText = "Speichern";
    document.body.appendChild(newButton);

    let cancelButton = document.createElement("button");
    cancelButton.id = "cancelButton";
    cancelButton.innerText = "Abbrechen";
    document.body.appendChild(cancelButton);
    
    

    newButton.addEventListener("click", () => {
        const inputElementValue = inputToDo.value;
        if(inputElementValue.trim() === "") {
            newButton.remove();
            cancelButton.remove();
            return;
        }

        
        todoItems.forEach((item) => {
            

            if (item.checked) {
                item.description = inputElementValue;
            }
        }); 
        
            localStorage.setItem("todo-app", JSON.stringify(todoItems));

            newButton.remove();
            cancelButton.remove();
            inputToDo.value = ""; 
            neuLaden(); 
        
    });

    cancelButton.addEventListener("click", () => {
            newButton.remove();
            cancelButton.remove();
            neuLaden(); 
    });

}}});

    


