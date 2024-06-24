import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html'
})
export class TaskHeaderComponent {

  @Output()
  public onSetIsShowLoading: EventEmitter<boolean> = new EventEmitter();

  setIsShowLoading() {
    this.onSetIsShowLoading.emit();
  }

}
