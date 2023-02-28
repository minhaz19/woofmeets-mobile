import {URL} from 'react-native-url-polyfill';

// /**
//  * Replaces the hostname in a URL with a CDN hostname if the original hostname is 'woofmeets.s3.amazonaws.com'.
//  *
//  * @param {string} url - The original URL.
//  * @param {Object} [opts] - The options object with optional properties: width, height, and quality.
//  * @param {number} [opts.width] - The width to use for the `/fit-in` segment of the URL.
//  * @param {number} [opts.height] - The height to use for the `/fit-in` segment of the URL.
//  * @param {number} [opts.quality] - The quality to use for the `/filters:quality` segment of the URL.
//  *
//  * @returns {string} The modified URL with the hostname replaced by the CDN hostname.
//  */
// export function replaceHostnameWithCDN(
//   url: string,
//   opts: {width: any; height: any; quality: number},
// ) {
//   try {
//     const originalURL = new URL(url);
//     if (!originalURL || originalURL.hostname !== 'woofmeets.s3.amazonaws.com') {
//       return url;
//     }
//   } catch (error) {
//     return url;
//   }

//   const {width, height, quality} = opts || {};
//   const size = width && height ? `/fit-in/${width}x${height}` : '';
//   const qualityFilter = quality ? `/filters:quality(${quality})` : '';

//   const urlObject = new URL(url);
//   urlObject.hostname = 'd3e3jk5s0fgsy2.cloudfront.net';
//   return `${urlObject.protocol}//${urlObject.hostname}${size}${qualityFilter}${urlObject.pathname}`;
// }

/**
 * Replaces the hostname in a URL with a CDN hostname if the original hostname is 'woofmeets.s3.amazonaws.com'.
 *
 * @param {string} url - The original URL.
 * @param {Object} [opts] - The options object with optional properties: width, height, and quality.
 * @param {number} [opts.width] - The width to use for the `/fit-in` segment of the URL.
 * @param {number} [opts.height] - The height to use for the `/fit-in` segment of the URL.
 * @param {number} [opts.quality] - The quality to use for the `/filters:quality` segment of the URL.
 *
 * @returns {string} The modified URL with the hostname replaced by the CDN hostname.
 */
export function replaceHostnameWithCDN(
  url: string,
  opts: {height?: number; width?: number; quality?: number},
) {
  try {
    const originalURL = new URL(url);
    if (!originalURL || originalURL.hostname !== 'woofmeets.s3.amazonaws.com')
      return url;
  } catch (error) {
    return url;
  }

  const {width, height, quality} = opts || {};
  const size = width && height ? `/fit-in/${width}x${height}` : '';
  const qualityFilter = quality ? `/filters:quality(${quality})` : '';

  const urlObject = new URL(url);
  urlObject.hostname = 'd3e3jk5s0fgsy2.cloudfront.net';

  return `${urlObject.protocol}//${urlObject.hostname}${size}${qualityFilter}${urlObject.pathname}`;
}
