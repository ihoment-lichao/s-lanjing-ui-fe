import { computed } from 'vue'

export default function () {
  // 只添加千分符
  const NumFormatInPart = computed(() => {
    return function(value) {
      var intPart = Number(value)
      // var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      var intPartFormat = intPart.toLocaleString()
      return intPartFormat
    }
  })
  // 整数千分符
  const NumFormatInt = computed(() => {
    return function(value) {
      var intPart = Number(value).toFixed(0)
      var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      return intPartFormat
    }
  })
  // 浮点数千分符，两位小数
  const NumFormatFloat = computed(() => {
    return function(value) {
      if (isNaN(value)) {
        return ''
      }
      var intPart = (Math.round(value * 100) / 100).toFixed(2)
      var intPartArray = intPart.toString().split('.')
      var intPartIntPart = intPartArray[0]
      var intPartString = intPartIntPart.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      if (intPartArray.length > 1) {
        intPartString = intPartString + '.' + intPartArray[1]
      }
      return intPartString
    }
  })
  return {
    NumFormatInPart,
    NumFormatInt,
    NumFormatFloat
  }
}
// // filter(只添加千分符)
// export function NumFormatInPart () {
//   var intPart = Number(value)
//   var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
//   return intPartFormat
// }
// // filter(整数千分符)
// export function NumFormatInt () {
//   var intPart = Number(value).toFixed(0)
//   var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
//   return intPartFormat
// }
// // filter(浮点数千分符)
// export function NumFormatFloat () {
//   if (isNaN(value)) {
//     return ''
//   }
//   var intPart = (Math.round(value * 100) / 100).toFixed(2)
//   var intPartArray = intPart.toString().split('.')
//   var intPartIntPart = intPartArray[0]
//   var intPartString = intPartIntPart.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
//   if (intPartArray.length > 1) {
//     intPartString = intPartString + '.' + intPartArray[1]
//   }
//   return intPartString
// }
