import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ImageTransferService {
  private croppedImage: string | null = null;

  setImage(data: string) {
    this.croppedImage = data;
  }

  getImage(): string | null {
    return this.croppedImage;
  }

  clear() {
    this.croppedImage = null;
  }
}
