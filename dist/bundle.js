(()=>{"use strict";class t{constructor(t="New To Do",e,o,s,c="",i){this.title=t,this.description=e,this.dueDate=o,this.priorty=s,this.notes=c,this.checklist=i}}class e{constructor(t="New Project",e=[]){this.title=t,this.toDoList=e}addToProject(t){this.toDoList.push(t)}}let o=[],s=new t("Test Task","A test Task",new Date(1/1970),1,"",""),c=new t,i=new e,n=new e("Title of a Project");console.log(i),i.addToProject(c),i.addToProject(s),console.log(i),o.push(i),o.push(n);let r=document.querySelector(".projects");function l(t){let e=document.createElement("div");e.textContent=t.title,e.classList.add("project-item"),r.appendChild(e)}o.forEach((t=>{l(t)})),document.querySelector(".project-add-button").addEventListener("click",(t=>{console.log("YOZA"),l(new e("Title of a Project"))}))})();