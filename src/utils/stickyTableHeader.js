/** 吸附表头，适用于el-table Table-column Attributes 未设置fixed的表格
 * @method stickyTableHeader
 * @param {NodeList} tableList 表格dom列表
 * @desc 页面滚动时，固定表格表头在顶部（scrollHandler）。调整window窗口大小时，自动调整表格表头和tbody宽度
 */
export function stickyTableHeader (tableList) {
  if (!tableList || tableList.length < 0) {
    return
  }
  window.tableList = tableList
  EventUtil.addHandler(document, 'scroll', scrollHandler)
  EventUtil.addHandler(window, 'resize', resizeHandler)
}

/**
 * @method removeListener
 * @desc 移除监听器 scroll,resize
 */
export function removeListener () {
  EventUtil.removeHandler(document, 'scroll', scrollHandler)
  EventUtil.removeHandler(window, 'resize', resizeHandler)
}

/**
 * @property EventUtil 跨浏览器的事件处理程序
 * @desc addHandler 添加事件处理程序 ，removeHandler 移除事件处理程序
 */
var EventUtil = {
  // @params：要操作的元素、事件名称和事件处理程序函数。
  addHandler: function (element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false)
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, handler)
    } else {
      element['on' + type] = handler
    }
  },
  removeHandler: function (element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false)
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, handler)
    } else {
      element['on' + type] = null
    }
  }
}

/**
 * @property scrollHandler
 * @desc 固定表格表头在顶部
 */
var scrollHandler = function () {
  // 获取绑定到window上的table NodeList
  let tableList = window.tableList
  // 获取滚动条高度
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  // 获取搜索栏
  let headerHeight = document.getElementsByClassName('search-box')[0].clientHeight
  for (let i = 0, len = tableList.length; i < len; i++) {  // 遍历 NodeList
    if (tableList[i] && tableList[i].$el) {
      var table = tableList[i].$el.firstChild
      let offsetTop = getOffsetTopByBody(table)
      var headerWrapperNode = ''
      var bodyWrapperNode = ''
      for (var k = 0, le = table.childNodes.length; k < le; k++) {
        // 遍历childNodes，查找出headerWrapperNode，bodyWrapperNode
        if (table.childNodes[k] && table.childNodes[k].classList && table.childNodes[k].classList.contains('el-table__header-wrapper')) {
          headerWrapperNode = table.childNodes[k]
        } else if (table.childNodes[k] && table.childNodes[k].classList && table.childNodes[k].classList.contains('el-table__body-wrapper')) {
          bodyWrapperNode = table.childNodes[k]
        }
      }
      if (headerWrapperNode && bodyWrapperNode) {
        // 调整headerWrapperNode宽度和bodyWrapperNode保持一致
        headerWrapperNode.style.width = bodyWrapperNode.clientWidth + 'px'
        // headerWrapperNode滚动到可视区域顶部，固定表头在顶部 且table 还在可是区域内
        if ((scrollTop > offsetTop - headerHeight) && (scrollTop < table.offsetHeight + offsetTop - headerHeight)) {
          if (!headerWrapperNode.classList.contains('sticky-table-fix')) {
            headerWrapperNode.classList.add('sticky-table-fix')
            // bodyWrapperNode.style.marginTop = headerWrapperNode.offsetHeight + 'px'
            // bodyWrapperNode.style.top = headerHeight + 'px'

          }
        } else {
          if (headerWrapperNode.classList.contains('sticky-table-fix')) {
            headerWrapperNode.classList.remove('sticky-table-fix')
            // bodyWrapperNode.style.marginTop = 0 + 'px'
            // bodyWrapperNode.style.top = 0 + 'px'

          }
        }
      }
    }
  }
}

/**
 * @property resizeHandler
 * @desc 调整window窗口大小时，自动调整表格表头和tbody宽度
 */
var resizeHandler = function () {
  let tableList = window.tableList
  for (let i = 0, len = tableList.length; i < len; i++) {
    if (tableList[i] && tableList[i].$el) {
      var table = tableList[i].$el
      var headerWrapperNode = ''
      var bodyWrapperNode = ''
      for (var k = 0, le = table.childNodes.length; k < le; k++) {
        if (table.childNodes[k] && table.childNodes[k].classList && table.childNodes[k].classList.contains('el-table__header-wrapper')) {
          headerWrapperNode = table.childNodes[k]
        } else if (table.childNodes[k] && table.childNodes[k].classList && table.childNodes[k].classList.contains('el-table__body-wrapper')) {
          bodyWrapperNode = table.childNodes[k]
        }
      }
      if (headerWrapperNode && bodyWrapperNode) {
        headerWrapperNode.style.width = bodyWrapperNode.clientWidth + 'px'
      }
    }
  }
}

// 元素相对于body的offsetTop
export function getOffsetTopByBody (el) {
  let offsetTop = 0
  while (el && el.tagName !== 'BODY') {
    offsetTop += el.offsetTop
    el = el.offsetParent
  }
  return offsetTop
}
