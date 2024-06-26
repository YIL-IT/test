import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IframeService {
  getIframeEmit = new EventEmitter();
  sendIframeEmit = new EventEmitter();
  constructor() {}

  getIframeMessages(body: any) {
    this.getIframeEmit.emit(body);
  }

  sendIframeMessages(body: any) {
    this.sendIframeEmit.emit(body);
  }
}
