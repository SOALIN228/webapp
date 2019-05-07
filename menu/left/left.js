(function () {
    // 订单详情模版
    let itemTmpl = '<div class="left-item">' +
      '<div class="item-text">$getItemContent</div>' +
      '</div>'

    // 请求数据
    function getList () {
      $.get('../json/food.json', function (data) {
        let list = data.data.food_spu_tags || []
        initContentList(list)
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
    }


    function init () {
      getList()
      getItemContent()
    }

    init()
  }

)()
