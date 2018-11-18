import {Component, OnInit} from '@angular/core';
import {EventEmitterInitialValue} from '../util/EventEmitterInitialValue';


/**
 * @title Game of life
 */
@Component({
  selector: 'app-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrls: ['./game-of-life.component.css']
})
export class GameOfLifeComponent implements OnInit {
  nbColumns = 40;
  nbRows = 25;
  initialFillPercent = 20;
  updateInterval = 250;
  playStopLabel = 'Play';
  isPlaying = false;
  playIntervalHandle = null;
  generationNumber = 0;
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
      const currentRow = [];
      nextBoard.push(currentRow);
      for (let x = 0; x < this.nbColumns; x++) {
        currentRow.push(Math.random() < threshold);
      }
    }
    this.generationNumber = 0;
    this.publishNextGameBoard(nextBoard);
  }

  onPlayStopClick(): void {
    this.isPlaying = !this.isPlaying;
    this.playStopLabel = this.isPlaying ? 'Stop' : 'Play';
    if (this.isPlaying) {
      if (this.gameBoard.length !== this.nbRows || this.gameBoard[0].length !== this.nbColumns) {
        // board size not synchronized => recreate one
        this.onResetClick();
      }
      this.playIntervalHandle = setInterval(this.updateGameBoard.bind(this), this.updateInterval);
    } else {
      clearInterval(this.playIntervalHandle);
    }
  }

  updateGameBoard(): void {
    const nextBoard = [];
    for (let y = 0; y < this.nbRows; y++) {
      const currentRow = [];
      nextBoard.push(currentRow);

      const startY = Math.max(y - 1, 0);
      const endY = Math.min(y + 2, this.nbRows);

      for (let x = 0; x < this.nbColumns; x++) {
        // get nb neighbours
        let nbNeighbours = 0;
        const startX = Math.max(x - 1, 0);
        const endX = Math.min(x + 2, this.nbColumns);

        for (let cy = startY; cy < endY; cy++) {
          const currentCountRow = this.gameBoard[cy];
          for (let cx = startX; cx < endX; cx++) {
            if (currentCountRow[cx]) {
              nbNeighbours++;
            }
          }
        }
        const currentState = this.gameBoard[y][x];
        if (currentState) { nbNeighbours--; }

        const isReproduce = nbNeighbours === 3;
        const isSurvival = currentState && nbNeighbours === 2;
        const nextState = isReproduce || isSurvival;
        currentRow.push(nextState);
      }
    }
    this.generationNumber++;
    this.publishNextGameBoard(nextBoard);
  }
}
