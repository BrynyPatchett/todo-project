export default class toDoItem{

    constructor(projectid,id,title = "New To Do",dueDate = new Date(1/1/1970),priorty,notes = ""){
        this.title = title;
        this.dueDate = dueDate;
        this.priorty = priorty;
        this.notes = notes;
        this.id = id;
        this.projectId = projectid;
    }

}

