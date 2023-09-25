export default class toDoItem{

    constructor(title = "New To Do",description,dueDate,priorty,notes = "", checklist){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priorty = priorty;
        this.notes = notes;
        this.checklist = checklist;
    }

    
}

