(function () {
  let itemTmpl = '<a class="$key tab-item" href="$key.html">$text</a>'

  function init () {
    let items = [{
      key: 'menu',
      text: '点菜'
    }, {
      key: '#',
      text: '评价'
    }, {
      key: '#',
      text: '商家'
    }]
    let str = ''

    items.forEach(function (item, index) {
      str += itemTmpl.replace(/\$key/g, item.key)
      .replace('$text', item.text)
    })

    $('.tab-bar').append(str)

    // 获取当前页面的url来确定key值
    let arr = window.location.pathname.split('/')
    let page = arr[arr.length - 1].replace('.html', '')

    // 通过key值为当前页面添加active样式
    $('a.' + page).addClass('active')
  }

  init()
})()
