// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoPending = document.querySelector(".js-toDoPending"),
  toDoFinished = document.querySelector(".js-toDoFinished");

const TODOS_P = "PENDING",
  TODOS_F = "FINISHED";
let listPending = [],
  listFinished = [];

function saveToDos() {
  localStorage.setItem(TODOS_P, JSON.stringify(listPending));
  localStorage.setItem(TODOS_F, JSON.stringify(listFinished));
}

function deleteToDoP(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoPending.removeChild(li);

  const cleanToDos = listPending.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  listPending = cleanToDos;

  saveToDos();
}

function deleteToDoF(event) {
  const btn = event.target;
  const li = btn.parentNode;

  toDoFinished.removeChild(li);

  const cleanToDos = listFinished.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  listFinished = cleanToDos;
  saveToDos();
}

function movePtoF(event) {
  const btn = event.target;
  const li = btn.parentNode;

  paintToDoF(li.childNodes[0].innerText);

  toDoPending.removeChild(li);

  const movedToDos = listPending.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  listPending = movedToDos;

  saveToDos();
}

function moveFtoP(event) {
  const btn = event.target;
  const li = btn.parentNode;

  paintToDoP(li.childNodes[0].innerText);

  toDoFinished.removeChild(li);

  const movedToDos = listFinished.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  listFinished = movedToDos;

  saveToDos();
}

function paintToDoP(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const moveBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = listPending.length + 1;

  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDoP);
  moveBtn.innerText = "✅";
  moveBtn.addEventListener("click", movePtoF);
  span.innerText = text;

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(moveBtn);
  li.id = newId;
  toDoPending.appendChild(li);

  const toDoObjP = {
    text: text,
    id: newId
  };

  listPending.push(toDoObjP);
  saveToDos();
}

function paintToDoF(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const moveBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = listFinished.length + 1;

  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDoF);
  moveBtn.innerText = "⏪";
  moveBtn.addEventListener("click", moveFtoP);
  span.innerText = text;

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(moveBtn);
  li.id = newId;
  toDoFinished.appendChild(li);

  const toDoObjF = {
    text: text,
    id: newId
  };

  listFinished.push(toDoObjF);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDoP(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDosP = localStorage.getItem(TODOS_P),
    loadedToDosF = localStorage.getItem(TODOS_F);
  if (loadedToDosP !== null) {
    const parsedToDosP = JSON.parse(loadedToDosP);
    parsedToDosP.forEach(function (toDo) {
      paintToDoP(toDo.text);
    });
  }
  if (loadedToDosF !== null) {
    const parsedToDosF = JSON.parse(loadedToDosF);
    parsedToDosF.forEach(function (toDo) {
      paintToDoF(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
