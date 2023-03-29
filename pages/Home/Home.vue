<template>
	<view class="home">
		<SlideNav :navList="newsList" :navid="id" @changeId="changeNews" />
		<NoData v-if="news.length==0" />
		<view class="newsList" v-for="(Anew,index) in news" :key="index">
			<view class="newsItem">
				<view class="user_pic">
					<image :src="Anew.user_pic" alt="">
				</view>
				<view class="content">
					<view class="user_name">
						{{Anew.nickname}}
					</view>
					<view class="con">
						{{Anew.content}}
					</view>
					<view class="imgList" v-if="Anew.img_list" :class="Anew.img_list.length  === 1 || Anew.img_list.length  ===2 || Anew.img_list.length  ===4 ? 'imgList_two' : 'imgList_three'">
						<view class="img" @click="seeImg(index,Anew.img_list)" v-for="(img,index) in Anew.img_list" :key="img" :style="{background:'url('+ img +')','background-size':'cover',bacgroundRepeat:'no-repeat','background-position':'center'}"></view>
					</view>
					<view class="date">
						{{Anew.date}}
					</view>
				</view>
			</view>
		</view>
		<uni-fab horizontal="right" vertical="bottom" @fabClick="fabClick" :popMenu="false">
		</uni-fab>
	</view>
</template>

<script>
	import SlideNav from '../../components/SlideNav.vue'
	import NoData from '../../components/NoData.vue'
	export default {
		data() {
			return {
				newsList:[],
				id: '',
				news:[]
			}
		},
		components:{
			NoData,
			SlideNav
		},
		onLoad() {
			this.getNewsList()
			this.id = 1
			this.getNews()
		},
		onShow(){
			this.getNews()
		},
		methods: {
			async getNewsList () {
				const result = await this.$myRequest({
					url:'/api/getnewslist'
				})
				if(result.data.status == 0){
					this.newsList = result.data.data
				}else{
					uni.showToast({
						title:'服务器出错！'
					})
				}
			},
			async getNews(){    //获取文章列表的方法
				const result = await this.$myRequest({
					url: '/api/getnews',
					method:'post',
					data:{
						news_id:this.id,
						page:1,
						total:10
					}
				})
				if (result.data.status == 0) {
					//处理下获取到的数据的图片列表
					this.news = result.data.data.map(item=>{
						let imgList = item.img_list
						if(imgList!==null){
							let imgs = imgList.split('#')
							let date = item.date.slice(0,10)
							imgs.shift()
							return {...item,img_list:imgs,date}
						}else{
							return item
						}
					})
				} else {
					uni.showToast({
						title: '服务器出错！'
					})
				}
			},
			changeNews(id){
				this.id = id
			},	
			fabClick(){
				uni.navigateTo({
					url:`../PublishNews/PublishNews?id=${this.id}`
				})
			},
			seeImg(index,list){
				uni.previewImage({
					current:index,
					urls:list
				})
			}
		},
		watch:{
			id(newV,oldV){
				this.getNews()
			}
		}
	}
</script>

<style lang="scss">
	.home{
		width: 100%;
		.newsList{
			width: 100%;
			padding: 10rpx 20rpx;
			display: flex;
			flex-direction: column;
			.newsItem{
				width: 100%;
				display: flex;
				margin-bottom: 20rpx;
				overflow: hidden;
				.user_pic{
					width: 80rpx;
					height: 80rpx;
					margin-right: 20rpx;
					image{
						width: 80rpx;
						height: 80rpx;
					}
				}
				.content{
					display: flex;
					width: 630rpx;
					flex-direction: column;
					padding-right: 10rpx;
					.user_name{
						font-size: 30rpx;
						color: #007efe;
						font-weight: 700;
						margin-bottom: 10rpx;
					}
					.con{
						font-size: 20rpx;
						margin-bottom: 10rpx;
					}
					.imgList{
						display: flex;
						flex-wrap: wrap;
						margin-bottom: 10rpx;
					}
					.imgList_three{
						.img{
							width: 33.33%;
							height: 0;
							padding-bottom: 33.33%;
						}
					}
					.imgList_two{
						.img{
							width: 50%;
							height: 0;
							padding-bottom: 50%;
						}
					}
					.date{
						font-size: 15rpx;
						color: #999;
					}
				}
			}
		}
	}
</style>
