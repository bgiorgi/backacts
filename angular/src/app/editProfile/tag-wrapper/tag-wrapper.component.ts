import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TagWrapperService } from './tag-wrapper.service';

@Component({
  selector: 'app-tag-wrapper',
  templateUrl: './tag-wrapper.component.html',
  styleUrls: ['./tag-wrapper.component.scss']
})
export class TagWrapperComponent implements OnInit {

  @Output() onOutputTags = new EventEmitter();
  popularTags:any;
  

  constructor(private tagWrapperService: TagWrapperService) { 
    this.getPopularTags();
  }

  ngOnInit() {
  }
  

  // get popular tags, from events. backend returns is_user_tag, if tag is also selected previously by user.
  getPopularTags() {
    this.tagWrapperService.getPopularTags().subscribe(data => this.popularTags = data);
  }
  
  // when user clicks tag is_user_tag should be toggled
  toggleTag(i) {
    this.popularTags[i].is_user_tag = !this.popularTags[i].is_user_tag;
    // filter just selected tags to send to backend
    this.onOutputTags.emit(this.popularTags.filter(tag => tag.is_user_tag));
  }
  

  
  

}
