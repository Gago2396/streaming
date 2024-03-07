import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'hello',
  templateUrl: 'inicio.component.html',
  styleUrl: 'inicio.component.css'
})
export class InicioComponent {

  showShareScreenModal = false;

  // Función para abrir el modal
  openShareScreenModal() {
    this.showShareScreenModal = true;
  }

  // Asume que tienes dos elementos video referenciados
  @ViewChild('videoChannel1') videoElementChannel1!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoChannel2') videoElementChannel2!: ElementRef<HTMLVideoElement>;

  // Variables para manejar si se está transmitiendo la pantalla
  isSharingScreenChannel1 = true;
  isSharingScreenChannel2 = false;

  // MediaStreams de cada canal
  mediaStream1: any = '';
  mediaStream2: any = '';

  // Modificado para manejar MediaStream y URLs
  changeChannel(channel: string): void {
    if (channel === 'channel1') {
      this.isSharingScreenChannel2 = false;
      this.isSharingScreenChannel1 = true;
      this.videoElementChannel1.nativeElement.srcObject = this.mediaStream1;


    } else if (channel === 'channel2') {
      this.isSharingScreenChannel1 = false;
      this.isSharingScreenChannel2 = true;
      this.videoElementChannel2.nativeElement.srcObject = this.mediaStream2;
    }
  }

  async shareScreen(channel: string) {
    try {
      //const mediaStream = await navigator.mediaDevices.getDisplayMedia({ video: true });

      if (channel === 'channel1') {
        this.mediaStream1 = await navigator.mediaDevices.getDisplayMedia({ video: true });
        this.isSharingScreenChannel1 = true;
        this.isSharingScreenChannel2 = false;
        this.videoElementChannel1.nativeElement.srcObject = this.mediaStream1;
        this.videoElementChannel1.nativeElement.play();
      } else if (channel === 'channel2') {
        this.mediaStream2 = await navigator.mediaDevices.getDisplayMedia({ video: true });
        this.isSharingScreenChannel2 = true;
        this.isSharingScreenChannel1 = false;
        this.videoElementChannel2.nativeElement.srcObject = this.mediaStream2;
        this.videoElementChannel2.nativeElement.play();
      }

      // Cierra el modal después de seleccionar
      this.showShareScreenModal = false;
    } catch (error) {
      console.error('Error al compartir pantalla:', error);
    }
  }
}