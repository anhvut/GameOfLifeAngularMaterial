import {Component, OnInit} from '@angular/core';
import {EventEmitterInitialValue} from '../util/EventEmitterInitialValue';


/**
 * @title Configurable slider
 */
@Component({
  selector: 'app-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrls: ['./game-of-life.component.css']
})
export class GameOfLifeComponent implements OnInit {
  nbColumns = 20;
  nbRows = 20;
  initialFillPercent = 10;
  updateInterval = 1000;
  playStopLabel = 'Play';
  isPlaying = false;
  gameBoardEventEmitter = new EventEmitterInitialValue<object[]>(true, () => this.gameBoard);

  private gameBoard = [];


  ngOnInit(): void {
    this.onResetClick();
  }

  publishNextGameBoard(nextBoard: object[]): void {
    this.gameBoard = nextBoard;
    this.gameBoardEventEmitter.emit(nextBoard);
  }

  onResetClick(): void {
    const threshold = this.initialFillPercent / 100;
    const nextBoard = [];
    for (let y = 0; y < this.nbRows; y++) {
      const currentRow: object = [];
      nextBoard.push(currentRow);
      for (let x = 0; x < this.nbColumns; x++) {
        currentRow.push(Math.random() < threshold);
      }
    }
    this.publishNextGameBoard(nextBoard);
  }

  onPlayStopClick(): void {
    this.isPlaying = !this.isPlaying;
    this.playStopLabel = this.isPlaying ? 'Stop' : 'Play';
  }
}
