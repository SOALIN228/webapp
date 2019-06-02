(function () {
  let view = {
    select: $('.left-bar-inner'),
    itemTmpl: `
      <div class="left-item">
        <div class="item-text">$getItemContent</div>
      </div>`
  }

  let model = {
    fetch: function () {
      return $.get('../json/food.json')
    }
  }

  let controller = {
    view: null,
    model: null,
    init: function (view, model) {
      this.view = view
      this.model = model
      this.getList()
      this.addClick()
    },
    getList: function () {
      window.food_spu_tags = []
      this.model.fetch().then((data) => {
        window.food_spu_tags = data.data.food_spu_tags || []
        this.initContentList(window.food_spu_tags)

        window.ShopBar.changeShippingPrice(data.data.poi_info.shipping_fee || 0)
      })
    },
    initContentList: function (list) {
      list.forEach((item) => {
        let str = this.view.itemTmpl
        .replace('$getItemContent', this.getItemContent(item))

        let $target = $(str)
        $target.data('itemData', item)
        this.view.select.append($target)
      })
      $('.left-item').first().click() // 默认选中第一项
    },
    getItemContent: function (data) { // 渲染数据
      if (data.icon) {
        return `<img class="item-icon" src='${data.icon}'/>${data.name}`
      } else {
        return data.name
      }
    },
    addClick: function () {
      $('.menu-inner').on('click', '.left-item', function (e) {
        let $target = $(e.currentTarget)
        $target.addClass('active')
        $target.siblings().removeClass('active')
        Right.refresh($target.data('itemData'))
      })
    }
  }

  controller.init(view, model)
})()
