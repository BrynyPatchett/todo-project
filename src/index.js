import toDoItem from "./todo-item";
import toDoProject from "./todo-project";
import {noteModal,projectModal} from "./modals";


let projects = [];

const sidebar = document.querySelector(".sidebar-content");
const projectview = document.querySelector(".projectview");

const createProjectModal = projectModal();
const createNoteModal = noteModal();

createProjectModal.addEventListener("projectCreate",(e)=>{
   let projectname =  e.detail.project_name;
   console.log(projectname);
})

function showModal(modal){
    projectview.removeChild(document.querySelector(".modal"))
    projectview.appendChild(modal);
    if(modal.style.display === "none" || modal.style.display === ""){
        modal.style.display = "flex";
        return;
    }
}

//setUpcode
const projectCreateButton = document.querySelector(".project-add-button");
projectCreateButton.addEventListener("click",(e)=>{
    showModal(createProjectModal);
});

const todoCreateButton = document.querySelector(".new-todo-button");
todoCreateButton.addEventListener("click",(e)=>{
    showModal(createNoteModal);
});




// let item = new toDoItem("Test Task","A test Task", new Date(1/1/1970),1,"","");

// let item2 = new toDoItem();


// let defaultProject = new toDoProject();
// let project2 = new toDoProject("Title of a Project");

// console.log(defaultProject);

// defaultProject.addToProject(item2);
// defaultProject.addToProject(item);

// console.log(defaultProject);

// projects.push(defaultProject);
// projects.push(project2);

// let projectList = document.querySelector(".projects");


// projects.forEach(element => {
//     addtoProjectlist(element);
// });


// let projectAddbutton = document.querySelector(".project-add-button");

// projectAddbutton.addEventListener("click", (e) =>{
//     console.log("YOZA");
//     addtoProjectlist(new toDoProject("Title of a Project"));
// })




// function addtoProjectlist(project){
//     let projectListItem = document.createElement("div");
//    projectListItem.textContent = project.title;
//     projectListItem.classList.add("project-item");
//     projectList.appendChild(projectListItem);
// }


