import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-loading',
    template: `
        <mat-spinner style="margin: 80px auto;" mode="indeterminate" [diameter]="size"></mat-spinner>
        <h1 style="text-align: center; font-family: 'Amatic SC'">{{ text }}</h1>
    `,
})
export class LoadingComponent {

    /** Text that gets displayed below the loading icon */
    @Input()
    public text: string;

    /** Size of the loading spinner */
    @Input()
    public size: number = 40;

    constructor() { }

}
