var utp='u=cafff45b-6496-462a-a8de-d1bf1710bb43;'; function addTrackingEvent(delegate) { if(document.addEventListener) { document.addEventListener('DOMContentLoaded', delegate, false); } else if(window.attachEvent) {  window.attachEvent('onload', delegate); } } function findZoneFromAd(adUrl) { var sans = adUrl.replace('http://', ''); sans = sans.substring(0, sans.indexOf(';')); var urlTokens = sans.split('/'); if(urlTokens.length > 2) { var zoneReturn = ''; if(urlTokens.length > 3) { for(i = 2; i < urlTokens.length; i++) { zoneReturn = zoneReturn + '_' + urlTokens[i]; } return zoneReturn.substring(1, zoneReturn.length); } else { return urlTokens[2] + '_default'; } } var mmnProduct = window.location.hostname.split('.'); mmnProduct = mmnProduct[mmnProduct.length-2]; return mmnProduct + '_default'; } function callMMN() { var mmnSrc = 'http://view.atdmt.com/action/MSFT_EverydayHealth_AE_ExtData/v3/'; var mmnZone = findZoneFromAd(''); if(typeof(zone) == 'undefined') {  var cmedia = /(http:\/\/)?\w*[.]?(collective-media.net)\w*/i; if((typeof(adDivs) != 'undefined') && (adDivs.length > 0)) { for(u in adDivs) { if((null != adDivs[u].adURL) && (adDivs[u].adURL.search(cmedia) > -1)) { var zoneAppend = findZoneFromAd(adDivs[u].adURL); if(zoneAppend.length > 0) { mmnZone = zoneAppend; } break; } } } else { var stags = document.getElementsByTagName('script'); for(tag in stags) { if((null != stags[tag].innerHTML) && (null != stags[tag].getAttribute('src'))) { if(stags[tag].getAttribute('src').search(cmedia) > -1) { var zoneAppend = findZoneFromAd(stags[tag].getAttribute('src')); if(zoneAppend.length > 0) { mmnZone = zoneAppend; } break; } } } } } else { if((zone.length > 0) && (zone != '/')) { mmnZone = zone; } } mmnSrc = mmnSrc + 'xdt1.' + mmnZone.replace(/^\s+|\s+$/g, '').replace(/^\/*/, '').replace(/\/$/, '').replace(/\//g, '_').replace(' ', '_') + '/'; var locationTag = document.getElementsByTagName('body')[0]; var mmnPixel = document.createElement('IMG');  mmnPixel.setAttribute('src', mmnSrc); mmnPixel.setAttribute('height', '1'); mmnPixel.setAttribute('width', '1'); mmnPixel.setAttribute('style', 'position: absolute'); locationTag.insertBefore(mmnPixel, locationTag.firstChild); } addTrackingEvent(function() { callMMN(); }); 