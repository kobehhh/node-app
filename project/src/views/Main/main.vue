<template>
  <div>
    <div class="arrChange">
      <div v-for='(item,index) in arr' :key='index'>{{item}}--{{index}}</div>
    </div>
    <div class="objChange">
      <div v-for='(value,index) in obj' :key='index'>{{index}}--{{value}}</div>
    </div>
    <div @click='changeObj'>change Obj</div>
    <div @click='changeArr'>change Arr</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      obj:{
        name:'wlf',
        age:23,
      },
      arr:[1,2,3,4,5]
    }
  },
  methods:{
    changeObj() {
      // console.log(this.obj.__ob__.dep)
      // this.$set(this.obj,'name','171')
      this.obj.name = "qqq"
      this.obj.__ob__.dep.notify()
      // this.$forceUpdate()
      
    },
    changeArr() {
      this.arr[0] = 'wlf'
      this.arr.__ob__.dep.notify()
      // console.log(this.arr.__ob__.dep)

      // this.arr = this.arr.filter(item => {
      //   return item > 2
      // })
      // this.arr = ['wlf','qqq']
      // this.$set(this.arr,0,'qqq')
      // this.arr.splice(0,0,'wlf')
    }
  }
}
</script>

<style>

</style>