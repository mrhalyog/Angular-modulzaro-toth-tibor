import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wordcloud',
  imports: [],
  templateUrl: './wordcloud.component.html',
  styleUrl: './wordcloud.component.scss'
})
export class WordcloudComponent {
@Input() originalText="";
@Input() modifiedText="";
}
