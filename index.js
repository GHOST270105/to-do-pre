let items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks(defaultItems) {
  const savedTasks = localStorage.getItem("toDoTasks");
  const tasks = savedTasks ? JSON.parse(savedTasks) : defaultItems;

  return tasks;
}

function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = item;

  deleteButton.addEventListener("click", () => {
    clone.remove();
    saveTasks(getTasksFromDOM());
  });

  duplicateButton.addEventListener("click", () => {
    const itemName = textElement.textContent;
     if (itemName === "") return;
    const newItem = createItem(itemName);
    listElement.prepend(newItem);
    saveTasks(getTasksFromDOM());
  });

  editButton.addEventListener("click", () => {
    textElement.setAttribute("contenteditable", "true");
    textElement.focus();
  });

  textElement.addEventListener("blur", () => {
    textElement.setAttribute("contenteditable", "false");
    saveTasks(getTasksFromDOM());
  });

  textElement.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
      textElement.setAttribute("contenteditable", "false");
      saveTasks(getTasksFromDOM());
    }
  });

  return clone;
}

function getTasksFromDOM() {
  const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
  const tasks = [];
  itemsNamesElements.forEach((item) => {
    tasks.push(item.textContent);
  });

  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem("toDoTasks", JSON.stringify(tasks));
}

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const newText = inputElement.value;
  if (newText === "") return;
  const newTask = createItem(newText);
  listElement.prepend(newTask);

  saveTasks(getTasksFromDOM());

  inputElement.value = "";
});

items = loadTasks(items);
items.forEach((item) => {
  const taskElement = createItem(item);
  listElement.append(taskElement);
});
