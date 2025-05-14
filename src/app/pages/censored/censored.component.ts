import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-censored',
  templateUrl: './censored.component.html',
  styleUrls: ['./censored.component.scss'],
  standalone: true,
  imports: [FormsModule],
})
export class CensoredComponent {
  blacklistInput: string = '';
  inputText: string = '';
  outputText: string = '';
  outputTextClean: string = '';
  currentUser: any = null;

  constructor(private router: Router) {}

  /**
   * Komponens inicializálása: Felhasználói adatok betöltése
   */
  ngOnInit(): void {
    this.loadCurrentUser();
  }

  /**
   * Bejelentkezett felhasználó adatainak betöltése
   */
  private loadCurrentUser(): void {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    } else {
      this.router.navigate(['/login']);
    }
  }

  /**
   * Navigáció a kezdőoldalra
   */
  goToHome(): void {
    this.router.navigate(['/home']);
  }
  /**
   * Kilépés a rendszerből
   */
  logout(): void {
    console.log("Felhasználó kijelentkezett...");
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  /**
   * Szöveg kis- és nagybetű szerinti megőrzése csere után
   */
  private preserveCase(source: string, target: string): string {
    return source[0] === source[0].toUpperCase()
      ? target[0].toUpperCase() + target.slice(1)
      : target;
  }

  /**
   * Szöveg feldolgozása és cenzúrázása
   */
  processText(): void {
    const blacklist: { [key: string]: string[] } = {};
    const wordUsage: { [key: string]: number } = {};

    const lines = this.blacklistInput.split('\n');
    for (let line of lines) {
      line = line.trim();
      if (!line.includes('@')) continue;

      const [word, alternativesRaw] = line.split('@');
      const alternatives = alternativesRaw.split(',').map(a => a.trim()).filter(a => a.length > 0);
      
      if (word && alternatives.length > 0) {
        blacklist[word.trim()] = alternatives;
        wordUsage[word.trim()] = 0;
      }
    }

    const sentences = this.inputText.split(/(?<=[.!?])\s+/); 
    const processedSentences: string[] = [];
    const cleanSentences: string[] = [];

    for (const sentence of sentences) {
      let modifiedSentence = sentence;
      let cleanSentence = sentence;
      const usedAlternatives = new Set<string>();

      for (const word in blacklist) {
        const regex = new RegExp(`(^|\\s|[.,!?])(${word})(?=\\s|[.,!?]|$)`, 'gi');

        modifiedSentence = modifiedSentence.replace(regex, (match, prefix, matchedWord) => {
          const alternatives = blacklist[word];
          let chosen = this.getUniqueAlternative(wordUsage, usedAlternatives, alternatives);
          wordUsage[word]++;

          return `${prefix}<span class="badge badge-old">${matchedWord}</span> <span class="badge badge-new">${this.preserveCase(matchedWord, chosen)}</span>`;
        });

        cleanSentence = cleanSentence.replace(regex, (match, prefix, matchedWord) => {
          const alternatives = blacklist[word];
          let chosen = this.getUniqueAlternative(wordUsage, usedAlternatives, alternatives);
          wordUsage[word]++;
          return `${prefix}${this.preserveCase(matchedWord, chosen)}`;
        });
      }

      processedSentences.push(modifiedSentence);
      cleanSentences.push(cleanSentence);
    }

    this.outputText = processedSentences.join(' ');
    this.outputTextClean = cleanSentences.join(' ');
  }

  /**
   * Egyedi alternatíva kiválasztása szóismétlés elkerülése érdekében
   */
  private getUniqueAlternative(wordUsage: { [key: string]: number }, usedAlternatives: Set<string>, alternatives: string[]): string {
    let altIndex = wordUsage[alternatives[0]] % alternatives.length;
    let chosen = alternatives[altIndex];

    let tries = 0;
    while (usedAlternatives.has(chosen) && tries < alternatives.length) {
      altIndex = (altIndex + 1) % alternatives.length;
      chosen = alternatives[altIndex];
      tries++;
    }

    usedAlternatives.add(chosen);
    return chosen;
  }

  /**
   * Navigáció a szófelhő oldalra
   */
  goToWordCloud(): void {
    const queryParams = {
      original: this.inputText,
      modified: this.outputTextClean.replace(/<[^>]+>/g, '')
    };
    this.router.navigate(['/word-cloud'], { queryParams });
  }
}
