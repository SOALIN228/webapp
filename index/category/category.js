(function () {
  let view = {
    select: $('.category-content'),
    itemTmpl: `
      <div class="category-item">
        <img class="item-icon" src="$url" alt="">
        <p class="item-name">$name</p>
      </div>`
  }

  let model = {
    // 获取数据
    fetch: function () {
      return $.get('../json/head.json')
    }
  }

  let controller = {
    view: null,
    model: null,
    init: function (view, model) {
      this.view = view
      this.model = model
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
      list.forEach((item) => {
        str += this.view.itemTmpl.replace('$url', item.url)
        .replace('$name', item.name)
      })
      this.view.select.append(str)
    },
    bindEvents: function () {
      this.view.select.on('click', '.category-item', function () {
        console.log(event.target)
      })
    }
  }

  controller.init(view, model)
})()
