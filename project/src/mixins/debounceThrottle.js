export const debounceThrottle = {
  data() {
    return {
      timer:null,
      previous:null
    }
  },
  methods:{
     /**
      * @desc  防抖
      * @param {*} func 回调函数
      * @param {*} options leading 点击一开始是否触发函数  true 触发  false 不触发
      * @param {*} wait 等待时间
      */
    debounce(func,options={leading:false},wait=500) {
      const that = this
      const args = arguments
      if(that.timer) {
        clearTimeout(that.timer)
      }
      if(options.leading && !that.timer) {
        that.timer = setTimeout(null,wait)
        func.apply(that,args)
      }else {
        that.timer = setTimeout(function() {
          func.apply(that,args)
          that.timer = null
        },wait)
      }
    },
    /**
      * @desc  节流
      * @param {*} func 回调函数
      * @param {*} wait 等待时间
      */
    throttle(fn, wait = 500) {
        let now = +new Date()
        let args = arguments
        if (now - this.previous > wait) {
          this.previous = now
          fn.apply(this, args)
        }
    }
  }
}