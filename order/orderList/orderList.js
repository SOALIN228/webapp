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

  // 渲染总计菜品
  function getTotalPrice (data) {
    let str =
      '<div class="product-item">\n' +
      '  <span>...</span>\n' +
      '  <div class="p-total-count">\n' +
      '    总计' + data.product_count + '个菜，实付\n' +
      '    <span class="total-price">¥' + data.total + '</span>\n' +
      '  </div>\n' +
      '</div>'
    return str
  }

  // 渲染菜品
  function getProduct (data) {
    let list = data.product_list || []
    list.push({ type: 'more' })

    let str = ''
    list.forEach(function (item) {
      if (item.type === 'more') {
        str += getTotalPrice(data)
      } else {
        str +=
          '<div class="product-item">\n' +
          item.product_name +
          '  <div class="p-count">x\n' +
          item.product_count +
          '  </div>\n' +
          '</div>'
      }
    })

    return str
  }

  // 渲染评价按钮
  function getComment(data){
    let evaluation = !data.is_comment;
    if (evaluation) {
      return '<div class="evaluation clearfix">'+
        '<div class="evaluation-btn">评价</div>'+
        '</div>';

    }

    return '';
  }

  // 渲染列表
  function initContentList (list) {
    let str = ''
    list.forEach(function (item) {
      str += itemTmpl
      .replace('$poi_pic', item.poi_pic)
      .replace('$poi_name', item.poi_name)
      .replace('$status_description', item.status_description)
      .replace('$getProduct', getProduct(item))
      .replace('$getComment', getComment(item))

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
