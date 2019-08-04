// 获取浏览器信息以及操作系统信息
export default function getBrowserInfo() {
  var agent = navigator.userAgent.toLowerCase()
  console.log(agent)
  var arr = []
  var system = agent.split(' ')[1].split(' ')[0].split('(')[1]
  arr.push(system)
  var regStr_edge = /edge\/[\d.]+/gi
  var regStr_ie = /trident\/[\d.]+/gi
  var regStr_ff = /firefox\/[\d.]+/gi
  var regStr_chrome = /chrome\/[\d.]+/gi
  var regStr_saf = /safari\/[\d.]+/gi
  var regStr_opera = /opr\/[\d.]+/gi
  // IE
  if (agent.indexOf('trident') > 0) {
    arr.push(agent.match(regStr_ie)[0].split('/')[0])
    arr.push(agent.match(regStr_ie)[0].split('/')[1])
    return arr
  }
  // Edge
  if (agent.indexOf('edge') > 0) {
    arr.push(agent.match(regStr_edge)[0].split('/')[0])
    arr.push(agent.match(regStr_edge)[0].split('/')[1])
    return arr
  }
  // firefox
  if (agent.indexOf('firefox') > 0) {
    arr.push(agent.match(regStr_ff)[0].split('/')[0])
    arr.push(agent.match(regStr_ff)[0].split('/')[1])
    return arr
  }
  // Opera
  if (agent.indexOf('opr') > 0) {
    arr.push(agent.match(regStr_opera)[0].split('/')[0])
    arr.push(agent.match(regStr_opera)[0].split('/')[1])
    return arr
  }
  // Safari
  if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0) {
    arr.push(agent.match(regStr_saf)[0].split('/')[0])
    arr.push(agent.match(regStr_saf)[0].split('/')[1])
    return arr
  }
  // Chrome
  if (agent.indexOf('chrome') > 0) {
    arr.push(agent.match(regStr_chrome)[0].split('/')[0])
    arr.push(agent.match(regStr_chrome)[0].split('/')[1])
    return arr
  } else {
    arr.push('请更换主流浏览器，例如chrome,firefox,opera,safari,IE,Edge!')
    return arr
  }
}

// 获取IP地址
// export function getYourIP() {
//   var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection
//   if (RTCPeerConnection) {
//     (function() {
//       var rtc = new RTCPeerConnection({ iceServers: [] })
//       if (1 || window.mozRTCPeerConnection) {
//         rtc.createDataChannel('', { reliable: false })
//       }

//       rtc.onicecandidate = function(evt) {
//         if (evt.candidate) grepSDP('a=' + evt.candidate.candidate)
//       }
//       rtc.createOffer(function(offerDesc) {
//         grepSDP(offerDesc.sdp)
//         rtc.setLocalDescription(offerDesc)
//       }, function(e) { console.warn('offer failed', e) })

//       var addrs = Object.create(null)
//       addrs['0.0.0.0'] = false
//       function updateDisplay(newAddr) {
//         if (newAddr in addrs) return
//         else addrs[newAddr] = true
//         var displayAddrs = Object.keys(addrs).filter(function(k) { return addrs[k] })
//         for (var i = 0; i < displayAddrs.length; i++) {
//           if (displayAddrs[i].length > 16) {
//             displayAddrs.splice(i, 1)
//             i--
//           }
//         }
//         document.getElementById('list').textContent = displayAddrs[0]
//       }

//       function grepSDP(sdp) {
//         // eslint-disable-next-line no-unused-vars
//         var hosts = []
//         sdp.split('\r\n').forEach(function(line, index, arr) {
//           if (~line.indexOf('a=candidate')) {
//             var parts = line.split(' ')
//             var addr = parts[4]
//             var type = parts[7]
//             if (type === 'host') updateDisplay(addr)
//           } else if (~line.indexOf('c=')) {
//             // eslint-disable-next-line no-redeclare
//             var parts = line.split(' ')
//             // eslint-disable-next-line no-redeclare
//             var addr = parts[2]
//             updateDisplay(addr)
//           }
//         })
//       }
//     })()
//   } else {
//     document.getElementById('list').textContent = '请使用主流浏览器：chrome,firefox,opera,safari'
//   }
// }
