(function () {
    // 订单详情模版
    let itemTmpl = '<div class="left-item">' +
      '<div class="item-text">$getItemContent</div>' +
      '</div>'

    window.food_spu_tags = []

    // 请求数据
    function getList () {
      $.get('../json/food.json', function (data) {
        window.food_spu_tags = data.data.food_spu_tags || []
        initContentList(window.food_spu_tags)

        window.ShopBar.changeShippingPrice(data.data.poi_info.shipping_fee || 0)
      })
    }

    // 渲染数据
    function getItemContent (data) {
      if (data.icon) {
        return '<img class="item-icon" src=' + data.icon + ' />' + data.name
      } else {
        return data.name
      }
    }

    // 渲染列表
    function initContentList (list) {
      list.forEach(function (item, index) {
        let str = itemTmpl
        .replace('$getItemContent', getItemContent(item))

        let $target = $(str)
        $target.data('itemData', item)

        $('.left-bar-inner').append($target)
      })
      $('.left-item').first().click()
    }

    function addClick () {
      $('.menu-inner').on('click', '.left-item', function (e) {
        let $target = $(e.currentTarget)
        $target.addClass('active')
        $target.siblings().removeClass('active')
        Right.refresh($target.data('itemData'))
      })
    }

    function init () {
      getList()
      addClick()
    }

    init()
  }

)()
