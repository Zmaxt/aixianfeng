<template>
	<div class="market">
		<div class="header">
            <p>{{ address }}</p>
            <a href="#search" data-tap="2001">搜索</a>
        </div>

        <div class="page2_main">
            <!-- 左侧列表 -->
            <div class="page2_left">
                <ul>
                    <li v-for="item,i in leftData" :category="item.id" :class="{page2_left_item_checked:item.checked}" @click="checkCategory(i,item.id)">
                        {{ item.name }}
                    </li>
                </ul>
            </div>

            <!-- 右侧列表 -->
            <div class="page2_right">
                <p>
                    <span>
                        <b>全部分类</b>
                    </span>
                    <span>
                        <b data-tap="2220"  @click="sorts">综合排序</b>
                    </span>
                </p>
                <div class="page2_sort" v-show="sortShow">
                    <ol v-show="sortShow">
                        <li class="sort_checked" @click="sortBy(0)">综合排序</li>
                        <li @click="sortBy(1)">销量最高</li>
                        <li @click="sortBy(2)">价格最低</li>
                        <li @click="sortBy(3)">价格最高</li>
                    </ol>
                </div>
                <!-- 分类数据 -->
                <ul>
                    <li v-for="item,i in rightCurrentData">
                        <div class="page2_item_left">
                            <img v-lazy="item.img">
                        </div>
                        <div class="page2_item_right">
                            <h5>{{item.name}}</h5>
                            <p>
                                <span>精选</span>
                            </p>
                            <p>{{item.specifics}}</p>
                            <p>
                                <span>￥{{ item.price }}</span>
                                <span v-if="item.market_price">￥{{ item.market_price }}</span>
                            </p>        
                        </div>
                        <b class="removefromgwc" v-show="removeBtnStatus[i]" @click="decrease(i)"></b>
                        <b class="numingwc" v-show="removeBtnStatus[i]">{{ currentNum[i] }}</b>
                        <b class="addtogwc" @click="add(i)"></b>
                    </li>
                </ul>
            </div>
        </div>    
    </div>

</template>

<script type="text/javascript">
    import CD from "../util/cartData.js";
	  export default {
        data(){
            return {
                leftData:"",
                rightData:[],
                //右侧当前显示的商品信息
                rightCurrentData:[],
                //右侧当前显示的商品种类
                currentId:"104749",
                //减少按钮 数量 是否显示
                removeBtnStatus:[],
                //当前显示的商品选择数量
                currentNum:[],
                sortShow:false
            };
        },
        props:[
            "address"//通过父组件 从首页 拿到的地址数据
        ],
        mounted(){
            //第二页数据
            this.$http.get("../../static/shansong.json").then(function(res){
                res.body.data.categories.forEach(function(item,i){
                    i==0?item.checked=true:item.checked=false;
                });
                this.leftData = res.body.data.categories;
                this.rightData = res.body.data.products;
                this.rightCurrentData = this.rightData[this.currentId];
                var th = this;
                this.rightCurrentData.forEach(function(item,i){
                    th.removeBtnStatus.push(false);
                    th.currentNum.push(0);
                });
                //显示存在于购物车中的数据
                this.showCartData();
            });
        },
        methods:{
            //显示隐藏排序选项
            sorts(){
                this.sortShow = !this.sortShow;
            },
            //排序
            sortBy(type){
                switch(type) {
                  case 1:
                      
                      break;
                  case 2:
                    //价格从低到高排序
                      this.rightCurrentData.sort(function(a,b){
                          return a.price-b.price;
                      });
                      this.sortShow = false;
                      break;
                  case 3:
                    //价格从高到低排序
                      this.rightCurrentData.sort(function(a,b){
                          return b.price-a.price;
                      });
                      this.sortShow = false;
                      break;
                  case 0:
                      //综合排序
                      this.rightCurrentData = [];
                      this.rightCurrentData = this.rightData[this.currentId];
                      this.sortShow = false;
                      break;
                }
            },
            //改变种类
            checkCategory(index,category){
                this.leftData.forEach(function(item,i){
                    i==index?item.checked=true:item.checked=false;
                });
                this.rightCurrentData = this.rightData[category];
                document.querySelector(".page2_right").querySelector("ul").scrollTop = 0;
                var th = this;
                th.removeBtnStatus = [];
                th.currentNum = [];
                this.rightCurrentData.forEach(function(item,i){
                    th.removeBtnStatus.push(false);
                    th.currentNum.push(0);
                });
                //显示存在于购物车中的数据
                this.showCartData();
            },
            //增加商品数量事件
            add(i){
                //商品数量增加
                this.$set(this.currentNum,i,this.currentNum[i]+1);
                //显示减少按钮 和 数量;
                this.$set(this.removeBtnStatus,i,true);
                //更新数据购物车数据
                this.updateCart(i,true);
                //更新总数量
                this.emitGoodsNum();
            },
            //减少商品数量事件
            decrease(i){
                if(this.currentNum[i] == 1){
                   //只有一件时，隐藏前两个按钮
                    this.removeBtnStatus[i] = false;
                    this.$set(this.currentNum,i,0);
                }else{
                    this.$set(this.currentNum,i,this.currentNum[i]-1);
                }
                //更新数据购物车数据
                this.updateCart(i,false);
                //更新总数量
                this.emitGoodsNum();
            },
            /*
              更新购物车数据，i:商品序号；flag：增加(true)或者减少(false)
             */
            updateCart(i,flag){
                    //当前购物车内的数据
                var cartData = CD.getCartData(),
                    //当前点击的商品项
                    currentItem = this.rightCurrentData[i];
                //如果购物车数据中 存在当前点击的商品项 只操作数据中的数量
                if(currentItem.name in cartData){
                    if(flag){
                        cartData[currentItem.name].num += 1;
                    }else{
                        cartData[currentItem.name].num -= 1;
                        if(cartData[currentItem.name].num == 0){
                            delete cartData[currentItem.name];
                        }
                    }
                //如果购物车数据中 不存在当前点击的商品项 将商品添加到购物车数据中，数量默认为 1
                }else{
                    var goods = {};
                    goods.name = currentItem.name;
                    goods.img = currentItem.img;
                    goods.price = currentItem.price;
                    goods.num = 1;
                    //添加到购物车数据
                    cartData[goods.name] = goods;
                }
                CD.setCartData(cartData);               
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
            },
            /*
              将购物车内的数据 显示在列表中
             */
            showCartData(){
                //购物车内数据
                var cartData = CD.getCartData();
                var th = this;
                this.rightCurrentData.forEach(function(item,i){
                    if(item.name in cartData){

                        th.$set(th.currentNum,i,cartData[item.name].num);
                        //显示减少按钮 和 数量
                        th.$set(th.removeBtnStatus,i,true);
                        //更新购物总数量
                        th.emitGoodsNum();
                    }
                });
            }
        },
        updated(){
        }
    }
</script>

<style type="text/css">
.market{
    width: 100%;height: 100%;padding: 5rem 0;
}
.page2_main {
    width: 100%;
    height: 100%;
}
/*左侧列表*/
.page2_left {
    float: left;
    width: 25%;
    height: 100%;
}
.page2_left ul {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  z-index: 1;
}
.page2_left ul li {
  width: 100%;
  height: 4.5rem;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
  color: #6d6d6d;
  font-size: 1.6rem;
  line-height: 4.5rem;
}
/*选中效果*/
.page2_left_item_checked {
  background: url(../assets/page2leftchecked.gif) no-repeat left center;
  background-size: .5rem;
}


/*右侧列表*/
.page2_right {
    float: left;
    width: 75%;height: 100%;background: #fff;
    position: relative;
}
.page2_right > p {
  height: 4.5rem;
  text-align: center;
  position: relative;
  border-bottom: 1px solid #e0e0e0;
  color: #6d6d6d;
}
.page2_right > p span {
  position: absolute;
  left: 0;
  top: 1.3rem;
  width: 50%;
  height: 2rem;
  font-size: 1.5rem;
}
.page2_right > p span b {
  font-weight: normal;
  background: url(../assets/page2_icon.gif) no-repeat right center;
  background-size: 15%;
  padding: 0 16px 0 0 ;
}
.page2_right > p span:last-child {
  position: absolute;
  left: 50%;
  border-left: 1px solid #ccc;
}
/* 排序选项 */
.page2_sort {
  position: absolute;
  left: 0;
  top: 5.5rem;
  bottom: 5rem;
  background: rgba(239, 239, 239, 0.5);
  width: 100%;
  z-index: 5;
  /*display: none;*/
}
.page2_sort ol {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background: #fff;
}
.page2_sort ol li {
  width: 28%;
  height: 3rem;
  border: 1px solid #cccccc;
  margin: .5rem 2.5%;
  border-radius: 1rem;
  text-align: center;
  line-height: 3rem;
  font-size: 1.4rem;
}
.page2_sort ol .sort_checked {
  border: 1px solid #ffff00;
  background: #FFF9D9;
}
/*分类列表*/
.page2_right ul {
    /*background: blue;*/
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
}
.page2_right ul li {
  width: 100%;
  height: 10rem;
  display: flex;
  border-bottom: 1px solid #ddd;
  position: relative;
  background: #fff;
}
.page2_right ul li .page2_item_left {
  height: 9rem;
  margin: auto 0;
}
.page2_right ul li .page2_item_left img {
  height: 80%;
  margin: 10% 0;
}
.page2_right ul li > b {
  position: absolute;
  bottom: .5rem;
  width: 2.5rem;
  height: 2.5rem;
  background: url(../assets/add.jpg) no-repeat center center;
  background-size: 80%;
}
.page2_right ul li .removefromgwc {
  right: 5rem;
  background: url(../assets/remove.jpg) no-repeat center center;
  background-size: 80%;
  /*display: none;*/
}
.page2_right ul li .numingwc {
  width: 2.5rem;
  height: 3rem;
  right: 2.5rem;
  background: none;
  text-align: center;
  line-height: 3.5rem;
  font-size: 1.5rem;
  /*display: none;*/
}
.page2_right ul li .addtogwc {
  right: 0rem;
}
.page2_item_right {
  height: 10rem;
  padding: 1rem 0 0 0;
  position: relative;
}
.page2_item_right h5 {
  font-size: 1.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: normal;
  height: 2rem;
  line-height: 2rem;
}
.page2_item_right p {
  height: 2rem;
  line-height: 2rem;
  font-size: 1.2rem;
}
.page2_item_right p:nth-child(2) span {
  color: red;
  border: 1px solid red;
  border-radius: .3rem;
  margin: 0 .2rem;
}
.page2_item_right p:nth-child(2) span:nth-child(2) {
  color: #fff;
  background: red;
}
.page2_item_right p:nth-child(4) span:first-child {
  color: red;
}
.page2_item_right p:nth-child(4) span:nth-child(2) {
  text-decoration: line-through;
}
</style>