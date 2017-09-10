export function normalizeString (string) {
  return
}

export function normalizeStringToURLPath (string) {
  return string.replace(/\.mp3/g, "").replace(/[^\x00-\x7F]/g, "_").replace(/\.|\//gi, '').replace(/^\s+|\s+$/gm, '').toLowerCase().replace(/ /g, "_").concat('.mp3');
}

export function getIcons(markerType) {
  switch (markerType) {
    case 'places':
      return getIconsForPlaces();
    case 'records':
      return getIconsForRecords();
  }
}

export function getIconsForRecords () {
  return {
    youtubeVideo: '/img/youtube.svg',
    mp3: '/img/record.png'
  }
}

export function getIconsForPlaces () {
  return {
    club: '/img/disco-ball.svg',
    outdoorHall: '/img/outdoorHall.png',
    pub: '/img/cafe.png',
    tv: '/img/tv.png',
    radio: '/img/radio.png',
    theatre: '/img/theatre.png',
    philharmonia: '/img/piano.png',
    culture: '/img/culture.png'
  }
}

export function getLegendElements(markerType) {
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
      },{
        icon: '/img/culture.png',
        name: 'Ośrodek kultury'
      }]
    case 'media':
      return [
        {
          icon: '/img/youtube.svg',
          name: 'youtubeVideo'
        },{
          icon: '/img/record.png',
          name: 'mp3'
        }
      ]
    default:
      return []
  }
}