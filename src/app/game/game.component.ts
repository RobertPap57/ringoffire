import {Component, inject,} from '@angular/core';
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

  pickCardAnimation = false;
  currentCard: string = '';
  game!: Game;

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();

  }

  takeCard() {
    if (!this.pickCardAnimation) {
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


