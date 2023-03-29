<template>
	<view class="hobby">
		<view class="hobby_list">
			<view class="hobby_item" v-for="hobby in hobbyList" :key="hobby.id" @click="goHobbyInfo(hobby.id)">
				<!-- <image src="https://cdn.seovx.com/ha/?mom=302" mode="" class="hobby_pic"></image> -->
				<image :src="hobby.hobby_pic" class="hobby_pic"></image>
				<text class="hobby_name">{{hobby.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hobbyList:[]
			};
		},
		onLoad() {
			this.getHobbyList()
		},
		methods:{
			async getHobbyList () {
				const result = await this.$myRequest({
					url:'/api/gethobbylist'
				})
				if(result.data.status == 0){
					this.hobbyList = result.data.data 
				}else{
					uni.showToast({
						title:'服务器出错！'
					})
				}
			},
			goHobbyInfo(id){
				uni.navigateTo({
					url:`/pages/HobbyInfo/HobbyInfo?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.hobby{
		width: 100%;
		padding: 20rpx;
		.hobby_list{
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			.hobby_item{
				display: flex;
				width:177.5rpx;
				flex-direction: column;
				align-items: center;
				overflow: hidden;
				margin-bottom: 20rpx;
				.hobby_pic{
					width: 155.5rpx;
					height: 155.5rpx;
				}
				.hobby_name{
					font-size: 30rpx;
					margin-top: 10rpx
				}
			}
		}
	}
</style>
