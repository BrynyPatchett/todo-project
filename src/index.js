import toDoItem from "./todo-item";
import toDoProject from "./todo-project";

let projects = [];


let item = new toDoItem("Test Task","A test Task", new Date(1/1/1970),1,"","");

let item2 = new toDoItem();



let defaultProject = new toDoProject();
let project2 = new toDoProject("Title of a Project");

console.log(defaultProject);

defaultProject.addToProject(item2);
defaultProject.addToProject(item);

console.log(defaultProject);

projects.push(defaultProject);
projects.push(project2);

let projectList = document.querySelector(".projects");


projects.forEach(element => {
    addtoProjectlist(element);
});


let projectAddbutton = document.querySelector(".project-add-button");

projectAddbutton.addEventListener("click", (e) =>{
    console.log("YOZA");
    addtoProjectlist(new toDoProject("Title of a Project"));
})




function addtoProjectlist(project){
    let projectListItem = document.createElement("div");
   projectListItem.textContent = project.title;
    projectListItem.classList.add("project-item");
    projectList.appendChild(projectListItem);
}


