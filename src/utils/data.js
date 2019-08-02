export function format(time, format) {
  var t = new Date(time)
  var tf = function(i) { return (i < 10 ? '0' : '') + i }
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear())
        // eslint-disable-next-line no-unreachable
        break
      case 'MM':
        return tf(t.getMonth() + 1)
        // eslint-disable-next-line no-unreachable
        break
      case 'mm':
        return tf(t.getMinutes())
        // eslint-disable-next-line no-unreachable
        break
      case 'dd':
        return tf(t.getDate())
        // eslint-disable-next-line no-unreachable
        break
      case 'HH':
        return tf(t.getHours())
        // eslint-disable-next-line no-unreachable
        break
      case 'ss':
        return tf(t.getSeconds())
        // eslint-disable-next-line no-unreachable
        break
    }
  })
}
