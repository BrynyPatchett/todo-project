import toDoItem from "./js/todo-item";
import toDoItemUI from "./js/todo-item-ui";
import toDoProject from "./js/todo-project";
import toDoProjectUI from "./js/todo-project-ui";
import { todoModal, projectModal, viewTodoModal, todoEditModal } from "./js/modals";
import './styles/main-style.css';
import './styles/sidebar-style.css';



let projects = [];
let projectCount = 0;
//local storage code

const projectContent = document.querySelector(".project-content");
const projectview = document.querySelector(".projectview");
const createProjectModal = projectModal();
const createTodoModal = todoModal();
const projectList = document.querySelector(".projects");
const projectCreateButton = document.querySelector(".project-add-button");
const allDefaultProject = document.querySelector("#all");
const projectTitle = projectview.querySelector('h1');

//should default to all
let currentSelectedProject = allDefaultProject;
//setup
(function () {
    allDefaultProject.addEventListener("click", function () {
        // add style of selected then refresh the view of the project
        currentSelectedProject.classList.remove("selected");
        currentSelectedProject = this;
        this.classList.add("selected");
        projectTitle.textContent = "ALL";
        loadAllTodosFromProjects();
    });
    //default all project

    if (typeof Storage !== "undefined") {
        let localProjects = localStorage.getItem("projects");
        let localCount = localStorage.getItem("projectCount");
        if (!localProjects || !localCount) {
            console.log("No local projects found!");
            projects.push(new toDoProject(0, "ALL"));
            currentSelectedProject.dataset.id = 0;
            localStorage.setItem("projectCount", JSON.stringify(0));
        }
        else {
            console.log(JSON.parse(localProjects));
            projects = JSON.parse(localProjects);
            projects.slice(1).forEach(project => {
                if(project != ""){
                    addtoProjectlist(project);
                }
                
            });
            currentSelectedProject.classList.add("selected");
            projectTitle.textContent = "ALL";
            projectCount = localCount;
        }
    }
    else {
        console.log("Sorry! No web storage support..");

        projects.push(new toDoProject(0, "ALL"));
        currentSelectedProject.dataset.id = 0;
    }
    currentSelectedProject.dataset.id = 0;
    currentSelectedProject.classList.add("selected");
    projectTitle.textContent = "ALL";
    loadAllTodosFromProjects();
})();

createProjectModal.addEventListener("projectCreate", (e) => {
    let projectname = e.detail.project_name;
    let newProject = new toDoProject(++projectCount, projectname);
    //Create a new project
    projects.push(newProject);
    addtoProjectlist(newProject);
    localStorage.setItem("projects", JSON.stringify(projects));
    localStorage.setItem("projectCount", JSON.stringify(projectCount));
});

createTodoModal.addEventListener("todoCreate", (e) => {
    let details = e.detail;
    console.log(currentSelectedProject.dataset.id);
    let projectIndex = currentSelectedProject.dataset.id;
    let item = new toDoItem(projectIndex, projects[projectIndex].toDoListCount++, details.todo_name, details.date, 1, details.note);
    projects[projectIndex].toDoList.push(item);
    projectview.querySelector(".project-content").appendChild(toDoItemUI(item));
    localStorage.setItem("projects", JSON.stringify(projects));

});

function showModal(modal) {
    projectview.removeChild(document.querySelector(".modal"))
    projectview.appendChild(modal);
    if (modal.style.display === "none" || modal.style.display === "") {
        modal.style.display = "flex";
        return;
    }
}

projectCreateButton.addEventListener("click", () => {
    showModal(createProjectModal);
});

const todoCreateButton = document.querySelector(".new-todo-button");
todoCreateButton.addEventListener("click", () => {
    showModal(createTodoModal);
});


projectContent.addEventListener("deleteItem", (e) => {
    let itemId = e.detail.item_id;
    let projectId = e.detail.project_id;
    projects[projectId].toDoList[itemId] = "";
    localStorage.setItem("projects", JSON.stringify(projects));
    
});


projectContent.addEventListener("detailItem", (e) => {
    console.log("SHOW");
    let itemId = e.detail.item_id;
    let projectId = e.detail.project_id;
    showModal(viewTodoModal(projects[projectId].toDoList[itemId]));
})


projectContent.addEventListener("toggleChecked", (e) => {
    let itemId = e.detail.item_id;
    let projectId = e.detail.project_id;
    projects[projectId].toDoList[itemId].complete = !projects[projectId].toDoList[itemId].complete;
    localStorage.setItem("projects", JSON.stringify(projects));
})


projectContent.addEventListener("editItem", (e) => {
    console.log("EDIT");
    let itemId = e.detail.item_id;
    let projectId = e.detail.project_id;
    console.log(itemId);
    console.log(projectId);

    let editModal = todoEditModal(projects[projectId].toDoList[itemId]);
    editModal.addEventListener("todoEdit", function (e) {
        let itemId = e.detail.item_id;
        let projectId = e.detail.project_id;

        projects[projectId].toDoList[itemId].title = e.detail.todo_name;
        projects[projectId].toDoList[itemId].dueDate = e.detail.date;
        projects[projectId].toDoList[itemId].notes = e.detail.note;
        let todoNode = projectContent.querySelector(`[data-id="${itemId}"][data-projectid="${projectId}"]`);
        projectContent.replaceChild(toDoItemUI(projects[projectId].toDoList[itemId]), todoNode);
        localStorage.setItem("projects", JSON.stringify(projects));

    });

    showModal(editModal);
    console.log(projects[projectId].toDoList[itemId]);
})


function addtoProjectlist(project) {
    let projectListItem = toDoProjectUI(project);
    projectListItem.addEventListener("click", function () {
        selectProject(this);
    });

    projectListItem.addEventListener("deleteProject", function (e) {
        e.stopPropagation();
        let nextProjectToSelect = e.target.parentElement.previousSibling;
        projects[e.detail.project_id] = "";
        localStorage.setItem("projects", JSON.stringify(projects));
        //if we run out of projects we need to reload the deafult one
        if (nextProjectToSelect === null || currentSelectedProject === allDefaultProject) {
            nextProjectToSelect = allDefaultProject;
            loadAllTodosFromProjects();
            nextProjectToSelect.classList.add("selected");
            currentSelectedProject = allDefaultProject;
            projectTitle.textContent = "ALL";


        } else {
            selectProject(nextProjectToSelect);
        }
        e.target.parentElement.parentElement.removeChild(e.target.parentElement);
    });
    projectList.appendChild(projectListItem);
}

function loadAllTodosFromProjects() {

    removeAllTodosFromContent();
    projects.forEach(project => {
        if (project != "")
            project.toDoList.forEach(todoItem => {
                if(todoItem != ""){
                    projectContent.appendChild(toDoItemUI(todoItem));
                }
            })
    });
}

function loadAllTodos(project) {
    removeAllTodosFromContent();
    project.toDoList.forEach(todoItem => {
        if(todoItem != ""){
            projectContent.appendChild(toDoItemUI(todoItem));
        }
    });
}


function removeAllTodosFromContent() {
    while (projectContent.firstChild) {
        projectContent.removeChild(projectContent.firstChild);
    }
}

function selectProject(selected) {
    currentSelectedProject.classList.remove("selected");
    currentSelectedProject = selected;
    selected.classList.add("selected");
    projectTitle.textContent = projects[currentSelectedProject.dataset.id].title;
    loadAllTodos(projects[currentSelectedProject.dataset.id]);
}
