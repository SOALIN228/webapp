(function () {
  let view = {
    select: $('.bottom-bar'),
    itemTmpl: `
      <a class="$key btn-item" href="../$key/$key.html">
        <div class="tab-icon"></div>
        <div class="btn-name">$text</div>
      </a>`
  }

  let controller = {
    view: null,
    items: null,
    init: function (view) {
      this.view = view
      this.initItems()
      this.loadItems()
      this.addCurrentClass()
    },
    initItems: function () {
      this.items = [{
        key: 'index',
        text: '首页'
      }, {
        key: 'order',
        text: '订单'
      }, {
        key: 'my',
        text: '我的'
      }]
    },
    loadItems: function () {
      let str = ''
      this.items.forEach((item) => {
        str += this.view.itemTmpl.replace(/\$key/g, item.key)
        .replace('$text', item.text)
      })
      this.view.select.append(str)
    },
    addCurrentClass: function () {
      // 获取当前页面的url来确定key值
      let arr = window.location.pathname.split('/')
      let page = arr[arr.length - 1].replace('.html', '')
      // 通过key值为当前页面添加active样式
      $('a.' + page).addClass('active')
    }
  }

  controller.init(view)
})()
