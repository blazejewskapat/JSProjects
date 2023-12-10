const addBtn = document.querySelector(".addBtn");
const removeBtn = document.querySelector(".removeBtn");
const deleteNoteBtns = document.querySelectorAll(".deleteNoteBtn");
const saveBtn = document.querySelector(".saveBtn");
const cancelBtn = document.querySelector(".cancelBtn");
const listSelector = document.querySelector("#listSelector");
const textArea = document.querySelector("#text");
const error = document.querySelector(".error");
const noteArea = document.querySelector(".noteArea");
const addPanel = document.querySelector(".addPanel");

const removeAllNotes = () => {
  while (noteArea.firstChild) {
    noteArea.removeChild(noteArea.firstChild);
  }
  //   noteArea.textContent = "";
};

const addNewNote = () => {
  addPanel.style.visibility = "visible";
};

const clearAddPanel = () => {
  addPanel.style.visibility = "hidden";
  error.style.display = "none";
  listSelector.value = "0";
  textArea.value = "";
};

const cancelNewNote = () => {
  clearAddPanel();
};

const createNewNote = (text, title) => {
  let noteDiv = document.createElement("div");
  noteDiv.classList.add("note");

  let noteHeader = document.createElement("div");
  noteHeader.classList.add("noteHeader");

  let noteTitle = document.createElement("h3");
  noteTitle.classList.add("noteTitle");
  noteTitle.textContent = title;

  let deleteNoteBtn = document.createElement("button");
  deleteNoteBtn.classList.add("deleteNoteBtn");

  let trashIcon = document.createElement("i");
  trashIcon.classList.add("fa-solid");
  trashIcon.classList.add("fa-trash");

  let noteBody = document.createElement("div");
  noteBody.classList.add("noteBody");
  noteBody.textContent = text;

  deleteNoteBtn.appendChild(trashIcon);

  noteHeader.appendChild(noteTitle);
  noteHeader.appendChild(deleteNoteBtn);

  noteDiv.appendChild(noteHeader);
  noteDiv.appendChild(noteBody);

  noteArea.appendChild(noteDiv);
  
  // Mozna zastapic innerHtml i wkleic kod z HTML
};

const saveNewNote = () => {
  if (textArea.value.trim() !== "" && listSelector.value !== "0") {
    const text = listSelector.options[listSelector.selectedIndex].text;
    createNewNote(textArea.value, text);
    clearAddPanel();
  } else {
    error.style.display = "block";
  }
};
const checkIfDeleted = (event) => {
  const target = event.target.parentNode;
  if (target.classList.contains("deleteNoteBtn")) {
    removeOneNote(target.parentNode);
  }
};

const removeOneNote = (noteHeader) => {
  const note = noteHeader.parentNode;
  const noteArea = note.parentNode;
  noteArea.removeChild(note);
};

removeBtn.addEventListener("click", removeAllNotes);
addBtn.addEventListener("click", addNewNote);
cancelBtn.addEventListener("click", cancelNewNote);
saveBtn.addEventListener("click", saveNewNote);
noteArea.addEventListener("click", checkIfDeleted);
