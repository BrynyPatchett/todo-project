import toDoItem from "./js/todo-item";
import toDoItemUI from "./js/todo-item-ui";
import toDoProject from "./js/todo-project";
import toDoProjectUI from "./js/todo-project-ui";
import { todoModal, projectModal,viewTodoModal, todoEditModal } from "./js/modals";
import './styles/main-style.css';
import './styles/sidebar-style.css';


let projects = [];
const projectContent = document.querySelector(".project-content");
const sidebar = document.querySelector(".sidebar-content");
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
    allDefaultProject.addEventListener("click", function (e) {
        // add style of selected then refresh the view of the project
        currentSelectedProject.classList.remove("selected");
        currentSelectedProject = this;
        this.classList.add("selected");
        projectTitle.textContent = "ALL";
        loadAllTodosFromProjects();
    });
    //default all project
    projects.push(new toDoProject(0, "ALL"));
    currentSelectedProject.dataset.id = 0;
    currentSelectedProject.classList.add("selected");
    projectTitle.textContent = "ALL";
    loadAllTodosFromProjects();
})();

createProjectModal.addEventListener("projectCreate", (e) => {
    let projectname = e.detail.project_name;
    let newProject = new toDoProject(projects.length, projectname);
    //Create a new project
    projects.push(newProject);
    addtoProjectlist(newProject);
});

createTodoModal.addEventListener("todoCreate", (e) => {
    let details = e.detail;
    let projectIndex = currentSelectedProject.dataset.id;
    let item = new toDoItem(projectIndex, projects[projectIndex].toDoList.length, details.todo_name, details.date, 1, details.note);
    projects[projectIndex].toDoList.push(item);
    projectview.querySelector(".project-content").appendChild(toDoItemUI(item));
});

function showModal(modal) {
    projectview.removeChild(document.querySelector(".modal"))
    projectview.appendChild(modal);
    if (modal.style.display === "none" || modal.style.display === "") {
        modal.style.display = "flex";
        return;
    }
}

projectCreateButton.addEventListener("click", (e) => {
    showModal(createProjectModal);
});

const todoCreateButton = document.querySelector(".new-todo-button");
todoCreateButton.addEventListener("click", (e) => {
    showModal(createTodoModal);
});


projectContent.addEventListener("deleteItem", (e) => {
    let itemId = e.detail.item_id;
    let projectId = e.detail.project_id;
    projects[projectId].toDoList.splice(itemId,1);
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
})


projectContent.addEventListener("editItem", (e) => {
    console.log("EDIT");
    let itemId = e.detail.item_id;
    let projectId = e.detail.project_id;
    console.log( itemId);
    console.log( projectId);

    let editModal = todoEditModal(projects[projectId].toDoList[itemId]);
    editModal.addEventListener("todoEdit",function (e){
        let itemId = e.detail.item_id;
        let projectId = e.detail.project_id;
        
        projects[projectId].toDoList[itemId].title = e.detail.todo_name;
        projects[projectId].toDoList[itemId].dueDate = e.detail.date;
        projects[projectId].toDoList[itemId].notes = e.detail.note;
        let todoNode =  projectContent.querySelector(`[data-id="${itemId}"][data-projectid="${projectId}"]`);
        projectContent.replaceChild(toDoItemUI(projects[projectId].toDoList[itemId]),todoNode);

    });

    showModal(editModal);
    console.log(projects[projectId].toDoList[itemId]);
})


function addtoProjectlist(project) {
    let projectListItem = toDoProjectUI(project);
    projectListItem.addEventListener("click", function (e) {
        selectProject(this);
    });

    projectListItem.addEventListener("deleteProject", function (e) {
        e.stopPropagation();
        let nextProjectToSelect = e.target.parentElement.previousSibling;
        projects[e.detail.project_id] = "";

        //if we run out of projects we need to reload the deafult one
        if(nextProjectToSelect === null || currentSelectedProject === allDefaultProject)
        {
            nextProjectToSelect = allDefaultProject;
            loadAllTodosFromProjects();
            nextProjectToSelect.classList.add("selected");
            currentSelectedProject = allDefaultProject;
            projectTitle.textContent = "ALL";


        }else{
            selectProject(nextProjectToSelect);
        }
        e.target.parentElement.parentElement.removeChild(e.target.parentElement);
    });
    projectList.appendChild(projectListItem);
};

function loadAllTodosFromProjects() {

    removeAllTodosFromContent();
    projects.forEach(project => {
        if(project != "")
        project.toDoList.forEach(toDoItem => {
            projectContent.appendChild(toDoItemUI(toDoItem));
        })
    });
};

function loadAllTodos(project) {
    removeAllTodosFromContent();
    project.toDoList.forEach(todoItem => {
        projectContent.appendChild(toDoItemUI(todoItem));
    });
}


function removeAllTodosFromContent() {
    while (projectContent.firstChild) {
        projectContent.removeChild(projectContent.firstChild);
    }
}

function selectProject(selected){
    currentSelectedProject.classList.remove("selected");
    currentSelectedProject = selected;
    selected.classList.add("selected");
    projectTitle.textContent = projects[currentSelectedProject.dataset.id].title;
    loadAllTodos(projects[currentSelectedProject.dataset.id]);
}
