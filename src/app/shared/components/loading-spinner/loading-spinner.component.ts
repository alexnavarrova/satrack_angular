import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html'
})
export class LoadingSpinnerComponent {
  codeArr: any = [];
  toggleCode = (name: string) => {
      if (this.codeArr.includes(name)) {
          this.codeArr = this.codeArr.filter((d: string) => d != name);
      } else {
          this.codeArr.push(name);
      }
  };

  constructor() {}
}
