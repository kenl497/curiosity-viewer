import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-camera-card',
  templateUrl: './camera-card.component.html',
  styleUrls: ['./camera-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CameraCardComponent implements OnInit {
  @Input() photos: any[];
  @Input() camera: any;
  constructor() { }

  firstPhoto: any;
  photoCount: number;
  ngOnInit(): void {
  }

  ngOnChanges(): void {
    const cameraPhotos = this.photos.filter(photo => photo.camera.name === this.camera.name);
    this.photoCount = cameraPhotos.length;
    this.firstPhoto = cameraPhotos[0];
  }

}
