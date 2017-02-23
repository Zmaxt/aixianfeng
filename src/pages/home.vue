<template>
	<div class="home">
		<!-- 头部 -->
		<div class="header">
			<span data-tap="1002"></span>
			<p>{{ address }}</p>
			<a href="#search" data-tap="1001">搜索</a>
		</div>	
		<!-- banner -->
		<div class="banner">
			<div class="swiper-container">
			    <div class="swiper-wrapper">
			    	<div v-for="item in swiperData" class="swiper-slide"><img :src="item.activity.img"></div>
			    </div>
		    	<div class="swiper-pagination"></div>
		  	</div>
		</div>

		<!-- 导航 -->
		<div class="nav">
			<ul>
				<li data-tap="jump|21743,11">
					<div class="nav-item1"></div>
					<p>疯狂秒杀</p>
				</li>
				<li>
					<div class="nav-item2"></div>
					<p>现货直供</p>
				</li>
				<li>
					<div class="nav-item3"></div>
					<p>整箱购</p>
				</li>
				<li>
					<div class="nav-item4"></div>
					<p>乳品</p>
				</li>
			</ul>
		</div>
		<!-- 导航2 -->
		<ul class="nav2">
			<li>
				<img src="http://img01.bqstatic.com//upload/activity/cms_117540_1480665970.jpg@90Q">
			</li>
			<li>
				<img src="http://img01.bqstatic.com//upload/activity/cms_117824_1481287745.jpg@90Q">
			</li>
			<li>
				<img src="http://img01.bqstatic.com//upload/activity/2016111122385417.jpg@90Q.jpg">
			</li>
		</ul>
		<div class="clearfixed"></div>
		<!-- 导航3 -->
		<div class="nav3">
			<img src="http://img01.bqstatic.com//upload/activity/201609232046093.png@90Q.png">
		</div>

		<ul class="nav4">
			<li>
				<img src="http://img01.bqstatic.com//upload/activity/2016092417285271.jpg@90Q.jpg">
			</li>
			<li>
				<img src="http://img01.bqstatic.com//upload/activity/2016092417282359.jpg@90Q.jpg">
			</li>
		</ul>

		<!-- 导航5 -->
		<ul class="nav5">
			<li>
				<img src="http://img01.bqstatic.com//upload/activity/2016092415283782.png@90Q.png">
				<p>优选水果</p>
			</li>
			<li>
				<img src="http://img01.bqstatic.com//upload/activity/2016092415274759.png@90Q.png">
				<p>牛奶面包</p>
			</li>
			<li>
				<img src="http://img01.bqstatic.com//upload/activity/2016092415272487.png@90Q.png">
				<p>饮料酒水</p>
			</li>
			<li>
				<img src="http://img01.bqstatic.com//upload/activity/2016092411075920.png@90Q.png">
				<p>更多</p>
			</li>
		</ul>

		<!-- 导航6 -->
		<ul class="nav6">
			<li>
				<img src="http://img01.bqstatic.com//upload/activity/2016101415281476.jpg@90Q.jpg">
			</li>
			<li>
				<img src="http://img01.bqstatic.com//upload/activity/2016112918160610.jpg@90Q.jpg">
			</li>
			<li>
				<img src="http://img01.bqstatic.com//upload/activity/201609241914489.jpg@90Q.jpg">
			</li>
			<li>
				<img src="http://img01.bqstatic.com//upload/activity/2016092417350939.png@90Q.png">
			</li>
		</ul>

		<!-- 主体 -->
		<div class="home_main">
			<div class="item" v-for="item in homeMainData">
				<div class="item-title">
					<span :style="{color:'#'+item.category_detail.category_color}">
						{{ item.category_detail.name }}
					</span>
					<a href="" data-tap="1211">更多</a>
				</div>
				<div class="item-banner">
					<img :src="item.activity.topimg">
				</div>
				<ul>
					<li v-for="i in item.category_detail.goods">
						<img :src="i.img">
						<div class="item-info">
							<h4>{{ i.keywords }}</h4>
							<p>
								<span>精选</span>
							</p>
							<p>{{ i.specifics }}</p>
							<p><span>￥{{ i.price }}</span><span>￥{{ i.market_price }}</span></p>
							<b></b>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
    import Swiper from '../../static/swiper.min.js';
	export default {
		data(){
			return {
                address:"",
				swiperData:[],
				homeData:"",
				homeMainData:[]
			}
		},
		methods:{

		},
		mounted:function(){
			//轮播图数据
			this.$http.get("http://h5.yztctech.net/api/axf/apihome.php").then(function(res){
				this.swiperData = JSON.parse(res.body).data.slide;
			});
            //首页数据
			this.$http.get("../../static/home.json").then(function(res){
                this.homeData = res.body.data;
                this.homeMainData = this.homeData.act_info[5].act_rows;
				this.address = this.homeData.dealer.address;
                //将头部的地址数据传递给父组件
				this.$emit("address",this.address);
			});
		},
		updated(){
			//图片轮播
			var mySwiper = new Swiper('.swiper-container', {
				autoplay: 2000,//可选选项，自动滑动(时间:毫秒)
				loop : true,//循环
				pagination : '.swiper-pagination',//分页器
		    });	
		}
	}
</script>

<style type="text/css">
@import url(../../static/swiper.min.css);
.home{
	padding: 5rem 0 5rem 0;
	height: 100%;
	width: 100%;
	overflow: hidden;
	overflow-y: scroll;
}
/*头部*/
.header {
  width: 100%;
  height: 5rem;
  position: fixed;
  left: 0;
  top: 0;
  line-height: 5rem;
  background: #ffd600;
  z-index: 5;
}
.header p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 6rem;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #333;
}
.header a {
  width: 5rem;
  height: 5rem;
  position: absolute;
  right: 0;
  top: 0;
  text-align: center;
  line-height: 8rem;
  font-size: 1.2rem;
  background: url(../assets/search.gif) no-repeat center 1rem;
  background-size: 40%;
}
/*广告*/
.banner {
  width: 100%;
  margin: 0 0 10px 0;
}
.swiper-container{
  width: 100%;
}
.banner img {
  width: 100%;
}

/*导航*/
.nav {
  width: 100%;
  background: #fff;
  margin: 1rem 0 0 0 ;
}
.nav ul {
  width: 100%;
  padding: 1rem 0 0 0;
}
.nav ul li {
  float: left;
  width: 25%;
  font-size: 1.5rem;
  text-align: center;
  background: #fff;
}
.nav ul li .nav-item1 {
  padding-bottom: 68%;
  background: url(http://img01.bqstatic.com//upload/activity/2016102017310618.png) no-repeat center top;
  background-size: 100% 100%;
}
.nav ul li .nav-item2 {
  padding-bottom: 68%;
  background: url(http://img01.bqstatic.com//upload/activity/2016102015101951.png) no-repeat center top;
  background-size: 100% 100%;
}
.nav ul li .nav-item3 {
  padding-bottom: 68%;
  background: url(http://img01.bqstatic.com//upload/activity/2016062509512579.png) no-repeat center top;
  background-size: 100% 100%;
}
.nav ul li .nav-item4 {
  padding-bottom: 68%;
  background: url(http://img01.bqstatic.com//upload/activity/2016100709054885.png) no-repeat center top;
  background-size: 100% 100%;
}
.nav ul li p {
  width: 100%;
  height: 3rem;
  line-height: 3rem;
}	

/*导航2*/
.nav2 {
  width: 100%;
  padding: 10px 0 0 0 ;
  display: flex;
  background: #efefef;
  justify-content: space-between;
}
.nav2 li {
  width: 33%;
  background: #fff;
}
.nav2 li img {
  width: 100%;
}

.nav3 {
  width: 100%;
  margin: 10px 0 0 0;
}
.nav3 img {
  width: 100%;
}

.nav4 {
  width: 100%;
  display: flex;
  background: #fff;
  margin: -3px 0 0 0;
  justify-content: space-around;
}
.nav4 li {
  width: 45%;
}
.nav4 li img {
  width: 100%;
}
/*导航5*/
.nav5 {
  width: 100%;
  display: flex;
}
.nav5 li {
  width: 25%;
  background: #fff;
}
.nav5 li img {
  width: 100%;
}
.nav5 li p {
  text-align: center;
  height: 2rem;
  line-height: 2rem;
  font-size: 1.2rem;
}
.nav6 {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid #eee;
}
.nav6 li {
  width: 50%;
}
.nav6 li img {
  width: 100%;
}
.nav6 li:nth-child(n+3) {
  margin: -2px 0 0 0;
}
.nav6 li:nth-child(2n+1) {
  border-right: 1px solid #eee;
}
.nav6 li:nth-child(2n) {
  border-right: 1px solid transparent;
}

/*主体*/
.item {
  background: #fff;
  margin: 8px 0 0 0;
}
.item .item-title {
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: space-between;
}
.item .item-title span {
  height: 2rem;
  margin: auto 1rem;
  color: #f38631;
  font-size: 1.8rem;
  border-left: .8rem solid #f38631;
  padding: 0 0 0 .8rem;
  line-height: 1.7rem;
}
.item .item-title a {
  height: 2rem;
  margin: auto 1rem;
  color: #999;
  font-size: 1.5rem;
  background: url(../assets/more.gif) no-repeat right center;
  background-size: 15%;
  padding: 0 1.8rem 0 0 ;
  line-height: 2rem;
}
.item .item-banner {
  padding: 0 1rem;
}
.item .item-banner img {
  width: 100%;
}
.item ul {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
  padding: 5px 0;
}
.item ul li {
  background: #fff;
  width: 33.3%;
  border-right: 1px solid #e0e0e0;
}
.item ul li img {
  width: 100%;
}
.item-info {
  padding: 0 5%;
  position: relative;
}
.item-info h4 {
  font-size: 1.3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: normal;
  height: 1.8rem;
  line-height: 1.8rem;
}
.item-info p {
  height: 1.5rem;
  line-height: 1.5rem;
}
.item-info p:nth-child(2) span {
  color: red;
  border: 1px solid red;
  border-radius: .3rem;
}
.item-info p:nth-child(4) span:first-child {
  color: red;
}
.item-info p:nth-child(4) span:nth-child(2) {
  text-decoration: line-through;
}
.item-info > b {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 3rem;
  height: 3rem;
  background: url(../assets/add.jpg) no-repeat center center;
  background-size: 80%;
}
</style>