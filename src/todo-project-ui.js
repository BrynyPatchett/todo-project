
export default function crateProjectElement(project){
    let projectListItem = document.createElement("div");
    projectListItem.classList.add("project-item");
    projectListItem.dataset.id = project.projectid;

    let projectListItemTitle = document.createElement("div");
    projectListItemTitle.textContent = project.title;

    let deleteButton = document.createElement("img");
    deleteButton.src = "./delete.svg";
    deleteButton.alt = "delete-project"

    deleteButton.addEventListener("click",function(e){
        e.stopPropagation();
        this.dispatchEvent(new CustomEvent("deleteProject",{
            bubbles:true,
            detail:{
                project_id: projectListItem.dataset.id
            }
        }))
    });

    projectListItem.appendChild(projectListItemTitle);
    projectListItem.appendChild(deleteButton);
    return projectListItem;
}
