import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {
  transform(value: string): string {
    const div = document.createElement('div');
    div.innerHTML = value;
    return div.innerText;
  }
}
