/*----------------------------------------------Erstellen von Konstanten, sowie Ausführungen die immer passieren sollen----------------------------------------------*/
const inputToDo = document.getElementById("toDoEingabe");
const addButton = document.getElementById("toDoHinzufügen");

const deleteButton = document.getElementById("toDoLoeschen");
const completeButton = document.getElementById("toDoAbgeschlossen");
const editButton = document.getElementById("toDoBearbeiten");

const todoItemsString = localStorage.getItem("todo-app"); 
let todoItems = todoItemsString !== null ? JSON.parse(todoItemsString) : [];

neuLaden();


/*----------------------------------------------Funktionen----------------------------------------------*/
function neuLaden() {
        let container = document.getElementById("toDoListe"); // Variable für die Liste
        container.innerText = ""; 

    todoItems.forEach((item) => { //Schleife in der für jedes ToDo ein Listenpunkt erstellt wird und eine Checkbox 
        let newElement = document.createElement("li"); // Liste wird erstellt
        
        let checkbox = document.createElement('input'); //Checkbox wird erstellt
            checkbox.type = "checkbox";
            checkbox.checked = item.checked;
            newElement.appendChild(checkbox);

        let contentContainer = document.createElement('div'); 
            contentContainer.classList.add("todo-content");

        let text = document.createElement('text');
            text.innerText = item.description;
            contentContainer.appendChild(text);

        let lineBreak = document.createElement('br');
            newElement.appendChild(lineBreak);

        let dateText = document.createElement('reihe');
            dateText.innerText = `Ist bis zum ${item.date} zu erledigen`;
            contentContainer.appendChild(dateText);

            newElement.appendChild(contentContainer);
            container.appendChild(newElement);

            newElement.addEventListener("click", (event) => {
                if (event.target !== checkbox) {
                    checkbox.checked = !checkbox.checked; 
                    item.checked = checkbox.checked;
                    localStorage.setItem("todo-app", JSON.stringify(todoItems)); 
                }
            });

            if (item.checked) {   //Checkbox soll beim neuladen der Seite keine Markierung haben bzw. im localStorage soll die Checked Eigenschaft nicht gespeichert werden
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


    let complet = todoItems.filter(item => item.completed).length; 
    zaehler.innerText = `${complet} von ${todoItems.length}`; 

    inputToDo.value = "";
    // Datumsformat();
}
    
function speichern() {
    const inputElementValue = inputToDo.value;
       
    if(inputElementValue.trim() === "") {
        removeButton();
        return;
    }
    
    todoItems.forEach((item) => {
        if (item.checked) {
            item.description = inputElementValue;
        }
    })

        localStorage.setItem("todo-app", JSON.stringify(todoItems));
        neuLaden();
}

function removeButton() {
    document.getElementById("saveButton").remove();
    document.getElementById("cancelButton").remove();
}

// function Datumsformat() {
//     let datum = toString(document.getElementById("date").value);


//     console.log(datum);
// }


/*----------------------------------------------Dokument Tasten-Funktionen----------------------------------------------*/
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !document.getElementById("saveButton")) {
        addButton.click();
    }});

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && document.getElementById("saveButton")) {
        removeButton();     
        speichern();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.getElementById("saveButton")) {
        removeButton();     
        speichern();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !document.getElementById("saveButton")) {
        neuLaden();
    }
});




/*----------------------------------------------Button-Funktionen----------------------------------------------*/
addButton.addEventListener("click", () => {
    const inputElementValue = inputToDo.value;
    const inputDate = document.getElementById('date').value;

    if (inputElementValue === "" || inputDate === "" ) { // Damit der local Storage nicht leer ist
        return;
    }
        
        const newToDo = { description: inputElementValue, checked: false, completed: false, date: inputDate};
        todoItems.push(newToDo);
        localStorage.setItem("todo-app", JSON.stringify(todoItems));

        neuLaden();
        inputToDo.value = ""; // Leeren des Eingabefeldes nach dem Hinzufügen
});

deleteButton.addEventListener("click", () => { // Löschen des ToDos
        todoItems = todoItems.filter(item => !item.checked);
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
        let container = document.getElementById("bearbeit");
        
    if (!document.getElementById("saveButton") && !document.getElementById("cancelButton")) {
    let newButton = document.createElement("button");
        newButton.id = "saveButton";
        newButton.innerText = "Speichern";
        container.appendChild(newButton);

    let cancelButton = document.createElement("button");
        cancelButton.id = "cancelButton";
        cancelButton.innerText = "Abbrechen";
        container.appendChild(cancelButton);
    
    todoItems.forEach((item => {
        if (item.checked) {
            inputToDo.value = item.description;
        }
    })); 

    newButton.addEventListener("click", () => {
            speichern();
            removeButton();
            inputToDo.value = ""; 
            neuLaden(); 
    });

    cancelButton.addEventListener("click", () => {
            removeButton();
            inputToDo.value = "";
            neuLaden(); 
    });
}}});

    


