import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';

@Injectable()
export class WebsocketService {
    wsConnected: boolean;

    constructor() {
    }

    private subject: Subject<MessageEvent>;

    public connect(url): Subject<MessageEvent> {
        if (!this.subject) {
            this.subject = this.create(url);
        }
        return this.subject;
    }

    private create(url): Subject<MessageEvent> {
        let ws: WebSocket;
        try {
            ws = new WebSocket(url);
        } catch (err) {
            console.error('WebSocket connection failed:', err);
            // Optionally, you could throw or handle this differently
            return new Subject<MessageEvent>();
        }

        const observable = Observable.create(
            (obs: Observer<MessageEvent>) => {
                ws.onmessage = obs.next.bind(obs);
                ws.onerror = obs.error.bind(obs);
                ws.onclose = obs.complete.bind(obs);
                return ws.close.bind(ws);
            });

        const observer = {
            next: (data: Object) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(data.toString());
                }
            }
        };

        return Subject.create(observer, observable);
    }

}
