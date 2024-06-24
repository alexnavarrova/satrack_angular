import {Injectable} from "@angular/core";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {


  toast: any = Swal.mixin({
    toast: true,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    customClass: { container: 'toast' },
  });

  showSuccess(message: string): void {
    this.showSnackbar(message, 'success');
  }

  showError(message: string): void {
    this.showSnackbar(message, 'error');
  }

  showInfo(message: string): void {
    this.showSnackbar(message, 'success');
  }

  showWarning(message: string): void {
    this.showSnackbar(message, 'warning-snackbar');
  }

  private showSnackbar(message: string, variant: string): void {
    this.toast.fire({
      icon: variant,
      title: message,
      padding: '10px 20px',
    });
  }

  confirm(
    title: string,
    text: string,
    icon: 'warning' | 'error' | 'success' | 'info' = 'warning',
    confirmButtonText: string = 'Yes',
    cancelButtonText: string = 'No'
  ): Promise<boolean> {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      reverseButtons: true
    }).then(result => result.isConfirmed);
  }
}
