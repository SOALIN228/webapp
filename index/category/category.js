(function () {
  // 类目模板字符串
  let itemTmpl =
    '<div class="category-item">\n' +
    '  <img class="item-icon" src="$url" alt="">\n' +
    '  <p class="item-name">$name</p>\n' +
    '</div>'

  // 渲染元素
  function initCategory () {
    // 获取数据
    $.get('../json/head.json', function (data) {
      let list = data.data.primary_filter.splice(0, 8)
      list.forEach(function (item, index) {
        let str = itemTmpl.replace('$url', item.url)
        .replace('$name', item.name)

        $('.category-content').append(str)
      })
    })
  }

  // 给item添加click事件
  function addClick () {
    $('.category-content').on('click', '.category-item', function () {
      console.log(event.target)
    })
  }

  function init () {
    initCategory()
    addClick()
  }

  init()
})()
