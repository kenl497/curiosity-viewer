import { Component } from '@angular/core';
import { CuriosityService } from './services/curiosity.service';
import { Observable, throwError, of, Subject, EMPTY } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Curiosity Images';
  selectedCameras: any[] = [];
  sol: number;

  rover$ = this.curiositySvc.rover$.pipe(
    map(rover => {
      this.initLocalCameras(rover.rover.cameras);
      return rover;
    })
  );
  photos$: Observable<any>;

  constructor(private curiositySvc: CuriosityService) { }

  initLocalCameras(cameras) {
    cameras.forEach(cam => {
      cam.checked = true;
    });
    this.selectedCameras = cameras;
  }

  changeSol() {
    this.photos$ = this.curiositySvc.getPhotos(this.sol);
  }

  changeCameras(cameras: any[]) {
    this.selectedCameras = [...cameras];
  }
}
