import {Component, inject, HostListener} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { GameInfoComponent} from '../game-info/game-info.component';








@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule,
    PlayerComponent,
    MatIconModule,
    MatButtonModule,
    DialogAddPlayerComponent,
    GameInfoComponent, 
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
  
})
export class GameComponent {
  readonly dialog = inject(MatDialog);
  playerHeight: number = 50;

  pickCardAnimation = false;
  currentCard: string = '';
  game!: Game;

  constructor() {
    this.updateTopSpacing(window.innerWidth); // Initialize based on current width
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateTopSpacing(event.target.innerWidth); // Update on resize
  }

  updateTopSpacing(width: number) {
    this.playerHeight = width < 768 ? 40 : 50; // Set spacing based on screen width
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();

  }

  takeCard() {
    if (!this.pickCardAnimation && this.game.players.length > 0) {
      this.currentCard = this.game.stack.pop() || '';
      this.pickCardAnimation = true
      console.log(this.game);

      this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length

      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game.playedCards.push(this.currentCard);
      }, 1000);
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name!=='' && name!= undefined) {
      this.game.players.push(name);
    }
    });


  }
}


