import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'; // Importe les fonctionnalités nécessaires

@Component({ // Configure le composant
  selector: 'app-root', // Définit le sélecteur du composant
  templateUrl: 'app.component.html', // Définit le fichier HTML
  styleUrl: 'app.component.scss', // Définit le fichier SCSS
})
export class AppComponent implements AfterViewInit { // Définit le composant principal

  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>; // Récupère le lecteur audio

  musiqueEnLecture = false; // Indique si la musique joue

  ngAfterViewInit(): void { // S'exécute après le chargement de la vue

    const audio = this.audioPlayer.nativeElement; // Récupère le lecteur audio

    audio.loop = true; // Active la lecture en boucle

    audio.volume = 1; // Définit le volume à 100 %

    audio.addEventListener('play', () => { // Détecte le démarrage de la musique
      this.musiqueEnLecture = true; // Affiche l'état lecture
    }); // Termine l'écoute de play

    audio.addEventListener('pause', () => { // Détecte la mise en pause
      this.musiqueEnLecture = false; // Affiche l'état pause
    }); // Termine l'écoute de pause

    setTimeout(() => { // Attend 300 millisecondes
      this.lancerMusique(); // Essaie de lancer la musique
    }, 300); // Définit le délai
  } // Termine ngAfterViewInit

  private lancerMusique(): void { // Essaie de lancer la musique

    const audio = this.audioPlayer.nativeElement; // Récupère le lecteur audio

    audio.play() // Lance la musique
      .then(() => { // Si la lecture fonctionne
        this.musiqueEnLecture = true; // Affiche l'icône pause
      }) // Termine la réussite
      .catch(() => { // Si le navigateur bloque l'autoplay
        this.musiqueEnLecture = false; // Affiche l'icône lecture
      }); // Termine la gestion de l'erreur
  } // Termine lancerMusique

  toggleMusique(): void { // Gère le clic sur l'image

    const audio = this.audioPlayer.nativeElement; // Récupère le lecteur audio

    if (audio.paused) { // Vérifie si la musique est en pause

      audio.play(); // Lance la musique

    } else { // Sinon

      audio.pause(); // Met la musique en pause
    } // Termine la condition
  } // Termine toggleMusique

  pauseMusique(event: Event): void { // Gère le bouton pause ou lecture

    event.stopPropagation(); // Empêche le clic d'être transmis à l'image

    const audio = this.audioPlayer.nativeElement; // Récupère le lecteur audio

    if (audio.paused) { // Vérifie si la musique est en pause

      audio.play(); // Relance la musique

    } else { // Sinon

      audio.pause(); // Met la musique en pause
    } // Termine la condition
  } // Termine pauseMusique
} // Termine la classe