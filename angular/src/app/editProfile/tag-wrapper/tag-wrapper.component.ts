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
  newTags:any;
  popularTags:any;

  constructor(private tagWrapperService: TagWrapperService) { }

  ngOnInit() {

  }
  

  
  

}
