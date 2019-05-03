(function () {
  let itemTmpl =
    '<a class="$key btn-item" href="../$key/$key.html">\n' +
    '  <div class="tab-icon"></div>\n' +
    '  <div class="btn-name">$text</div>\n' +
    '</a>'

  function init () {
    let items = [{
      key: 'index',
      text: '首页'
    }, {
      key: 'order',
      text: '订单'
    }, {
      key: 'my',
      text: '我的'
    }]

    let str = ''

    items.forEach(function (item, index) {
      str += itemTmpl.replace(/\$key/g, item.key)
      .replace('$text', item.text)
    })

    $('.bottom-bar').append(str)

    // 获取当前页面的url来确定key值
    let arr = window.location.pathname.split('/');
    let page = arr[arr.length-1].replace('.html','');

    // 通过key值为当前页面添加active样式
    $('a.'+page).addClass('active');
  }

  init()
})()
