import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
})
export class AppComponent implements AfterViewInit {

  // Récupère le conteneur principal
  @ViewChild('container') containerRef!: ElementRef;

  // Récupère le lecteur audio
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  // Indique si la musique est en cours de lecture
  musiqueEnLecture = false;

  // Indique si le navigateur a déjà tenté l'autoplay
  private autoplayTeste = false;

  // Lance automatiquement la musique après le chargement
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.lancerAutomatiquement();
    }, 300);
  }

  // Essaie de lancer automatiquement la musique
  private lancerAutomatiquement(): void {
    const audio = this.audioPlayer.nativeElement;

    audio.loop = true;
    audio.volume = 1;

    audio.play()
      .then(() => {
        this.musiqueEnLecture = true;
        this.autoplayTeste = true;
        console.log('🎵 Musique lancée automatiquement.');
      })
      .catch(() => {
        this.autoplayTeste = true;
        console.log('🔒 Autoplay bloqué par le navigateur.');
      });
  }

  // Gère le clic sur l'image
  toggleMusique(): void {
    const audio = this.audioPlayer.nativeElement;

    // Si la musique joue, on la met en pause
    if (!audio.paused) {
      audio.pause();
      this.musiqueEnLecture = false;
      console.log('⏸️ Musique en pause.');
      return;
    }

    // Si la musique est en pause, on la relance
    audio.play()
      .then(() => {
        this.musiqueEnLecture = true;
        console.log('▶️ Musique relancée.');
      })
      .catch((error) => {
        console.log('Impossible de lancer la musique :', error);
      });
  }

  // Permet de démarrer la musique avec une interaction si l'autoplay est bloqué
  @HostListener('document:pointerdown', ['$event'])
  autoriserMusique(event: PointerEvent): void {

    // Ignore le bouton fermer
    const element = event.target as HTMLElement;

    if (element.closest('.btn-sortir')) {
      return;
    }

    // Le clic sur l'image est déjà géré par toggleMusique()
    if (element.closest('.image-principale')) {
      return;
    }

    // Ne fait rien si la musique joue déjà
    if (!this.audioPlayer || !this.audioPlayer.nativeElement.paused) {
      return;
    }
  }

  // Ferme l'application et revient à la page précédente
  sortir(event: Event): void {
    // Empêche le clic de remonter jusqu'à l'image
    event.stopPropagation();

    const audio = this.audioPlayer.nativeElement;

    // Arrête la musique
    audio.pause();
    audio.currentTime = 0;

    this.musiqueEnLecture = false;

    // Revient à la page précédente du navigateur
    window.history.back();
  }
}
