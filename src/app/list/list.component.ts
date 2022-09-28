import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { faEdit, faFileCsv, IconDefinition,faTrash,faSave} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  buttonColor: string = "red";
  toDoList: string[] = [];
  faIcons: IconDefinition[] = [];
  faFileCsv = faFileCsv;
  faTrash = faTrash;
  faSave = faSave;
  faEdit = faEdit;
  alertmessage = "";
  
  
  constructor() {}
  
  exportToDoListIntoCSV(): void {
    if(this.toDoList.length != 0){
      let tag = "";
      let csvarray = "--My To Do List-- \n";
      csvarray = csvarray + tag;
      
      for(let i=0; i<this.toDoList.length-1; i++)
      csvarray = csvarray  + '"' + this.toDoList[i] + '"' + "," + "\n"; 
      csvarray = csvarray + '"' + this.toDoList[this.toDoList.length-1] + '"';
      
      
      let csvfile = new Blob([csvarray], { type: 'text/csv;charset=utf-8' });
      saveAs(csvfile, 'mytodolist.csv');
    } else 
    this.alert("Cannot save into .csv, (Is empty!)"); 
    
  }
  
  addToListOnSaved(textHTML: any){
    let text = textHTML.value;
    if(this.checkIfElementIsInArray(text,this.toDoList)) {
      this.alert("Cannot save this element (Already in use!)");
      return;
    } else if(text== ""){
      this.alert("Cannot save this element (Is empty!)");
      return;
    }

    this.toDoList.push(text);
    this.faIcons.push(faEdit);
    this.forceDisableAlert();
    this.saveInSessionStorage();
    textHTML.value = "";
    
    /* --Another way to do the same thing--
    if(this.toDoList.indexOf(text) != -1) return;
    this.toDoList.push(text);
    */
  }
  
  
  deleteByStringValue(toDo: string): void{
    let delteteindex = this.toDoList.indexOf(toDo);
    this.toDoList.splice(delteteindex, 1);
    this.saveInSessionStorage();
  }
  
  deleteByIndex(index: number): void{
    this.toDoList.splice(index, 1)
    this.faIcons.splice(index, 1);
    this.saveInSessionStorage();
  }
  
  edit(id: number): void {
    /*
    let inputBox =  (document.getElementById(""+id) as HTMLButtonElement);
    if(inputBox.disabled){
      inputBox.disabled = false;
      this.faIcons[id] = faSave;
    } else { 
      let toDoText = inputBox.value;
      if(toDoText=="")
      this.deleteByIndex(id);
      else if ((!this.checkIfElementIsInArray(toDoText, this.toDoList))){
        this.toDoList.splice(id, 1, toDoText);
        this.forceDisableAlert();
        this.saveInSessionStorage();
        inputBox.disabled = true;
        this.faIcons[id] = faEdit;
      } else if(toDoText==this.toDoList[id]){
        inputBox.disabled = true;
        this.faIcons[id] = faEdit;
      } else
      this.alert("Cannot edit this element (Already in use!)");
    }
    */
    let inputBox =  (document.getElementById(""+id) as HTMLButtonElement);
    let toDoText = inputBox.value;
    if(inputBox.disabled){
      inputBox.disabled = false;
      this.faIcons[id] = faSave;
    } else {   
      if(toDoText==""){
        this.deleteByIndex(id);
        return;
      }
      if(this.checkIfElementIsInArray(toDoText, this.toDoList) && toDoText!= this.toDoList[id]){
        this.alert("Cannot edit this element (Already in use!)");
        return;
      }
      this.toDoList.splice(id, 1, toDoText);
      inputBox.disabled = true;
      this.faIcons[id] = faEdit;
      this.forceDisableAlert();
      this.saveInSessionStorage();     
    }
  }
  
  
  checkIfElementIsInArray(item: string, array: string[]): boolean{
    if (array.indexOf(item) == -1) return false;
      return true;
    // for(let i=0; i<array.length; i++)
    //   if(item == array[i])
    //     return true;
    // return false;
  }
  
  alert(message: string): void {
    let alertBox = (document.getElementById("alert") as HTMLButtonElement);
    this.alertmessage = message;
    alertBox.style.display = "block";
  } 
  
  forceDisableAlert(): void {
    let alertBox = (document.getElementById("alert") as HTMLButtonElement);
    alertBox.style.display = "none";
  }
  
  saveInSessionStorage(): void {
    let JSONToDoList = JSON.stringify(this.toDoList);
    let JSONIcons = JSON.stringify(this.faIcons);
    sessionStorage.setItem("toDoList", JSONToDoList);
    sessionStorage.setItem("faIcons", JSONIcons);
  }
  
  recoverFromSessionStorage(): void {
    let ToDoListJSON = sessionStorage.getItem("toDoList");
    let IconsJSON = sessionStorage.getItem("faIcons");
    let recoverToDoList;
    let recoverfaIcons;
    if(ToDoListJSON!=null) {
      recoverToDoList = JSON.parse(ToDoListJSON);
      this.toDoList = recoverToDoList;
    }
    if(IconsJSON!=null) {
      recoverfaIcons = JSON.parse(IconsJSON);
      this.faIcons = recoverfaIcons;
    }
  }
  
  ngOnInit(): void {
    this.recoverFromSessionStorage(); 
  }
  
}
