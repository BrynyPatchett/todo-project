export default class toDoProject{

    constructor(title = "New Project",toDoList = []){
        this.title = title;
        this.toDoList = toDoList;
    }
    
    addToProject(toDoItem){
            this.toDoList.push(toDoItem);
    }
}

