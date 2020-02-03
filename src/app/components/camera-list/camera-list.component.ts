import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-camera-list',
  templateUrl: './camera-list.component.html',
  styleUrls: ['./camera-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CameraListComponent implements OnInit {
  @Input() photos: any;
  @Input() cameras: any[];
  constructor() { }

  ngOnInit() {
  }

  get activeCameras() {
    return this.cameras.filter( cam => cam.checked === true);
  }

}
