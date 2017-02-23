<template>
	<div class="mine">
        <!-- 头部 -->
        <div class="header4">
            <div class="header4-head">
                
            </div>
            <div class="header4-info">
                <p>18522103918</p>
                <p>
                    <img src="../assets/header4icon.gif">
                    <span>注册会员</span>
                </p>
            </div>
            <div class="header4-more">
                
            </div>
        </div>
        <!-- 收藏 -->
        <div class="shoucang">
            <p>商品收藏</p>
            <p>店铺收藏</p>
        </div>
        <!-- 我的订单 -->
        <div class="myorders">
            <p>
                <span><a href="#myorder">我的订单</a></span>
                <span><a href="#myorder">查看全部订单</a></span>
            </p>
            <ul>
                <li>待付款</li>
                <li>待收货</li>
                <li>待评价</li>
                <li>退款/售后</li>
            </ul>
        </div>
        <!-- page 其他信息 -->
        <div class="page4-info">
            <ul>
                <li><a href="#score">积分商城</a></li>
                <li><a href="#score">优惠券</a></li>
                <li><a href="#score">收货地址</a></li>
                <li><a href="#score">积分商城</a></li>
                <li><a href="#score">客服反馈</a></li>
            </ul>
        </div>
        <!-- 退出当前账号 -->
        <div class="quit">
            退出当前账号
        </div>
		
	</div>
</template>

<script type="text/javascript">
	
</script>

<style type="text/css">
.mine {
    width: 100%;height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    background: #efefef;
    color: #666;
}

.header4 {
  width: 100%;
  height: 11rem;
  background-color: #ffd600;
  display: flex;
}
.header4 .header4-head {
  width: 30%;
  background: url(../assets/header4logo.jpg) no-repeat center center;
  background-size: 66%;
}
.header4 .header4-info {
  width: 55%;
}
.header4 .header4-info p:first-child {
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  font-weight: bold;
  color: #fff;
  font-size: 1.6rem;
  margin: 2rem 0 0;
}
.header4 .header4-info p:last-child {
  width: 12rem;
  height: 4rem;
  color: red;
  position: relative;
}
.header4 .header4-info p:last-child img {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 4;
}
.header4 .header4-info p:last-child span {
  position: absolute;
  left: 3rem;
  top: 1rem;
  width: 7rem;
  height: 2rem;
  font-size: 1.2rem;
  background: #fff5bf;
  border-radius: 0 .8rem .8rem 0;
  z-index: 0;
  text-indent: 1rem;
  line-height: 2rem;
}
.header4 .header4-more {
  width: 15%;
  background: url(../assets/header4icon2.gif) no-repeat center center;
  background-size: 30%;
}
/*收藏*/
.shoucang {
  width: 100%;
  height: 4rem;
  display: flex;
  background: #f3c800;
}
.shoucang p {
  width: 50%;
  height: 2rem;
  margin: 1rem 0;
  text-indent: 7rem;
  line-height: 2rem;
  font-size: 1.4rem;
  color: #fff;
}
.shoucang p:first-child {
  border-right: 1px solid #fff;
  background: url(../assets/shoucang1.gif) no-repeat 4rem center;
  background-size: 10%;
}
.shoucang p:last-child {
  background: url(../assets/shoucang2.gif) no-repeat 4rem center;
  background-size: 10%;
}
/*我的订单*/
.myorders {
  width: 100%;
  height: 12rem;
  background: #fff;
  margin: 1rem 0 0 0;
}
.myorders p {
  width: 100%;
  height: 5rem;
  border-bottom: 1px solid #ccc;
  line-height: 5rem;
  font-size: 1.6rem;
  display: flex;
  justify-content: space-between;
}
.myorders p span a {
  color: #666;
}
.myorders p span:first-child {
  padding: 0 0 0 1rem;
}
.myorders p span:last-child {
  padding: 0 1.5rem 0 0;
  margin: 0 1rem 0 0 ;
  background: url(../assets/header4icon3.gif) no-repeat right center;
  background-size: 7%;
}
.myorders ul {
  width: 100%;
  height: 7rem;
  display: flex;
}
.myorders ul li {
  width: 25%;
  height: 7rem;
  font-size: 1.4rem;
  line-height: 10rem;
  text-align: center;
  background: url(../assets/header4icon4.gif) no-repeat center 1.4rem;
  background-size: 2rem;
}
.myorders ul li:nth-child(2) {
  background: url(../assets/header4icon5.gif) no-repeat center 1.4rem;
  background-size: 2rem;
}
.myorders ul li:nth-child(3) {
  background: url(../assets/header4icon6.gif) no-repeat center 1.4rem;
  background-size: 2rem;
}
.myorders ul li:nth-child(4) {
  background: url(../assets/header4icon7.gif) no-repeat center 1.4rem;
  background-size: 2rem;
}
/*page4 其他信息*/
.page4-info {
  width: 100%;
  height: 16rem;
  background: #fff;
  margin: 1rem 0 0 0 ;
}
.page4-info ul {
  width: 100%;
  height: 16rem;
  display: flex;
  flex-wrap: wrap;
}
.page4-info ul li {
  width: 25%;
  height: 8rem;
  border-bottom: 1px solid #ccc;
  font-size: 1.4rem;
  line-height: 13rem;
  text-align: center;
  background: url(../assets/page4icon1.gif) no-repeat center 2rem;
  background-size: 2rem;
}
.page4-info ul li a {
  display: block;
  width: 100%;
  height: 8rem;
}
.page4-info ul li:nth-child(2) {
  background: url(../assets/page4icon2.gif) no-repeat center 2rem;
  background-size: 2rem;
}
.page4-info ul li:nth-child(3) {
  background: url(../assets/page4icon3.gif) no-repeat center 2rem;
  background-size: 2rem;
}
.page4-info ul li:nth-child(4) {
  background: url(../assets/page4icon4.gif) no-repeat center 2rem;
  background-size: 2rem;
}
.page4-info ul li:nth-child(5) {
  background: url(../assets/page4icon5.gif) no-repeat center 2rem;
  background-size: 2rem;
  border: none;
}
/*退出当前账号*/
.quit {
  width: 100%;
  height: 4rem;
  text-align: center;
  font-size: 1.6rem;
  background: #fff;
  margin: 3rem 0 0 0 ;
  line-height: 4rem;
}
	
</style>