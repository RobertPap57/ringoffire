import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';




@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule,
    PlayerComponent,
    MatIconModule,
    MatButtonModule,
   ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

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

      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game.playedCards.push(this.currentCard);
      }, 1000);
    }
  }
}


// openDialog(): void {
//   const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
//     data: {name: this.name(), animal: this.animal()},
//   });

//   dialogRef.afterClosed().subscribe(result => {
//     console.log('The dialog was closed');
//     if (result !== undefined) {
//       this.animal.set(result);
//     }
//   });
// }
// }