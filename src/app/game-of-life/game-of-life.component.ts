import {coerceNumberProperty} from '@angular/cdk/coercion';
import {Component} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

/**
 * @title Configurable slider
 */
@Component({
  selector: 'app-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrls: ['./game-of-life.component.css']
})
export class GameOfLifeComponent {
  nbColumns = 20;
  nbRows = 20;
  initialFillPercent = 30;
  updateInterval = 1000;
  playStopLabel = 'Play';

  isPlaying = false;
  onPlayStopClick() {
    this.isPlaying = !this.isPlaying;
    this.playStopLabel = this.isPlaying ? 'Stop' : 'Play';
  }
}
