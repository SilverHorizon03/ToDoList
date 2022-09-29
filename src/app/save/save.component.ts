import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css']
})
export class SaveComponent implements OnInit {
  @Output() savedText = new EventEmitter<HTMLInputElement>();
  
  constructor() {}

  ngOnInit(): void {
  }

  save(){
      let inputBox = (<HTMLInputElement>document.getElementById("inputbox")); 
      this.savedText.emit(inputBox); 
  }
}
