/*----------------------------------------------Erstellen von Konstanten, sowie Ausführungen die immer passieren sollen----------------------------------------------*/
const inputToDo = document.getElementById("toDoEingabe"); //Variable für ein InputFeld wie Datum oder Texteingabe oder für einen Button
const addButton = document.getElementById("toDoHinzufügen"); //Variable für ein InputFeld wie Datum oder Texteingabe oder für einen Button
const deleteButton = document.getElementById("toDoLoeschen"); //Variable für ein InputFeld wie Datum oder Texteingabe oder für einen Button
const completeButton = document.getElementById("toDoAbgeschlossen"); //Variable für ein InputFeld wie Datum oder Texteingabe oder für einen Button
const editButton = document.getElementById("toDoBearbeiten"); //Variable für ein InputFeld wie Datum oder Texteingabe oder für einen Button
const todoItemsString = localStorage.getItem("todo-app"); //Variable für ein InputFeld wie Datum oder Texteingabe oder für einen Button

let todoItems = todoItemsString !== null ? JSON.parse(todoItemsString) : []; //LocalStorage darf nicht null sein 
neuLaden();


/*----------------------------------------------Funktionen----------------------------------------------*/
function neuLaden() { // Funktion, die die Ansicht lädt
        let container = document.getElementById("toDoListe"); // Variable für die Liste, an diese werden die Kommenden Elemente angehangen
        container.innerText = ""; // Damit, bei jedem durchlauf der Seite, die Elemente rausgenommen werden und anschließend hinzugefügt, sonst bleiben LI Elemente nach dem löschen bis zum neuaden der Seite

    todoItems.forEach((item) => { //Schleife in der für jedes ToDo ein Listenpunkt erstellt wird und eine Checkbox 
        let newElement = document.createElement("li"); // Liste wird erstellt
        
        let checkbox = document.createElement('input'); //Checkbox wird erstellt
            checkbox.type = "checkbox";
            checkbox.checked = item.checked;
            newElement.appendChild(checkbox);

        let contentContainer = document.createElement('div'); // div für den Text und das Datum in der LI, dient der Anordnung mithilfe von CSS (Design)
            contentContainer.classList.add("todo-content");

        let text = document.createElement('text'); //LI-Text
            text.innerText = item.description;
            contentContainer.appendChild(text);

        let lineBreak = document.createElement('br'); //Absatz zwischen LI-Text und LI-Datum (Design)
            newElement.appendChild(lineBreak);

        let dateText = document.createElement('reihe'); // Kommentar der das Datum umhüllt
            dateText.innerText = `Ist bis zum ${Datumsformat(item.date)} zu erledigen`;
            contentContainer.appendChild(dateText);

            newElement.appendChild(contentContainer); //Elemente werden an container angehangen
            container.appendChild(newElement);

            newElement.addEventListener("click", (event) => {   // Sobald man auf ein LI-Element click ausführt soll sich der Checkbox Status ändern
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
        
        checkbox.addEventListener('change', () => {     //Checkbox-Status soll im local-Storage geändert werden, sobald er auf der Seite geändert wird
            item.checked = checkbox.checked;
            localStorage.setItem("todo-app", JSON.stringify(todoItems));
        });

        if(item.completed) {    //Wenn ToDo erledigt soll es durchgestrichen werden, (ToDo mit completed true sind erledigt)
            newElement.style.textDecoration = "line-through";
        }
        });

    const complete = todoItems.filter(item => item.completed).length;  //Zähler der angibt wie viele von wie vielen ToDos noch offen sind 
    zaehler.innerText = `${complete} von ${todoItems.length}`; 
    inputToDo.value = "";
};
    
function speichern() {  //Immer wenn das todo eine neue description hat soll der text auch im local Storage geupdated werden, leere ToDos werden nicht angenommen
    const inputElementValue = inputToDo.value;  
    if(inputElementValue.trim() === "") {
        removeButton();
        return;
    };
    
    todoItems.forEach((item) => {
        if (item.checked) {
            item.description = inputElementValue;
        }
    });
    neuLadenSpeichern(); //Update local-Storage
};

function removeButton() { //Buttons die beim click auf editButton entstehen, werden gelöscht, anhand ihrer ID
    document.getElementById("saveButton").remove();
    document.getElementById("cancelButton").remove();
};

function Datumsformat(datum) { //Datum wird in einen Array umgewandelt und die Trennstriche entfernt, anschließende neuanordnung 
    const datumArray = datum.split("-"); 
    return `${datumArray[2]}.${datumArray[1]}.${datumArray[0]}`
}

function neuLadenSpeichern() { //Update local-Storage
    localStorage.setItem("todo-app", JSON.stringify(todoItems));
    neuLaden();
}

function removeLadenLeeren() { //Funktion, die die Buttonremove Funktion die Speicher Funktion aufgreift, sowie das eingabe Feld leert
    removeButton();
    inputToDo.value = "";
    neuLaden(); 
}

/*----------------------------------------------Dokument Tasten-Funktionen----------------------------------------------*/
document.addEventListener("keydown", (event) => { //Enter soll sowohl ToDos hinzufügen können, als auch Speichern beim Bearbeiten der ToDos
    if (event.key === "Enter") {
        if (!document.getElementById("saveButton")) {
        addButton.click();
        } else {
            removeButton();     
            speichern();
        }
    }   

    if (event.key === "Escape") { //Soll jeden Vorgang nterbinden können, mithilfe von Escape
        if (document.getElementById("saveButton")) {
        removeButton();     
        speichern();
        } else {
            neuLaden();
        }
}});

/*----------------------------------------------Button-Funktionen----------------------------------------------*/
addButton.addEventListener("click", () => { //Hinzufügen von Todos
    const inputElementValue = inputToDo.value; //Variable die der Eingab im InputTextFeld gleichgesetzt ist
    const inputDate = document.getElementById('date').value; //Variable die der Eingab im InputDateFeld gleichgesetzt ist

    if (inputElementValue === "" || inputDate === "" ) { //Bei beiden muss eine Eingabe erfolgen
        return;
    }
        
        const newToDo = { description: inputElementValue, checked: false, completed: false, date: inputDate}; //ToDo wird im localStorage angelegt 
        todoItems.push(newToDo);
        neuLadenSpeichern();
        inputToDo.value = ""; 
});

deleteButton.addEventListener("click", () => { //mithilfe der filter Funktionen können ToDos gelöscht werden 
        todoItems = todoItems.filter(item => !item.checked);
        neuLadenSpeichern();
});

completeButton.addEventListener("click", () => {    //Ändert den Status auf completed und mit der Funktion Neuladen werden die ToDos durchgestrichen
    todoItems.forEach((item) => {
        if (item.checked) {
            item.completed = true;
        }
    });
    neuLadenSpeichern();  
});

editButton.addEventListener("click", () => { //Erstellt zwei Buttons und setzt das Eingabe Feld auf den Wert des Textes des ToDos, damit dieser dort bearbeitet werden kann
    if (todoItems.filter(item => item.checked).length === 1) { //Es darf nur ein ToDo als Checked makiert sein, ansonsten funktioniert der Bearbeiten Button nicht
        let container = document.getElementById("bearbeit"); //container Variable wird erstellt, damit die Buttons in die Bearbeit div aus dem html Code angeheftet werden können 
        
    if (!document.getElementById("saveButton") && !document.getElementById("cancelButton")) { //Buttons dürfen nicht vorhanden sein
    let newButton = document.createElement("button"); //SpeicherButton wird erstellt
        newButton.id = "saveButton";
        newButton.innerText = "Speichern";
        container.appendChild(newButton);

    let cancelButton = document.createElement("button"); //LöschButton wird erstellt
        cancelButton.id = "cancelButton";
        cancelButton.innerText = "Abbrechen";
        container.appendChild(cancelButton);
    
    todoItems.forEach((item => {
        if (item.checked) {
            inputToDo.value = item.description;
        }
    })); 

    newButton.addEventListener("click", () => { //Ordnet dem Button die jeweiligen Benötigten FUnktionen zu, damit diese ihre Funktion ausführen können (Speicherbutton)
        speichern();
        removeLadenLeeren(); 
    });

    cancelButton.addEventListener("click", () => { //Ordnet dem Button die jeweiligen Benötigten FUnktionen zu, damit diese ihre Funktion ausführen können (LöschButton)
        removeLadenLeeren(); 
    });
}}});