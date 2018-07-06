import { Component, Input, Output, EventEmitter } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';



export interface Tag {
  id?: number,
  title: string
}

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent {

@Input() tags;
@Output() onOutputTags = new EventEmitter();


  // chips
  separatorKeyCodes: number[] = [ENTER, COMMA];

    add(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;

    
      // Add our tag
      if((value || '').trim()) {
        this.tags.push({title: value.trim()});
      }
      
      
      // reset the input value
      if(input) {
        input.value = '';
      }
      
      
      // fire output, to send data in parant component
      this.onOutputTags.emit(this.tags);
      
    }
    
    
    remove(tag: Tag): void {
      const index = this.tags.indexOf(tag);
      
      if(index >= 0) {
        this.tags.splice(index, 1);
      }
      
      // fire output, to send data in parant component
      this.onOutputTags.emit(this.tags);      
    }



}
