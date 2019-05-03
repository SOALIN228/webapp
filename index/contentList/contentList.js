(function () {
  // 商家详情模板字符串
  let itemTmpl =
    '<div class="r-item-content">\n' +
    '  <img class="item-img" src="$pic_url" alt="">\n' +
    '  $brand\n' +
    '  <div class="item-info-content clearfix">\n' +
    '    <p class="item-title">$name</p>\n' +
    '    <div class="item-desc">\n' +
    '      <div class="item-score">$wm_poi_score</div>\n' +
    '      <div class="item-count">月售$monthNum</div>\n' +
    '      <div class="item-distance">&nbsp;$distance</div>\n' +
    '      <div class="item-time">$mt_delivery_time&nbsp;|</div>\n' +
    '    </div>\n' +
    '    <div class="item-price">\n' +
    '      <div class="item-pre-price">$min_price_tip</div>\n' +
    '    </div>\n' +
    '    <div class="item-others">\n' +
    '      $others\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>'

  // 获取商家数据
  function getList () {
    // 获取数据
    $.get('../json/homelist.json', function (data) {
      let list = data.data.poilist || []
      console.log(list)
      initContentList(list)
    })
  }

  // 渲染是否是新到和品牌标签
  function getBrand (data) {
    if (data.brand_type) {
      return '<div class="brand brand-pin">品牌</div>'
    } else {
      return '<div class="brand brand-xin">新到</div>'
    }
  }

  // 渲染月售数量
  function getMonthNum (data) {
    var num = data.month_sale_num
    // 大于999采用999+
    if (num > 999) {
      return '999+'
    }
    return num
  }

  // 渲染商家活动
  function getOthers (data) {
    let array = data.discounts2
    let str = ''
    array.forEach((item, index) => {
      let _str =
        '<div class="other-info">\n' +
        '  <img src="$icon_url" class="other-tag" alt=""/>\n' +
        '  <div class="other-content">$info</div>\n' +
        '</div>'
      _str = _str
      .replace('$icon_url', item.icon_url)
      .replace('$info', item.info)
      // 字符串拼接
      str = str + _str
    })
    return str
  }

  // 渲染数据
  function initContentList (list) {
    list.forEach(function (item, index) {
      let str = itemTmpl
      .replace('$pic_url', item.pic_url)
      .replace('$name', item.name)
      .replace('$distance', item.distance)
      .replace('$mt_delivery_time', item.mt_delivery_time)
      .replace('$min_price_tip', item.min_price_tip)
      .replace('$brand', getBrand(item))
      .replace('$monthNum', getMonthNum(item))
      .replace('$others', getOthers(item))

      $('.list-wrap').append(str)
    })
  }

  function init () {
    getList()
  }

  init()
})()
