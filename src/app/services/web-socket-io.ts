import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {WebSocketRepository} from '../interfaces/web-socket-repository';
import {map, Observable} from 'rxjs';

@Injectable({ providedIn: "root"})
export class WebSocketIo extends Socket implements WebSocketRepository<any> {
  constructor() {
    super({ url: "http://localhost:8080"});
  }

  getMessages(): Observable<any> {
    return super.fromEvent('message').pipe(map((value: any) => value));
  }

  sendMessage(message: any): void {
    super.emit(message);
  }

}
