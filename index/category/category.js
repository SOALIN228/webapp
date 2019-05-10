(function () {
  let itemTmpl =
    '<div class="category-item">\n' +
    '  <img class="item-icon" src="$url" alt="">\n' +
    '  <p class="item-name">$name</p>\n' +
    '</div>'

  let view = $('.category-content')

  let model = {
    // 获取数据
    fetch: function () {
      return $.get('../json/head.json')
    }
  }

  let controller = {
    view: null,
    model: null,
    itemTmpl: null,
    init: function (view, model, itemTmpl) {
      this.view = view
      this.model = model
      this.itemTmpl = itemTmpl
      this.initCategory()
      this.bindEvents()
    },
    initCategory: function () {
      this.model.fetch().then((data) => {
        let list = data.data.primary_filter.splice(0, 8)
        this.loadCategory(list)
      })
    },
    loadCategory: function (list) {
      let str = ''
      list.forEach(function (item) {
        str += itemTmpl.replace('$url', item.url)
        .replace('$name', item.name)
      })
      this.view.append(str)
    },
    bindEvents: function () {
      this.view.on('click', '.category-item', function () {
        console.log(event.target)
      })
    }
  }

  controller.init(view, model, itemTmpl)
})()
