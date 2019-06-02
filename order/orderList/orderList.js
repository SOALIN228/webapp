(function () {
  let view = {
    select: $('.order-list'),
    itemTmpl: `
      <div class="order-item">
        <div class="order-item-inner">
          <img src="$poi_pic" alt="" class="item-img">
          <div class="item-right">
            <div class="item-top">
              <p class="order-name one-line">$poi_name</p>
              <div class="arrow"></div>
              <div class="order-state">$status_description</div>
            </div>
            <div class="item-bottom">$getProduct</div>
          </div>
        </div>
        $getComment
      </div>`,
    totalItem: `
      <div class="product-item">
        <span>...</span>
        <div class="p-total-count">
          总计$product_count个菜，实付
          <span class="total-price">¥$total</span>
        </div>
      </div>`,
    productItem: `
      <div class="product-item">
        $product_name
        <div class="p-count">x $product_count</div>
      </div>`,
    commentItem: `
      <div class="evaluation clearfix">
        <div class="evaluation-btn">评价</div>
      </div>`
  }

  let model = {
    fetch: function () {
      return $.get('../json/orders.json')
    }
  }

  let controller = {
    view: null,
    model: null,
    page: 0,
    isLoading: false,
    init: function (view, model) {
      this.view = view
      this.model = model
      this.getList()
      this.bindEvents()
    },
    getList: function () {
      this.page++
      this.isLoading = true
      this.model.fetch().then((data) => {
        let list = data.data.digestlist || []
        this.initContentList(list)
        this.isLoading = false
      })
    },
    initContentList: function (list) {
      let str = ''
      list.forEach((item) => {
        str += this.view.itemTmpl
        .replace('$poi_pic', item.poi_pic)
        .replace('$poi_name', item.poi_name)
        .replace('$status_description', item.status_description)
        .replace('$getProduct', this.getProduct(item))
        .replace('$getComment', this.getComment(item))
      })
      this.view.select.append(str)
    },
    // 渲染菜品
    getProduct: function (data) {
      let list = data.product_list || []
      list.push({ type: 'more' })

      let str = ''
      list.forEach((item) => {
        if (item.type === 'more') {
          str += this.getTotalPrice(data)
        } else {
          str += this.view.productItem
          .replace('$product_name', item.product_name)
          .replace('$product_count', item.product_count)
        }
      })
      return str
    },
    getTotalPrice: function (data) {
      return this.view.totalItem
      .replace('$product_count', data.product_count)
      .replace('$total', data.total)
    },
    // 渲染评价按钮
    getComment: function (data) {
      if (!data.is_comment) {
        return this.view.commentItem
      }
      return ''
    },
    // 滚动加载
    bindEvents: function () {
      window.addEventListener('scroll', () => {
          let clienHeight = document.documentElement.clientHeight // 屏幕高度
          let scollHeight = document.body.scrollHeight // 内容高度
          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop // 滚动高度
          let proDis = 30 // 距离底边高度
          if ((scrollTop + clienHeight) >= (scollHeight - proDis)) {
            if (this.page < 3) {
              if (this.isLoading) {
                return
              }
              this.getList()
            }
          }
        }
      )
    }
  }

  controller.init(view, model)
})()
