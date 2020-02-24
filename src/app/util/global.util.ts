export function getCleanGeniusUrl(artist: string, track: string): string {
    const forbiddenMapping = {
        '\'': '',
        '&': 'and',
    };
    
    let cleanArtist = artist.split(' ').join('-');
    let cleanTrackName = track.split(' ').join('-');
    
    Object.keys(forbiddenMapping).forEach(key => {
        cleanArtist = cleanArtist.replace(key, forbiddenMapping[key]);
        cleanTrackName = cleanTrackName.replace(key, forbiddenMapping[key]);
    });
    return `https://www.genius.com/${cleanArtist}-${cleanTrackName}-lyrics`;
}
