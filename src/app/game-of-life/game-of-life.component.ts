import {Component, OnInit} from '@angular/core';

const GRIDSIZE = 16;

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

  private gameBoard: boolean[][] = [];

  ngOnInit(): void {
    this.onResetClick();
  }

  publishNextGameBoard(nextBoard: boolean[][]): void {
    this.gameBoard = nextBoard;
    const canvas = <HTMLCanvasElement>document.getElementById('board');
    const ctx = canvas.getContext('2d');

    for (let y = 0, endY = this.nbRows; y < endY; y++) {
      const currentRow = nextBoard[y];
      for (let x = 0, endX = this.nbColumns; x < endX; x++) {
        const cell = currentRow[x];
        ctx.beginPath();
        ctx.fillStyle = cell ? 'limegreen' : 'white';
        ctx.fillRect(x * GRIDSIZE, y * GRIDSIZE, (x + 1) * GRIDSIZE, (y + 1) * GRIDSIZE);
      }
    }
    for (let y = 0, endY = this.nbRows; y <= endY; y++) {
      ctx.beginPath();
      ctx.lineWidth = y === 0 || y === this.nbRows ? 2 : 1;
      ctx.strokeStyle = 'darkgrey';
      ctx.moveTo(0, y * GRIDSIZE);
      ctx.lineTo(this.nbColumns * GRIDSIZE, y * GRIDSIZE);
      ctx.stroke();
    }
    for (let x = 0, endX = this.nbColumns; x <= endX; x++) {
      ctx.beginPath();
      ctx.lineWidth = x === 0 || x === this.nbColumns ? 2 : 1 ;
      ctx.strokeStyle = 'darkgrey';
      ctx.moveTo(x * GRIDSIZE, 0);
      ctx.lineTo(x * GRIDSIZE, this.nbRows * GRIDSIZE);
      ctx.stroke();
    }
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
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('board');
    canvas.width = this.nbColumns * GRIDSIZE;
    canvas.height = this.nbRows * GRIDSIZE;
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
