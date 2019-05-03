(function () {
  // 得分模板字符串
  let itemTmpl = '<div class="star-score">$starstr</div>'

  function _getStars () {
    var _score = this.score.toString()
    var scoreArray = _score.split('.')

    // 满星个数
    var fullstar = parseInt(scoreArray[0])
    // 半星个数
    var halfstar = parseInt(scoreArray[1]) >= 5 ? 1 : 0
    // 0星个数
    var nullstar = 5 - fullstar - halfstar

    var starstr = ''
    // 渲染满星
    for (let i = 0; i < fullstar; i++) {
      starstr += '<div class="star fullstar"></div>'
    }
    // 渲染满星
    if (halfstar) {
      for (let j = 0 ; j < halfstar ; j++) {
        starstr += '<div class="star halfstar"></div>';
      }
    }
    // 渲染0星
    if (nullstar) {
      for (let k = 0 ; k < nullstar ; k++) {
        starstr += '<div class="star nullstar"></div>';
      }
    }
    return itemTmpl.replace('$starstr',starstr);
  }

  window.StarScore = function (score) {
    this.score = score || ''
    this.getStars = _getStars
  }
})()
