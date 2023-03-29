<template>
	<view class="article_info">
		<view class="article_title">
			{{articleInfo.title}}
		</view>
		<view class="author_info">
			<image :src="articleInfo.user_pic" mode="" class="author_img" @click="lookUserInfo(articleInfo.user_id)"></image>
			<text class="author_name" @click="lookUserInfo(articleInfo.user_id)">{{articleInfo.nickname}}</text>
			<text class="date">{{articleInfo.date}}</text>
		</view>
		<view class="article_content">
			{{articleInfo.content}}
		</view>
		<view class="img_list_a" v-if="articleInfo.img_list.length <=4 ">
			<view class="img_item" v-if="img" v-for="(img,index) in articleInfo.img_list" :key="index">
				<view class="img" :style="{backgroundImage:'url('+img+')'}" @click="lookImg(img)"></view>
			</view>
		</view>
		<view class="img_list_b" v-else>
			<view class="img_item" v-if="img" v-for="(img,index) in articleInfo.img_list" :key="index">
				<view class="img" :style="{backgroundImage: 'url('+img+')'}" @click="lookImg(img)"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				articleInfo:{
					img_list:[]
				}
			};
		},
		onLoad(params) {
			this.id = params.id
			this.getArticleInfo()
		},
		methods:{
			async getArticleInfo(){  //获取文章信息的方法
				const result = await this.$myRequest({
					url:`/api/getarticleinfo/${this.id}`
				})
				if(result.data.status == 0){
					let img_list = result.data.data[0].img_list.split('#')
					img_list.shift()
					const obj = {
						...result.data.data[0],
						date:result.data.data[0].date.slice(0,10),
						img_list
					}
					this.articleInfo = obj
				}else{
					uni.showToast({
						title:result.data.message
					})
				}
			},
			lookImg(url){
				wx.previewImage({
					current: url, // 当前显示图片的http链接，默认是第一个
					urls: this.articleInfo.img_list, //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
				})
			},
			lookUserInfo(userId){
				uni.navigateTo({
					url:`/pages/UserInfo/UserInfo?id=${userId}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.article_info{
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 20rpx;
		.article_title{
			font-size: 40rpx;
			font-weight: 700;
			margin: 0 0 30rpx;
		}
		.author_info{
			display: flex;
			align-items: center;
			margin-bottom: 40rpx;
			.author_img{
				width: 80rpx;
				height: 80rpx;
				margin-right: 20rpx;
				border-radius: 50%;
			}
			.author_name{
				font-size: 35rpx;
				margin-right: 20rpx;
			}
			.date{
				color: #999;
			}
		}
		.article_content{
			font-size: 30rpx;
			margin-bottom: 20rpx;
		}
		.img_list_a{
			display: flex;
			flex-wrap: wrap;
			width: 100%;
			.img_item{
				width: 355rpx;
				height: 355rpx;
				overflow: hidden;
				display: flex;
				.img{
					width:100%;
					height:0;
					padding-bottom: 100%;
					overflow:hidden;
					background-position: center center;
					background-repeat: no-repeat;
					-webkit-background-size:cover;
					-moz-background-size:cover;
					background-size:cover;
				}
			}
		}
		.img_list_b{
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			.img_item{
				width: 236.6rpx;
				height: 236.6rpx;
				overflow: hidden;
				display: flex;
				.img{
					width:100%;
					height:0;
					padding-bottom: 100%;
					overflow:hidden;
					background-position: center center;
					background-repeat: no-repeat;
					-webkit-background-size:cover;
					-moz-background-size:cover;
					background-size:cover;
				}
			}
		}
	}
</style>
