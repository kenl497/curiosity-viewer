import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CuriosityService } from './services/curiosity.service';
import { Observable, throwError, of, Subject, EMPTY, from, BehaviorSubject } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'Curiosity Images';
  selectedCameras: any[] = [];
  sol: number;

  errorMessageSubject = new BehaviorSubject<string>('');
  errorMessage$ = this.errorMessageSubject.asObservable();

  rover$ = this.curiositySvc.rover$.pipe(
    map(rover => {
      this.initLocalCameras(rover.rover.cameras);
      return rover;
    }),
    take(1),
    catchError(error => {
      this.errorMessageSubject.next(error);
      return EMPTY;
    })
  );
  photos$ = this.curiositySvc.photos$.pipe(
    catchError(error => {
      this.errorMessageSubject.next(error);
      return EMPTY;
    })
  );

  constructor(private curiositySvc: CuriosityService) {}

  initLocalCameras(cameras) {
    cameras.forEach(cam => {
      cam.checked = true;
    });
    this.selectedCameras = cameras;
  }

  changeSol() {
    this.curiositySvc.setSol(this.sol.toString());
  }

  changeCameras(cameras: any[]) {
    this.selectedCameras = [...cameras];
  }
}
