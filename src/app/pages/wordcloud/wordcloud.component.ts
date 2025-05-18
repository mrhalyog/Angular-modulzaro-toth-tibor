import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-word-cloud',
  templateUrl: './wordcloud.component.html',
  styleUrls: ['./wordcloud.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class WordCloudComponent {
  originalWords: { word: string; count: number }[] = [];
  modifiedWords: { word: string; count: number }[] = [];

  originalText: string = '';
  modifiedText: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.loadTextData();
  }

  /**
   * Szövegadatok betöltése az URL paraméterekből
   */
  private loadTextData(): void {
    this.originalText = this.route.snapshot.queryParamMap.get('original') || '';
    this.modifiedText = this.route.snapshot.queryParamMap.get('modified') || '';

    this.originalWords = this.calculateWordFrequencies(this.originalText);
    this.modifiedWords = this.calculateWordFrequencies(this.stripHtmlTags(this.modifiedText));
  }

  /**
   * Szószámok és gyakoriságok kiszámítása
   */
  private calculateWordFrequencies(text: string): { word: string; count: number }[] {
    const words = text.toLowerCase().match(/\b[\wáéíóöőúüű]+\b/g) || [];
    const frequencyMap: { [key: string]: number } = {};

    words.forEach(word => {
      frequencyMap[word] = (frequencyMap[word] || 0) + 1;
    });

    return Object.entries(frequencyMap)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) =>
        b.count - a.count !== 0 ? b.count - a.count : a.word.length - b.word.length
      );
  }

  /**
   * HTML tagek eltávolítása a szövegből
   */
  private stripHtmlTags(html: string): string {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || '';
  }

  /**
   * Betűméret kiszámítása a szógyakoriság alapján
   */
  getFontSize(count: number, maxCount: number): string {
    const minSize = 12;
    const maxSize = 36;
    const calculatedSize = minSize + ((count / maxCount) * (maxSize - minSize));
    return `${calculatedSize}px`;
  }

  /**
   * Vissza navigálás az előző oldalra
   */
  goBack(): void {
    this.router.navigate(['/censored']);
  }
}

