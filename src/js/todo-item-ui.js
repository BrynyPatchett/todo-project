
import "../styles/todo-item-ui-style.css";
import checkboxBlankIcon from "../images/checkbox-blank.svg";
import checkboxCheckedIcon from "../images/checkbox-checked.svg";
import deleteIcon from "../images/delete.svg";
import editIcon from "../images/edit.svg";

export default function crateItemElement(todoItem) {
  let name = todoItem.title;
  let date = todoItem.dueDate;

  let item = document.createElement("div");
  item.classList.add("to-do-item");
  item.dataset.id = todoItem.id;
  item.dataset.projectid = todoItem.projectId;

  let checkButton = document.createElement("div");
  checkButton.classList.add("to-do-check");

  let checkimage = document.createElement("img");
  checkButton.appendChild(checkimage);

  let title = document.createElement("div");
  title.classList.add("to-do-title");
  title.textContent = name;

  //here to make tect be crossed out as well as changed icon
  if (todoItem.complete == false) {
    checkimage.src = checkboxBlankIcon;
    checkimage.alt = "checkbox-unchecked";
  } else {
    checkimage.src = checkboxCheckedIcon;
    checkimage.alt = "checkbox-checked";
    title.classList.add("checked");
  }

  checkButton.addEventListener("click", function () {
    if (todoItem.complete == false) {
      title.classList.add("checked");
      checkimage.src = checkboxCheckedIcon;
      checkimage.alt = "checkbox-checked";
    } else {
      title.classList.remove("checked");
      checkimage.src = checkboxBlankIcon;
    }
    this.dispatchEvent(
      new CustomEvent("toggleChecked", {
        bubbles: true,
        detail: {
          item_id: item.dataset.id,
          project_id: item.dataset.projectid,
        },
      }),
    );
  });

  let detailsButton = document.createElement("div");
  detailsButton.classList.add("to-do-details");
  detailsButton.textContent = "Details";

  detailsButton.addEventListener("click", function () {
    this.dispatchEvent(
      new CustomEvent("detailItem", {
        bubbles: true,
        detail: {
          item_id: item.dataset.id,
          project_id: item.dataset.projectid,
        },
      }),
    );
  });

  let dateDisplay = document.createElement("div");
  dateDisplay.classList.add("to-do-date");
  dateDisplay.textContent = new Date(date).toLocaleDateString("en-UK");

  let editButton = document.createElement("div");
  editButton.classList.add("to-do-edit");

  editButton.addEventListener("click", function () {
    this.dispatchEvent(
      new CustomEvent("editItem", {
        bubbles: true,
        detail: {
          item_id: item.dataset.id,
          project_id: item.dataset.projectid,
        },
      }),
    );
  });

  let editimage = document.createElement("img");
  editimage.src = editIcon;
  editimage.alt = "edit";

  editButton.appendChild(editimage);

  let deleteButton = document.createElement("div");
  deleteButton.classList.add("to-do-delete");

  let deleteimage = document.createElement("img");
  deleteimage.src = deleteIcon;
  deleteimage.alt = "delete";

  deleteButton.addEventListener("click", function (e) {
    //this need to be changed yto be an event to return the node, with an id ?
    //asme with the project version
    let taskItem = e.target.parentElement.parentElement;
    console.log(taskItem.dataset);
    this.dispatchEvent(
      new CustomEvent("deleteItem", {
        bubbles: true,
        detail: {
          item_id: taskItem.dataset.id,
          project_id: taskItem.dataset.projectid,
        },
      }),
    );

    taskItem.parentElement.removeChild(taskItem);
  });

  deleteButton.appendChild(deleteimage);

  item.appendChild(checkButton);
  item.appendChild(title);
  item.appendChild(detailsButton);
  item.appendChild(dateDisplay);
  item.appendChild(editButton);
  item.appendChild(deleteButton);

  return item;
}
