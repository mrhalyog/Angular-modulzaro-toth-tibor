import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WordcloudComponent } from '../wordcloud/wordcloud.component';
export type Word={original:string; replacement:string;}
@Component({
  imports:[FormsModule, NgIf, NgFor, WordcloudComponent],
  selector: 'app-censored',
  templateUrl: './censored.component.html',
  styleUrls: ['./censored.component.scss']
})
export class CensoredComponent {
  blacklist="";
  inputText="";
  checkText(){}
  navigateBack(){}
  censoredText="";
  censoredWords:Word[]=[];
}
