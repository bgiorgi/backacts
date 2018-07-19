import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TagWrapperService } from './tag-wrapper.service';

@Component({
  selector: 'app-tag-wrapper',
  templateUrl: './tag-wrapper.component.html',
  styleUrls: ['./tag-wrapper.component.scss']
})
export class TagWrapperComponent implements OnInit {

  @Input() tags;
  @Output() onOutputTags = new EventEmitter();
  popularTags:any;


  constructor(private tagWrapperService: TagWrapperService) { 
    this.getPopularTags();
  }

  ngOnInit() {
  }
  
  toggleTag(tagId,tagTitle) {
    console.log(this.tags);
    let tagItemFound = false;
    this.tags.forEach((item,index) => {
      if(item.id==tagId) {
        this.tags.splice(index,1);
        delete this.tags[1];
        tagItemFound = true;  
        console.log('tags spliced'+index);
        return false;
    }
  });
  
    if(!tagItemFound) this.tags.push({ id: tagId, title: tagTitle });
    this.onOutputTags.emit(this.tags);
    console.log(this.tags);
  }
  
  
  getPopularTags() {
    this.tagWrapperService.getPopularTags().subscribe((data:any) => this.popularTags = data.data);
  }
  
  
  selected(tagId) {
    let result = false;
    this.tags.forEach(item => {
      if(item.id==tagId) result = true;
    })
    return result;
  }
  
  

}
