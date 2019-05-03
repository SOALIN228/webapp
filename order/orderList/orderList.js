(function () {

  // 订单卡片模板
  let itemTmpl =
    '<div class="order-item">\n' +
    '  <div class="order-item-inner">\n' +
    '    <img src="$poi_pic" alt="" class="item-img">\n' +
    '    <div class="item-right">\n' +
    '      <div class="item-top">\n' +
    '        <p class="order-name one-line">$poi_name</p>\n' +
    '        <div class="arrow"></div>\n' +
    '        <div class="order-state">$status_description</div>\n' +
    '      </div>\n' +
    '      <div class="item-bottom">$getProduct</div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  $getComment\n' +
    '</div>'

  // 渲染列表
  function initContentList (list) {
    let str = ''
    list.forEach(function (item) {
      str += itemTmpl
      .replace('$poi_pic', item.poi_pic)
      .replace('$poi_name', item.poi_name)

    })
    $('.order-list').append(str)
  }

  // 请求数据
  function getList () {
    $.get('../json/orders.json', function (data) {
      let list = data.data.digestlist || []
      initContentList(list)
    })
  }

  function init () {
    getList()
  }

  init()
})()
