let count = Number(window.localStorage.getItem("count"));
if (!count) {
    window.localStorage.setItem("count", "0");
}

function createNote(noteTitle, noteContent) {
    //To remove the No notes found
    document.getElementById("noNotes").classList.add("hidden");

    //To create Note
    let li = document.createElement("li");
    let a = document.createElement("a");
    let h2 = document.createElement("h2");
    let xButton = document.createElement("button");
    let p = document.createElement("p");

    xButton.classList.add("delete");

    let xText = document.createTextNode("X")
    let title = document.createTextNode(noteTitle);
    let body = document.createTextNode(noteContent);
    
    xButton.appendChild(xText);
    h2.appendChild(title);
    p.appendChild(body);

    a.setAttribute("href", "#");

    a.appendChild(h2);
    a.appendChild(xButton);
    a.appendChild(p);

    li.appendChild(a);

    document.getElementById("notes").appendChild(li);
}

function createNoteFromForm(e) {
    e.preventDefault();

    let noteTitle = document.getElementById("titleInput").value;
    let noteContent = document.getElementById("contenInput").value;

    document.getElementById("titleInput").value = "";
    document.getElementById("contenInput").value = "";

    count += 1;
    window.localStorage.setItem("count", count);

    while (window.localStorage.getItem(noteTitle)) {
        noteTitle += "-1";
    }

    window.localStorage.setItem(noteTitle, noteContent);
    
    createNote(noteTitle, noteContent);

}

function removeNote (e) {
    e.preventDefault();
    if (e.target.classList.contains("delete")){
        if (confirm("Are you sure to delete the '" + e.target.previousElementSibling.innerText+ "' note?")){
            let li = e.target.parentElement.parentElement;
            let ul = document.getElementById("notes");

            ul.removeChild(li);
        }
    }
    count -= 1;
    window.localStorage.setItem("count", count);

    window.localStorage.removeItem(e.target.previousElementSibling.innerText);

    if(count < 1){
        document.getElementById("noNotes").className = "";
    }
}

for(i = 0; i < count + 1; i++){
    let noteTitle = window.localStorage.key(i);
    let noteContent = window.localStorage.getItem(noteTitle);

    if(noteTitle !== "count" && noteTitle) {
        createNote(noteTitle, noteContent);
    }

}

document.getElementById("iForm").addEventListener("submit", createNoteFromForm, false);
document.getElementById("notes").addEventListener("click", removeNote);