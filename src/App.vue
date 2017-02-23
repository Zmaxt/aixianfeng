<template>
  <div id="app">   
    <router-view v-on:updateCartNum="updateCartNum" v-on:address="getAddress" :address="address"></router-view> 
    <div class="footer" >
      <ul class="footer_list">
        <li>
          <router-link to="/home">首页</router-link>
        </li>
        <li>
          <router-link to="/market">闪送超市</router-link>
        </li>
        <li>
          <router-link to="/cart">购物车</router-link>
          <strong v-if="cartNum">{{ cartNum }}</strong>
        </li>
        <li>
          <router-link to="/mine">我的</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script >

export default {
  name: 'app',
  components: {
      
  },
  methods:{
    //获得子组件传递的数据
    getAddress(mes){
        this.address = mes;
    },
    updateCartNum(num){
        this.cartNum = num;
    }
  },
  data(){
      return {
        //头部的送餐地址
        address:'',
        cartNum:0
      }
  }
}
</script>

<style type='text/css'>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
}


/*footer*/
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  background: #ede9e5;
  z-index: 1000;
}
.footer ul {
  display: flex;
}
.footer ul li {
  width: 25%;
  height: 5rem;
  background: url(./assets/foot_home.gif) no-repeat center top;
  background-size: 2rem;
  text-align: center;
  line-height: 8rem;
}
.footer ul li a {
  display: block;
  color: #666;
}
.footer ul li:nth-child(2) {
  background: url(./assets/foot_shansong.gif) no-repeat center top;
  background-size: 2rem;
}
.footer ul li:nth-child(3) {
  background: url(./assets/foot_gwc.gif) no-repeat center top;
  background-size: 2rem;
  position: relative;
}
.footer ul li:nth-child(3) strong {
  position: absolute;
  top: -0.5rem;
  right: .5rem;
  width: 2.5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
  color: #fff;
  background: red;
  border-radius: 50%;
  font-size: 1.8rem;
  /*display: none;*/
}
.footer ul li:nth-child(4) {
  background: url(./assets/foot_me.gif) no-repeat center top;
  background-size: 2rem;
}
</style>
