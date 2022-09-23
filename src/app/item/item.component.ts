import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  

  @Output() savedText = new EventEmitter<HTMLInputElement>();
  

  constructor() {}

  ngOnInit(): void {
  }

  save(){
      let inputBox = (<HTMLInputElement>document.getElementById("inputbox")); 
      this.savedText.emit(inputBox); 
  }
}
