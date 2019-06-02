(function () {
  let view = {
    select: $('.list-wrap'),
    itemTmpl: `
      <div class="r-item-content scale-1px">
        <a href="../menu/menu.html"></a>
        <img class="item-img" src="$pic_url" alt="">
        $brand
        <div class="item-info-content clearfix">
          <p class="item-title">$name</p>
          <div class="item-desc">
            <div class="item-score">$wm_poi_score</div>
            <div class="item-count">月售$monthNum</div>
            <div class="item-distance">&nbsp;$distance</div>
            <div class="item-time">$mt_delivery_time&nbsp;|</div>
          </div>
          <div class="item-price">
            <div class="item-pre-price">$min_price_tip</div>
          </div>
          <div class="item-others">
            $others
          </div>
        </div>
      </div>`,
    strTmpl: `
    <div class="other-info">
      <img src="$icon_url" class="other-tag" alt=""/>
      <div class="other-content one-line">$info</div>
    </div>`
  }

  let model = {
    fetch: function () {
      return $.get('../json/homelist.json')
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
        let list = data.data.poilist || []
        this.initContentList(list)
        this.isLoading = false
      })
    },
    initContentList: function (list) {
      let str = ''
      list.forEach((item) => {
        str += this.view.itemTmpl
        .replace('$pic_url', item.pic_url)
        .replace('$name', item.name)
        .replace('$distance', item.distance)
        .replace('$mt_delivery_time', item.mt_delivery_time)
        .replace('$min_price_tip', item.min_price_tip)
        .replace('$brand', this.getBrand(item))
        .replace('$monthNum', this.getMonthNum(item))
        .replace('$others', this.getOthers(item))
        .replace('$wm_poi_score', new StarScore(item.wm_poi_score).getStars())
      })
      this.view.select.append(str)
    },
    // 渲染标签
    getBrand: function (data) {
      if (data.brand_type) {
        return '<div class="brand brand-pin">品牌</div>'
      } else {
        return '<div class="brand brand-xin">新到</div>'
      }
    },
    // 渲染月售数量
    getMonthNum: function (data) {
      // 大于999采用999+
      if (data.month_sale_num > 999) {
        return '999+'
      }
      return data.month_sale_num
    },
    // 渲染商家活动
    getOthers: function (data) {
      let array = data.discounts2
      let str = ''
      let strTmpl = this.view.strTmpl
      array.forEach((item) => {
        // 字符串拼接
        str += strTmpl
        .replace('$icon_url', item.icon_url)
        .replace('$info', item.info)
      })
      return str
    },
    bindEvents: function () {
      window.addEventListener('scroll', () => {
        let clienHeight = document.documentElement.clientHeight
        let scollHeight = document.body.scrollHeight
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        let proDis = 30
        if ((scrollTop + clienHeight) >= (scollHeight - proDis)) {
          if (this.page < 3) {
            if (this.isLoading) {
              return
            }
            this.getList()
          }
        }
      })
    }
  }

  controller.init(view, model)
})()
