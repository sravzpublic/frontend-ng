import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IIgniteUIMessage } from './ignite-ui-message-model';

@Injectable({
    providedIn: 'root',
  })
export class IgniteUIService {
    private subject = new Subject<IIgniteUIMessage>();
    public MESSAGE_IDS = {
        'IGNITEUICOMBINEDCHARTS': '0',
        'IGNITEUICOMBINEDCHARTSIMAGEURL': '1',
        'INDEXQUOTES': '2',
        'SNPQUOTES': '3',
        'CHANGE_THEME': '4',
        'SHOW_YTD_DATA': '5',
        'SHOW_QUOTES_STATS_DATA': '6',
        'SHOW_QUOTES_LATEST_STATS': '7',
        'SPREADANALYSISURL': '49'
    };

    sendMessage(message: IIgniteUIMessage) {
        this.subject.next(message);
    }

    clearMessages() {
        this.subject.next(undefined);
    }

    getMessage(): Observable<IIgniteUIMessage> {
        return this.subject.asObservable();
    }
}
