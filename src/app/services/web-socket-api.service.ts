import {WebSocketSubject} from 'rxjs/internal/observable/dom/WebSocketSubject';
import {Injectable} from '@angular/core';
import {webSocket} from 'rxjs/webSocket';
import {Observable} from 'rxjs';
import {WebSocketRepository} from '../interfaces/web-socket-repository';

@Injectable({ providedIn: 'root' })
export class WebSocketApiService implements WebSocketRepository<any> {

  private socket$: WebSocketSubject<any>;
  private url = 'ws://localhost:8080/'; // Reemplaza con tu URL

  constructor() {
    this.socket$ = webSocket({
      url: "ws://localhost:4200/3000"
    });
  }

  public connect(): void {
    this.socket$.subscribe({
      next: value => console.log('message received: ' + value),
      error: err =>  console.log(err)
    });
  }

  public sendMessage(message: any): void {
    this.socket$.next(message);
  }

  public getMessages(): Observable<any> {
    return this.socket$.asObservable();
  }

  public disconnect(): void {
    this.socket$.complete();
  }
}
