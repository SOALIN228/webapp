(function () {
    // 订单详情模版
    let itemTmpl = '<div data-id="$id" class="menu-item">' +
      '<img class="img" src="$picture" />' +
      '<div class="menu-item-right">' +
      '<p class="item-title">$name</p>' +
      '<p class="item-desc two-line">$description</p>' +
      '<p class="item-zan">$praise_content</p>' +
      '<p class="item-price">¥$min_price<span class="unit">/$unit</span></p>' +
      '</div>' +
      '<div class="select-content">' +
      '<div class="minus"></div>' +
      '<div class="count">$chooseCount</div>' +
      '<div class="plus"></div>' +
      '</div>' +
      '</div>'

    // 渲染列表
    function initRightItem (list) {
      $('.right-list-inner').html('')

      list.forEach(function (item, index) {
        if (!item.chooseCount) {
          item.chooseCount = 0
        }
        let str = itemTmpl.replace('$picture', item.picture)
        .replace('$id', item.id)
        .replace('$name', item.name)
        .replace('$description', item.description)
        .replace('$praise_content', item.praise_content)
        .replace('$min_price', item.min_price)
        .replace('$unit', item.unit)
        .replace('$chooseCount', item.chooseCount)

        let $target = $(str)
        $target.data('itemData', item)

        $('.right-list-inner').append($target)
      })
    }

    // 渲染标题
    function initRightTitle (str) {
      $('.right-title').text(str)
    }

    function addClick () {
      $('.menu-item').on('click', '.plus', function (e) {

        let $count = $(e.currentTarget).parent().find('.count')
        $count.text(parseInt($count.text() || '0') + 1)

        let $item = $(e.currentTarget).parents('.menu-item').first()

        let itemData = $item.data('itemData')

        itemData.chooseCount = itemData.chooseCount + 1
        window.ShopBar.renderItems()
      })
      $('.menu-item').on('click', '.minus', function (e) {

        let $count = $(e.currentTarget).parent().find('.count')
        let val = Math.max((parseInt($count.text() || '0') - 1), 0)

        if ($count.text() == 0) return
        let $item = $(e.currentTarget).parents('.menu-item').first()

        let itemData = $item.data('itemData')

        $count.text(val)
        itemData.chooseCount = itemData.chooseCount - 1
        window.ShopBar.renderItems()
      })
    }

    let refresh = function (data) {
      initRightItem(data.spus || [])
      initRightTitle(data.name)
      addClick()
    }

    window.Right = {
      refresh: refresh
    }
  }

)()
