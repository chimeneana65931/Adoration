import { Component, ElementRef, ViewChild, AfterViewInit, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'], // Notez styleUrl -> styleUrls
})
export class AppComponent implements AfterViewInit {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  isPlaying = signal<boolean>(false)

  musiqueEnLecture = false;

  ngAfterViewInit(): void {
    const audio = this.audioPlayer.nativeElement;
    audio.loop = true;
    audio.volume = 1;

    // Synchronisation fiable avec les événements réels du lecteur
    audio.addEventListener('play', () => {
      this.musiqueEnLecture = true;
    });

    audio.addEventListener('pause', () => {
      this.musiqueEnLecture = false;
    });
  }

  // Gère la lecture / pause de manière sécurisée
  toggleMusique(): void {
    const audio = this.audioPlayer.nativeElement;

    if (audio.paused) {
      audio.play().then(() => {
        this.isPlaying.set(true)
        this.musiqueEnLecture = true;
      }).catch((error) => {
        this.isPlaying.set(false)
        console.warn('Lecture bloquée par le navigateur (interaction utilisateur requise) :', error);
        this.musiqueEnLecture = false;
      });
    } else {
      audio.pause();
      this.isPlaying.set(false)
      this.musiqueEnLecture = false;
    }
  }

  pauseMusique(event: Event): void {
    event.stopPropagation();
    this.toggleMusique();
  }

  getLabelMusique(): string {
    return this.musiqueEnLecture ? 'Arrêter la musique' : 'Démarrer la musique';
  }

}