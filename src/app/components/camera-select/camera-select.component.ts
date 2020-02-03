import { Component, EventEmitter, OnInit, Input, Output, ChangeDetectionStrategy, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-camera-select',
  templateUrl: './camera-select.component.html',
  styleUrls: ['./camera-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CameraSelectComponent implements OnInit {
  @Input() cameras: any[];
  @Output() cameraSelectionChange = new EventEmitter<any[]>();

  showList = false;

  @HostListener('document:click', ['$event.target'])
  clickOutisde(target) {
    if (this.showList) {
      if (!this.elementRef.nativeElement.contains(target)) {
        this.showList = false;
      }
    }
  }

  get activeCameraCount() {
    return this.cameras.filter(cam => cam.checked).length;
  }

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.selectAll();
  }

  onCheckboxChange(e) {
    const checkbox = e.srcElement;
    this.cameras.find(cam => cam.name === checkbox.value).checked = checkbox.checked;
    this.cameraSelectionChange.emit(this.cameras);
  }

  clear() {
    this.cameras.forEach(cam => {
      cam.checked = false;
    });
    this.cameraSelectionChange.emit(this.cameras);
  }

  selectAll() {
    this.cameras.forEach(cam => {
      cam.checked = true;
    });
    this.cameraSelectionChange.emit(this.cameras);
  }

  toggleList() {
    this.showList = !this.showList;
  }
}
