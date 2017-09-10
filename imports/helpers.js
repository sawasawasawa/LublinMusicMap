export function normalizeString (string) {
  return
}

export function normalizeStringToURLPath (string) {
  return string.replace(/\.mp3/g, "").replace(/[^\x00-\x7F]/g, "_").replace(/\.|\//gi, '').replace(/^\s+|\s+$/gm, '').toLowerCase().replace(/ /g, "_").concat('.mp3');
}