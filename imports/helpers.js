export function normalizeString (string) {

}

export function normalizeStringToURLPath (string) {
  return string.replace(/\.mp3/g, '').replace(/[^\x00-\x7F]/g, '_').replace(/\.|\//gi, '').replace(/^\s+|\s+$/gm, '').toLowerCase().replace(/ /g, '_').concat('.mp3')
}

export function getLegendElements (markerType) {
  switch (markerType) {
    case 'places':
      return [{
        icon: '/img/disco-ball.svg',
        name: 'Klub'
      }, {
        icon: '/img/outdoorHall.png',
        name: 'Świeże powietrze'
      }, {
        icon: '/img/cafe.png',
        name: 'Pub/Kawiarnia'
      }, {
        icon: '/img/tv.png',
        name: 'Telewizja'
      }, {
        icon: '/img/radio.png',
        name: 'Radio'
      }, {
        icon: '/img/theatre.png',
        name: 'Teatr'
      }, {
        icon: '/img/piano.png',
        name: 'Filharmonia'
      }, {
        icon: '/img/culture.png',
        name: 'Ośrodek kultury'
      }]
    case 'media':
      return [
        {
          icon: '/img/youtube.svg',
          name: 'youtubeVideo'
        }, {
          icon: '/img/record.png',
          name: 'mp3'
        }, {
          icon: '/img/record.png',
          name: 'bandcamp'
        }
      ]
    default:
      return []
  }
}
