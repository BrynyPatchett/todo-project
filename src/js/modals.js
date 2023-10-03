import toDoItem from "./todo-item";
import '../styles/modals-style.css';

export default { projectModal, todoModal , viewTodoModal, todoEditModal}

export function projectModal() {

    let modal = document.createElement('div');
    modal.classList.add("modal");

    let modalContentDiv = document.createElement('div');
    modalContentDiv.classList.add("modal-content");

    let form = document.createElement('form');

    let titleDiv = document.createElement('div');
    titleDiv.classList.add("menu-item");

    let titleLabel = document.createElement('label');
    titleLabel.classList.add("input-label");
    titleLabel.htmlFor = "new_project_name";
    titleLabel.textContent = "Project Name";

    let titleInput = document.createElement('input');
    titleInput.classList.add("modal-title-input");
    titleInput.id = "todo-input-title";
    titleInput.type = "text";
    titleInput.name = "new_project_name";
    titleInput.required = true;

    titleDiv.appendChild(titleLabel);
    titleDiv.appendChild(titleInput);
    modalContentDiv.appendChild(titleDiv);

    let buttons = document.createElement('div');
    buttons.classList.add("new-project-button");

    let createbutton = document.createElement('button');
    createbutton.classList.add("button-create");
    createbutton.textContent = "Create";
    createbutton.type = "submit";

    form.action = "";
    form.method = "GET";
    form.addEventListener("submit",function (e){
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent("projectCreate", {
          bubbles: true,
          detail: {project_name:titleInput.value
          },
        }),
      );
      modal.style.display = "none";
    });


    let cancelbutton = document.createElement('div');
    cancelbutton.classList.add("button-cancel");
    cancelbutton.textContent = "Cancel";

    cancelbutton.addEventListener("click", (e) => {
        modal.style.display = "none";
    })

    buttons.appendChild(createbutton);
    buttons.appendChild(cancelbutton);
    modalContentDiv.appendChild(buttons);
    form.appendChild(modalContentDiv);
    modal.appendChild(form);

    return modal;

}

export function todoModal() {
    let modal = document.createElement('div');
    modal.classList.add("modal");

    let form = document.createElement('form');

    let modalContentDiv = document.createElement('div');
    modalContentDiv.classList.add("modal-content");

    let titleDiv = document.createElement('div');
    titleDiv.classList.add("menu-item");

    let titleLabel = document.createElement('label');
    titleLabel.classList.add("input-label");
    titleLabel.htmlFor = "new_todo_name";
    titleLabel.textContent = "To Do";

    let titleInput = document.createElement('input');
    titleInput.classList.add("modal-title-input");
    titleInput.id = "todo-input-title";
    titleInput.type = "text";
    titleInput.name = "new_todo_name";
    titleInput.required = true;

    titleDiv.appendChild(titleLabel);
    titleDiv.appendChild(titleInput);
    modalContentDiv.appendChild(titleDiv);

    let dateDiv = document.createElement('div');
    dateDiv.classList.add("menu-item");

    let dateLabel = document.createElement('label');
    dateLabel.classList.add("input-label");
    dateLabel.htmlFor = "new_todo_date";
    dateLabel.textContent = "Date";

    let dateInput = document.createElement('input');
    dateInput.id = "todo-input-date";
    dateInput.type = "date";
    dateInput.name = "new_todo_date";
    dateInput.required = true;
    dateInput.valueAsDate =  new Date();

    dateDiv.appendChild(dateLabel);
    dateDiv.appendChild(dateInput);
    modalContentDiv.appendChild(dateDiv);

    let noteDiv = document.createElement('div');
    noteDiv.classList.add("menu-item");

    let notelabel = document.createElement('label');
    notelabel.classList.add("input-label");
    notelabel.htmlFor = "new_todo_note";
    notelabel.textContent = "Note";

    let noteTextAre = document.createElement('textarea');
    noteTextAre.id = "todo-input-note";
    noteTextAre.name = "new_todo_note";
    noteTextAre.rows = "4";
    noteTextAre.cols = "50";

    noteDiv.appendChild(notelabel);
    noteDiv.appendChild(noteTextAre);
    modalContentDiv.appendChild(noteDiv);

    let buttons = document.createElement('div');
    buttons.classList.add("new-project-button");

    let createbutton = document.createElement('button');
    createbutton.classList.add("button-create");
    createbutton.textContent = "Create";
    createbutton.type = "submit";

    form.action = "";
    form.method = "GET";
    form.addEventListener("submit",function (e){
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent("todoCreate", {
          bubbles: true,
          detail: {todo_name:titleInput.value,
            date: dateInput.valueAsDate,
            note: noteTextAre.value
          },
        }),
      );
      modal.style.display = "none";
      form.reset();

      //reset the default date to today
      dateInput.valueAsDate =  new Date();
    });

    let cancelbutton = document.createElement('div');
    cancelbutton.classList.add("button-cancel");
    cancelbutton.textContent = "Cancel";

    cancelbutton.addEventListener("click", (e) => {
        modal.style.display = "none";
    })

    buttons.appendChild(createbutton);
    buttons.appendChild(cancelbutton);
    modalContentDiv.appendChild(buttons);
    form.appendChild(modalContentDiv);
    modal.appendChild(form);

    return modal;

}


export  function viewTodoModal(toDoItem){
  let modal = document.createElement('div');
    modal.classList.add("modal");

    let form = document.createElement('form');

    let modalContentDiv = document.createElement('div');
    modalContentDiv.classList.add("modal-content");

    let titleDiv = document.createElement('div');
    titleDiv.classList.add("menu-item");

    let titleLabel = document.createElement('label');
    titleLabel.classList.add("input-label");
    titleLabel.htmlFor = "new_todo_name";
    titleLabel.textContent = toDoItem.title;

    titleDiv.appendChild(titleLabel);
    modalContentDiv.appendChild(titleDiv);

    let dateDiv = document.createElement('div');
    dateDiv.classList.add("menu-item");

    let dateLabel = document.createElement('label');
    dateLabel.classList.add("input-label");
    dateLabel.htmlFor = "new_todo_date";
    dateLabel.textContent = "Date";

    let dateInput = document.createElement('div');
    dateInput.id = "todo-input-date";
    dateInput.name = "new_todo_date";
    dateInput.textContent = new Date(toDoItem.dueDate).toLocaleDateString('en-UK');

    dateDiv.appendChild(dateLabel);
    dateDiv.appendChild(dateInput);
    modalContentDiv.appendChild(dateDiv);

    let noteDiv = document.createElement('div');
    noteDiv.classList.add("menu-item");

    let notelabel = document.createElement('label');
    notelabel.classList.add("input-label");
    notelabel.htmlFor = "new_todo_note";
    notelabel.textContent = "Note";

    let noteTextAre = document.createElement('div');
    noteTextAre.id = "todo-input-note";
    noteTextAre.name = "new_todo_note";
    noteTextAre.textContent = toDoItem.notes;

    noteDiv.appendChild(notelabel);
    noteDiv.appendChild(noteTextAre);
    modalContentDiv.appendChild(noteDiv);

    let buttons = document.createElement('div');
    buttons.classList.add("new-project-button");

    form.action = "";
    form.method = "GET";
  
    let cancelbutton = document.createElement('div');
    cancelbutton.classList.add("button-cancel");
    cancelbutton.textContent = "Cancel";

    cancelbutton.addEventListener("click", (e) => {
        modal.style.display = "none";
    })

    buttons.appendChild(cancelbutton);
    modalContentDiv.appendChild(buttons);
    form.appendChild(modalContentDiv);
    modal.appendChild(form);

    return modal;
}

export function todoEditModal(toDoItem) {
  let modal = document.createElement('div');
  modal.classList.add("modal");

  let form = document.createElement('form');

  let modalContentDiv = document.createElement('div');
  modalContentDiv.classList.add("modal-content");

  let titleDiv = document.createElement('div');
  titleDiv.classList.add("menu-item");

  let titleLabel = document.createElement('label');
  titleLabel.classList.add("input-label");
  titleLabel.htmlFor = "new_todo_name";
  titleLabel.textContent = "To Do";

  let titleInput = document.createElement('input');
  titleInput.classList.add("modal-title-input");
  titleInput.id = "todo-input-title";
  titleInput.type = "text";
  titleInput.name = "new_todo_name";
  titleInput.required = true;
  titleInput.value = toDoItem.title;

  titleDiv.appendChild(titleLabel);
  titleDiv.appendChild(titleInput);
  modalContentDiv.appendChild(titleDiv);

  let dateDiv = document.createElement('div');
  dateDiv.classList.add("menu-item");

  let dateLabel = document.createElement('label');
  dateLabel.classList.add("input-label");
  dateLabel.htmlFor = "new_todo_date";
  dateLabel.textContent = "Date";

  let dateInput = document.createElement('input');
  dateInput.id = "todo-input-date";
  dateInput.type = "date";
  dateInput.name = "new_todo_date";
  dateInput.required = true;
  dateInput.valueAsDate = new Date(toDoItem.dueDate);

  dateDiv.appendChild(dateLabel);
  dateDiv.appendChild(dateInput);
  modalContentDiv.appendChild(dateDiv);

  let noteDiv = document.createElement('div');
  noteDiv.classList.add("menu-item");

  let notelabel = document.createElement('label');
  notelabel.classList.add("input-label");
  notelabel.htmlFor = "new_todo_note";
  notelabel.textContent = "Note";

  let noteTextAre = document.createElement('textarea');
  noteTextAre.id = "todo-input-note";
  noteTextAre.name = "new_todo_note";
  noteTextAre.rows = "4";
  noteTextAre.cols = "50";
  noteTextAre.textContent = toDoItem.notes;

  noteDiv.appendChild(notelabel);
  noteDiv.appendChild(noteTextAre);
  modalContentDiv.appendChild(noteDiv);

  let buttons = document.createElement('div');
  buttons.classList.add("new-project-button");

  let createbutton = document.createElement('button');
  createbutton.classList.add("button-create");
  createbutton.textContent = "Edit";
  createbutton.type = "submit";

  form.action = "";
  form.method = "GET";
  form.addEventListener("submit",function (e){
    e.preventDefault();
    this.dispatchEvent(
      new CustomEvent("todoEdit", {
        bubbles: true,
        detail: {
          item_id:  toDoItem.id,
          project_id: toDoItem.projectId,
          todo_name:titleInput.value,
          date: dateInput.valueAsDate,
          note: noteTextAre.value
        },
      }),
    );
    modal.style.display = "none";
    form.reset();

  });

  let cancelbutton = document.createElement('div');
  cancelbutton.classList.add("button-cancel");
  cancelbutton.textContent = "Cancel";

  cancelbutton.addEventListener("click", (e) => {
      modal.style.display = "none";
  })

  buttons.appendChild(createbutton);
  buttons.appendChild(cancelbutton);
  modalContentDiv.appendChild(buttons);
  form.appendChild(modalContentDiv);
  modal.appendChild(form);

  return modal;

}
