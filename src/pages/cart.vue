<template>
	<div class="cart">
        <!-- 购物车 page3-->
        <div class="header3">
            购物车
        </div>
        <!-- 收货地址 -->
        <div class="address">
            <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td width="28%">收货人</td>
                    <td width="52%">张康 先生</td>
                    <td rowspan="3">修改</td>
                </tr>
                <tr>
                    <td>电话</td>
                    <td>12345678909</td>
                </tr>
                <tr>
                    <td>收货地址</td>
                    <td>北京市昌平区育知同创</td>
                </tr>
            </table>
        </div>
        <!--  -->
        <div class="coudan">
            <div></div>
            <span>闪送超市</span>
            <a href="">凑单专区</a>
            <p>￥0起送，22:00前满￥30免运费，22:00后满69免运费</p>
        </div>
        <!-- 送达时间 -->
        <div class="time">
            <span>收货时间</span>
            <span>一小时送达</span>
            <span>可预订</span>
        </div>
        <!-- 收货备注 -->
        <div class="note">
            <span>收货备注</span>
            <input type="text" name="" placeholder="可输入100字以内特殊要求">
        </div>
        <!-- gwc 列表 -->
        <table border="0" cellspacing="0" cellpadding="0" id="gwc_list">
            <tr class='gwc-item' v-for="item,key in cartData">
                <td><span><img @click="isChecked(key)" :class="{checked:item.isChecked}" src="../assets/cart_checked.gif" height="36" width="36"></span></td>
                <td><img :src="item.img"></td>
                <td>
                    <h3>{{ item.name }}</h3>
                    <span>{{ item.price }}</span>
                    <p>
                        <b @click="decrease(key)"><img class='gwc_removefromgwc' src='../assets/removeicon.gif'></b>
                        <span>{{ item.num }}</span>
                        <b @click="add(key)"><img class='gwc_addtogwc' src='../assets/addicon.gif'></b>
                    </p>
                <td>
            <tr>
        </table>
        <!-- 提交 -->
        <div class="check-ok" v-show="allCheckedShow">
            <span ><img @click="allChecked" :class="{checked:allCheckedStatus}" src="../assets/cart_checked.gif" height="36" width="36">全选</span>
            <p>共<span id="priceall">{{ sumPrice }}</span></p>
            <div><router-link to="/pay">选好了</router-link></div>
        </div>
        <!-- 空购物车 -->
        <div class="gwc-empty" v-show="emptyStatus">
            <div class="header3">
                购物车
            </div>
            <div class="gwc-empty-bg">
                <img src="../assets/gwcempty.jpg">
                <p>
                    <router-link to="/home">去逛逛</router-link>
                </p>
            </div>
        </div>		
	</div>
</template>

<script type="text/javascript">
    import CD from "../util/cartData.js";
	  export default{
        data(){
            return {
                //当前购物车数据
                cartData:{},
                //总价格
                sumPrice:0,
                //全选按钮是否被选中
                allCheckedStatus:true,
                //结算行是否显示
                allCheckedShow:false,
                emptyStatus:true
            }
        },
        created(){
            //获取sessionStorage里的购物车数据
            this.cartData = CD.getCartData();
            //购物车中的商品默认全部选中
            for(var item in this.cartData){
                this.cartData[item].isChecked = true;
            }
            //设置总价
            this.getSumPrice();
            //结算行是否显示
            this.allCheckedShow = this.isAllShow();
            //
            if(this.emitGoodsNum()){
                this.emptyStatus = false;
            };
        },
        methods:{
            //增加
            add(key){
                //增加数量
                this.cartData[key].num++;
                //数据放到sessionStorage
                CD.setCartData(this.cartData);
                //计算总价
                this.getSumPrice();
                //总数量
                this.emitGoodsNum();
            },
            //减少
            decrease(key){
              //如果只有一件时点击减少按钮，从数据中删除当前商品
                if(this.cartData[key].num == 1){
                    delete this.cartData[key];
                }else{
                  //当前不止一件时，对应商品数量减一
                    this.cartData[key].num--;
                }
                //更新 购物车数据
                CD.setCartData(this.cartData);
                this.cartData = CD.getCartData();
                //设置总价
                this.getSumPrice();
                //改变总数量
                if(this.emitGoodsNum()== 0){
                    this.emptyStatus = true;
                }else{
                    this.emptyStatus = false;
                };
                //结算行是否显示
                this.allCheckedShow = this.isAllShow();
            },
            //按钮点击事件
            isChecked(key){
                //切换按钮是否选中状态
                this.cartData[key].isChecked = !this.cartData[key].isChecked;
                //设置总价
                this.getSumPrice();
                //设置全选按钮状态
                this.isAllChecked() ? this.allCheckedStatus = true : this.allCheckedStatus = false;
            },
            //全选按钮事件
            allChecked(){
              //切换按钮是否选中状态
                this.allCheckedStatus = !this.allCheckedStatus;
                //根据全选按钮状态设置各商品按钮状态
                if(this.allCheckedStatus == true){
                    for(var i in this.cartData){
                        this.cartData[i].isChecked = true;
                    }
                }else{
                    for(var i in this.cartData){
                        this.cartData[i].isChecked = false;
                    }
                }
                //设置总价
                this.getSumPrice();
            },
            //判断全选状态
            isAllChecked(){
                for(var i in this.cartData){
                    //只要有一个商品未被选中，就返回false
                    if(this.cartData[i].isChecked == false){
                      return false;
                    }    
                }
                //所有商品都选中，返回true
                return true;
            },
            //根据商品种类数，判断是否显示结算行
            isAllShow(){
                for(var i in this.cartData){
                    return true;
                }
                return false;
            },
            /*
              将商品总数量上送到父组件
             */
            emitGoodsNum(){
                var num = 0,
                    cartData = CD.getCartData();
                for(var item in cartData){
                    num += cartData[item].num;
                }
                this.$emit("updateCartNum",num);
                return num;
            },
            //计算总价格
            getSumPrice(){
                var sum = 0;
                for(var o in this.cartData){
                    if(this.cartData[o].isChecked == false){
                        continue;
                    }
                    sum += this.cartData[o].price*this.cartData[o].num; 
                }
                sum = sum.toFixed(1);
                this.sumPrice = sum;
            }
        },
        mounted(){},
        updated(){}
    }
</script>

<style type="text/css">
.cart{
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    background: #efefef;
    color: #666;
    padding: 0 0 5rem 0;
}
/*头部*/
.header3 {
  width: 100%;
  height: 5rem;
  text-align: center;
  line-height: 5rem;
  font-size: 1.8rem;
  background: #f9fafd;
}
.address {
  width: 100%;
  height: 12rem;
  position: relative;
  background: url(../assets/borderimg.jpg) repeat-x left top, url(../assets/borderimg.jpg) repeat-x left bottom;
  background-color: #fff;
}
.address table tr {
  height: 4rem;
}
.address table tr td {
  font-size: 1.5rem;
  text-align: right;
}
.address table tr td:nth-child(2) {
  text-align: left;
  padding: 0 0 0 20px;
}
.address table tr td:nth-child(3) {
  text-align: center;
  background: url(../assets/gwcicon.gif) no-repeat right center;
}
/*凑单专区*/
.coudan {
  width: 100%;
  height: 7rem;
  border-bottom: 1px solid #ccc;
  position: relative;
  padding: 1rem 0 0 0;
  background: #fff;
  padding: 0.1px 0 0 0 ;
}
.coudan > div {
  height: 1rem;
  background: #efefef;
}
.coudan span {
  position: absolute;
  left: 1rem;
  top: 1.5rem;
  padding: 0 0 0 1rem;
  border-left: .4rem solid #ff0;
  font-size: 1.3rem;
  color: #888;
}
.coudan a {
  color: red;
  position: absolute;
  right: 1rem;
  top: 1.5rem;
  font-size: 1.3rem;
  padding: .3rem;
  border: 1px solid red;
  border-radius: 1.1rem;
}
.coudan p {
  margin: 3rem 0 0 0;
  text-indent: 1rem;
  line-height: 3rem;
  font-size: 1rem;
  color: #888;
}
/*送达时间*/
.time {
  width: 100%;
  height: 6rem;
  border-bottom: 1px solid #ccc;
  background: #fff;
  padding: 0.1px 0 0 0 ;
  line-height: 6rem;
  font-size: 1.6rem;
  display: flex;
  text-align: center;
}
.time span:nth-child(1) {
  width: 25%;
}
.time span:nth-child(2) {
  width: 50%;
  text-align: left;
  color: red;
}
.time span:nth-child(3) {
  width: 22%;
  background: url(../assets/gwcicon.gif) no-repeat right center;
  background-size: 10%;
}
/*收货备注*/
.note {
  width: 100%;
  height: 6rem;
  background: #fff;
  border-bottom: 1px solid #ccc;
}
.note span {
  display: inline-block;
  width: 25%;
  font-size: 1.6rem;
  line-height: 6rem;
  text-align: center;
}
.note input {
  width: 60%;
  height: 4rem;
  margin: 1rem 0;
  font-size: 1.5rem;
  outline: none;
  border: 1px solid #cccccc;
  border-radius: 1rem;
}
/*购物车列表*/
.page3 table {
  width: 100%;
}
.gwc-item {
  width: 100%;
  height: 8rem;
  background: #fff;
}
.gwc-item td:nth-child(1) {
  width: 15%;
  padding: 0 0 0 2rem;
}
.gwc-item td:nth-child(1) span img{
    display: block;
    background: #ccc;
    width: 2rem;height: 2rem;
    border-radius: 50%;
}
.checked{
    width: 2rem;height: 2rem;
}
.gwc-item td:nth-child(1) span .checked,.check-ok span .checked{
    background: #ff0;
}
.gwc-item td:nth-child(2) {
  width: 20%;
  text-align: center;
  vertical-align: middle;
}
.gwc-item td:nth-child(2) img {
  width: 90%;
}
.gwc-item td:nth-child(3) {
  width: 65%;
  position: relative;
}
.gwc-item td:nth-child(3) h3 {
  font-size: 1.6rem;
  position: absolute;
  font-weight: normal;
  top: 1rem;
  left: .2rem;
}
.gwc-item td:nth-child(3) > span {
  font-size: 1.3rem;
  position: absolute;
  bottom: 1rem;
  left: .2rem;
}
.gwc-item td:nth-child(3) p {
  position: absolute;
  width: 6rem;
  height: 2rem;
  right: 1rem;
  bottom: 1rem;
  display: flex;
}
.gwc-item td:nth-child(3) p span {
  width: 2rem;
  height: 2rem;
  text-align: center;
  line-height: 2rem;
}
.gwc-item td:nth-child(3) p b {
  width: 2rem;
  height: 2rem;
}
.gwc-item td:nth-child(3) p b img {
  width: 2rem;
  height: 2rem;
}
.check-ok {
  width: 100%;
  height: 5rem;
  line-height: 5rem;
  display: flex;
  background: #fff;
  font-size: 1.5rem;
  /*display: none;*/
}
.check-ok span {
  width: 30%;
  text-indent: 2rem;
}
.check-ok span img{
    border-radius: 50%;
    margin: 0 .5rem 0 0 ;
    width: 2rem;height: 2rem;
    background: #ccc;
}
.check-ok p {
  width: 50%;
  text-indent: 2rem;
}
.check-ok p span {
  color: red;
}
.check-ok>div{
  width: 20%;
  height: 5rem;
  outline: none;
  border: none;
  background: #ffd600;
  font-size: 1.4rem;
  text-align: center;
}
/*购物车空*/
.gwc-empty {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  min-height: 40rem;
  z-index: 10;
  background: #efefef;
}
.gwc-empty .gwc-empty-bg {
  margin: 30% 0 0 0;
  text-align: center;
}
.gwc-empty .gwc-empty-bg p {
  width: 5rem;
  height: 2rem;
  border: 1px solid #cccccc;
  margin: .5rem auto;
  border-radius: .4rem;
  line-height: 2rem;
}	
</style>