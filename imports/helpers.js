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
        type: 'club',
        name: 'Klub'
      }, {
        icon: '/img/outdoorHall.png',
        type: 'outdoorHall',
        name: 'Świeże powietrze'
      }, {
        icon: '/img/cafe.png',
        type: 'cafe',
        name: 'Pub/Kawiarnia'
      }, {
        icon: '/img/tv.png',
        type: 'tv',
        name: 'Telewizja'
      }, {
        icon: '/img/radio.png',
        type: 'radio',
        name: 'Radio'
      }, {
        icon: '/img/theatre.png',
        type: 'theatre',
        name: 'Teatr'
      }, {
        icon: '/img/piano.png',
        type: 'philharmonia',
        name: 'Filharmonia'
      }, {
        icon: '/img/culture.png',
        type: 'centrum kultury',
        name: 'Ośrodek kultury'
      }]
    case 'media':
      return [
        {
          icon: '/img/youtube.svg',
          name: 'youtubeVideo'
        }, {
          icon: '/img/record.png',
          type: '',
          name: 'mp3'
        }, {
          icon: '/img/record.png',
          type: '',
          name: 'bandcamp'
        }
      ]
    default:
      return []
  }
}
