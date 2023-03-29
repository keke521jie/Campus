<template>
	<view class="user_info_container">
		<view class="userinfo">
			<!-- https://cdn.seovx.com/?mom=302 -->
			<image class="user_pic" :src="userInfo.user_pic" mode=""></image>
			<text class="nickname">{{userInfo.nickname}}</text>
		</view>
		<view class="email">
			邮箱：<text>{{userInfo.email}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{}
			};
		},
		onLoad(params) {
			this.getUserInfo(params.id)
		},
		methods:{
			async getUserInfo(userId){
				const result = await this.$myRequest({
					url:`/api/getuserinfo/${userId}`
				})
				if(result.data.status == 0){
					this.userInfo = result.data.data[0]
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #eee;
	}
	.user_info_container{
		width: 100%;
		padding: 20rpx;
		.userinfo{
			width: 100%;
			border-radius: 10rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 35rpx 0;
			background-color: #fff;
			margin-bottom: 20rpx;
			.user_pic{
				width: 200rpx;
				height: 200rpx;
				border-radius: 50%;
				margin-bottom: 20rpx;
			}
			.nickname{
				font-size: 35rpx;
			}
		}
		.email{
			font-size: 40rpx;
			width: 100%;
			background-color: #fff;
			padding: 20rpx;
			border-radius: 10rpx;
			text{
				font-size: 30rpx;
			}
		}
	}
</style>
