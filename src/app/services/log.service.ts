import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type LogEntryType = 'ERROR' | 'INFO';

export interface LogEntry {
    type: LogEntryType;
    message: string;
}

@Injectable({ providedIn: 'root' })
export class LogService {

    private messages: LogEntry[];
    public messages$: BehaviorSubject<LogEntry[]>;

    constructor() {
        this.messages = [];
        this.messages$ = new BehaviorSubject(this.messages);
        this.messages$.subscribe(m => console.log(m));
    }

    public log(message: string) {
        this.createMessage('INFO', message);
    }

    public error(message: string) {
        this.createMessage('ERROR', message);
    }

    private createMessage(type: LogEntryType, message: string): void {
        this.next({ type, message });
        // if (typeof message === 'string') {
        // } else {
        //     this.next({ type, message: JSON.stringify(message)});
        // }
    }

    private next(message: LogEntry): void {
        this.messages.push(message);
        this.messages$.next(this.messages);
    }

}