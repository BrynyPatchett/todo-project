import toDoItem from "./todo-item";
import toDoItemUI from "./todo-item-ui";
import toDoProject from "./todo-project";
import {todoModal,projectModal} from "./modals";


let projects = [];

const sidebar = document.querySelector(".sidebar-content");
const projectview = document.querySelector(".projectview");

const createProjectModal = projectModal();
const createTodoModal = todoModal();

createProjectModal.addEventListener("projectCreate",(e)=>{
   let projectname =  e.detail.project_name;
   //Create a new project
   console.log(projectname);
   
});


createTodoModal.addEventListener("todoCreate",(e)=>{
    let details =  e.detail;
    console.log(details);
    let item = new toDoItem("Test Task","A test Task", new Date(1/1/1970),1,"","");
    projectview.querySelector(".project-content").appendChild(toDoItemUI(item));

       //Create a new  todo
 });

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
    showModal(createTodoModal);
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

let projectList = document.querySelector(".projects");


// projects.forEach(element => {
//     addtoProjectlist(element);
// });


let projectAddbutton = document.querySelector(".project-add-button");

projectAddbutton.addEventListener("click", (e) =>{
    console.log("YOZA");
    addtoProjectlist(new toDoProject("Title of a Project"));
})




function addtoProjectlist(project){
    let projectListItem = document.createElement("div");
    projectListItem.classList.add("project-item");

    let projectListItemTitle = document.createElement("div");
    projectListItemTitle.textContent = project.title;

    let deleteButton = document.createElement("img");
    deleteButton.src = "./delete.svg";
    deleteButton.alt = "delete-project"

    deleteButton.addEventListener("click",(e)=>{
        
    })


    projectListItem.appendChild(projectListItemTitle);
    projectListItem.appendChild(deleteButton);
    projectList.appendChild(projectListItem);




}


