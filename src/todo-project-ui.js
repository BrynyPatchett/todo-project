
function addtoProjectlist(project){
    let projectListItem = document.createElement("div");
    projectListItem.textContent = project.title;
    projectListItem.classList.add("project-item");
    projectList.appendChild(projectListItem);
}
