import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { LogService } from '../services/log.service';

@Injectable()
export class HolysErrorHandler implements ErrorHandler {
    
    constructor(private logService: LogService) {}

    public handleError(error: any): void {
        if (environment.production) {
            this.logService.error(error);
        } else {
            console.error(error);
        }
    }

}
