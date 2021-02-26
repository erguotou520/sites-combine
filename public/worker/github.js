// ;(function () {
//   console.log(111)
//   var iframes = document.querySelectorAll('iframe[data-axhub]')
//   console.log('22', iframes)
//   iframes.forEach(function (iframe) {
//     var iWindow = iframe.contentWindow
//     var iHead = iWindow.document.querySelector('head')

//     var style = document.createElement('style')
//     var _css = `body > div:last-child{display:none;}`
//     style.appendChild(document.createTextNode(_css))
//     iHead.appendChild(style)
//   })
// })()
console.log('service', self)
self.addEventListener('install', () => {
  console.log('install')
})
self.addEventListener('activate', () => {
  console.log('activate')
})
self.addEventListener('fetch', async event => {
  const { request } = event
  let response = await fetch(request)
  response.headers.delete('Content-Security-Policy')
  response.headers.delete('X-Frame-Options')
  event.respondWith(Promise.resolve(originalResponse))
})
