import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  presentAlertError(title : string, text : string, button : string) {
    Swal.fire({
      title: title,
      text: text,
      icon: 'error',
      confirmButtonText: button,
      customClass : {
        popup: 'swal-modal'
      }
    })
  }

  presentAlertSuccess(title : string, text : string, button : string) {
    Swal.fire({
      title: title,
      text: text,
      icon: 'success',
      confirmButtonText: button
    })
  }

  presentAlert(title : string, text : string, button : string) {
    Swal.fire({
      title: title,
      text: text,
      confirmButtonText: button
    })
  }
}
