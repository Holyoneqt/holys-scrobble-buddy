import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-loading',
    template: `
        <mat-spinner style="margin: 80px auto;" mode="indeterminate"></mat-spinner>
        <h1 style="text-align: center; font-family: 'Amatic SC'">{{ text }}</h1>
    `,
})
export class LoadingComponent {

    @Input()
    public text: string;

    constructor() { }

}
