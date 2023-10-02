export default class toDoProject{

    constructor(projectid,title = "New Project",toDoList = []){
        this.projectid = projectid;
        this.title = title;
        this.toDoList = toDoList;
    }
    
    addToProject(toDoItem){
            this.toDoList.push(toDoItem);
    }
}

