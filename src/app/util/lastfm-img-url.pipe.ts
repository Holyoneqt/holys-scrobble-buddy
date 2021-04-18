import { Pipe, PipeTransform } from '@angular/core';

/*
 * By default loaded last.fm images are 64x64 px.
 * This pipe loads the images in larger resolution by transforming the url.
*/
@Pipe({ name: 'lastfmImage' })
export class LastfmImagePipe implements PipeTransform {
    transform(url: string): string {
        return url.replace('64s/', '').replace('avatar70s/', '');
    }
}
