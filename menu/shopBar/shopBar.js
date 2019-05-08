(function () {
  // 顶部模板字符串
  let itemTopTmpl =
    '<div class="choose-content hide">' +
    '<div class="content-top">' +
    '<div class="clear-car">清空购物车</div>' +
    '</div>' +
    '</div>'

  // 底部模板字符串
  let itemBottomTmpl =
    '<div class="bottom-content">' +
    '<div class="shop-icon">' +
    '<div class="dot-num hide" ></div>' +
    '</div>' +
    '<div class="price-content">' +
    '<p class="total-price">¥<span class="total-price-span">0</span></p>' +
    '<p class="other-price">另需配送&nbsp;¥<span class="shipping-fee"></span></p>' +
    '</div>' +
    '<div class="submit-btn">去结算</div>' +
    '</div>'

  let $strBottom = $(itemBottomTmpl)
  let $strTop = $(itemTopTmpl)

  // 渲染购物车顶部
  function renderItems () {
    $($strTop).find('.choose-item').remove()
    let list = window.food_spu_tags || []
    let tmpl = '<div data-id="$id" class="choose-item">' +
      '<div class="item-name">$name</div>' +
      '<div class="price">¥<span class="total">$price</span></div>' +
      '<div class="select-content">' +
      '<div class="minus"></div>' +
      '<div class="count">$chooseCount</div>' +
      '<div class="plus"></div>' +
      '</div>' +
      '</div>'

    let totalPrice = 0
    list.forEach(function (item) {
      item.spus.forEach(function (_item) {
        if (_item.chooseCount > 0) {
          var price = _item.min_price * _item.chooseCount
          var row = tmpl.replace('$id', _item.id)
          .replace('$name', _item.name)
          .replace('$price', price)
          .replace('$chooseCount', _item.chooseCount)

          totalPrice += price
          $row = $(row)
          $row.data('itemData', _item)
          $($strTop).append($row)
        }
      })
    })
    // 改变总价
    changeTotalPrice(totalPrice)
    // 改变红点个数
    changeDot()
  }

  function changeShippingPrice (val) {
    $strBottom.find('.shipping-fee').text(val)
  }

  function changeTotalPrice (val) {
    $strBottom.find('.total-price-span').text(val)
  }

  // 改变红点
  function changeDot () {

    let $counts = $strTop.find('.count')
    let total = 0
    for (let i = 0; i < $counts.length; i++) {
      total += parseFloat($($counts[i]).text())
    }

    if (total > 0) {
      $('.dot-num').show().text(total)
    } else {
      $('.dot-num').hide()
    }
  }

  function addClick () {
    $('.shop-bar').on('click', '.shop-icon', function (e) {
      $('.mask').toggle()
      $strTop.toggle()
    })

    $strTop.on('click', '.plus', function (e) {
      let $count = $(e.currentTarget).parent().find('.count')
      $count.text(parseInt($count.text() || '0') + 1)

      let $item = $(e.currentTarget).parents('.choose-item').first()
      let itemData = $item.data('itemData')

      itemData.chooseCount = itemData.chooseCount + 1

      renderItems()

      $('.left-item.active').click()
    })
    $strTop.on('click', '.minus', function (e) {

      let $count = $(e.currentTarget).parent().find('.count')
      let val = Math.max((parseInt($count.text() || '0') - 1), 0)

      if ($count.text() == 0) return
      let $item = $(e.currentTarget).parents('.choose-item').first()

      let itemData = $item.data('itemData')

      $count.text(val)

      itemData.chooseCount = itemData.chooseCount - 1
      renderItems()
      $('.left-item.active').click()
    })
  }

  function init () {
    $('.shop-bar').append($strTop)
    $('.shop-bar').append($strBottom)
    addClick()
  }

  init()

  window.ShopBar = {
    changeTotalPrice: changeTotalPrice,
    changeShippingPrice: changeShippingPrice,
    renderItems: renderItems
  }

})()
