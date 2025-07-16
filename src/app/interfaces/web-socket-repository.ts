import {Observable} from 'rxjs';

export interface WebSocketRepository<T> {
  connect(): void;
  getMessages(): Observable<T>;
  sendMessage(message: T): void;
  disconnect(): void;
}
