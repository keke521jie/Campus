<template>
	<view class="goodsinfo">
		<swiper :autoplay="true" :interval="3000" :duration="1000" class="slide">
			<swiper-item v-for="(img,i) in goodsInfo.goods_img" :key="i">
				<view class="img"
					:style="{background:'url('+img+')','background-size':'cover',bacgroundRepeat:'no-repeat','background-position':'center'}"
					@click="previewImage(i)">
					<!-- <image :src="img" mode=""></image> -->
				</view>
			</swiper-item>
		</swiper>
		<view class="userinfo">
			<view class="user">
				<image :src="goodsInfo.user_pic" mode=""></image>
				<text class="user_nickname">{{goodsInfo.nickname}}</text>
			</view>
			<text class="date">{{goodsInfo.date.slice(0,10)}}</text>
		</view>
		<view class="goodsinfo">
			<view class="goodsname">
				<text class="name">{{goodsInfo.name}}</text>
				<text class="price">{{goodsInfo.price}}</text>
			</view>
			<view class="describe">
				{{goodsInfo.goods_describe}}
			</view>
		</view>
		<uni-goods-nav class="handle" :fill="true" :options="options" :buttonGroup="buttonGroup"
			@buttonClick="rightClick" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsInfo: {
					date: ''
				},
				options: [],
				buttonGroup: [{
						text: '复制微信',
						backgroundColor: 'pink',
						color: '#fff'
					},
					{
						text: '拨打电话',
						backgroundColor: 'skyblue',
						color: '#fff'
					}
				]
			};
		},
		onLoad(params) {
			this.getGoodsInfo(params.id)
		},
		methods: {
			async getGoodsInfo(id) {
				const result = await this.$myRequest({
					url: `/api/getgoodsinfo/${id}`
				})
				if (result.data.status == 0) {
					let imglist = result.data.data[0].goods_img
					imglist = imglist.split('#')
					result.data.data[0].goods_img = imglist.filter(img => img != '')
					this.goodsInfo = result.data.data[0]
				}
			},
			rightClick(e) {
				if (e.index == 0) {
					uni.setClipboardData({
						data: this.goodsInfo.user_vx
					})
				} else {
					uni.makePhoneCall({
						phoneNumber: this.goodsInfo.user_phone
					})
				}
			},
			previewImage(i) {
				uni.previewImage({
					current: i,
					urls: this.goodsInfo.goods_img,
				});
			}
		}
	}
</script>

<style lang="scss">
	.goodsinfo {
		width: 100%;

		.img {
			width: 100%;
			height: 100%;
		}

		.slide {
			width: 100%;
			height: 474rpx;
			margin-bottom: 20rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.userinfo {
			padding: 0 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 20rpx;

			.user {
				display: flex;
				align-items: center;

				image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}

				.user_nickname {
					font-size: 40rpx;
					margin-right: 200rpx;
				}
			}

			.date {
				font-size: 20rpx;
				color: #999;
			}
		}

		.goodsinfo {
			display: flex;
			flex-direction: column;
			padding: 0 20rpx;

			.goodsname {
				display: flex;
				width: 100%;
				font-size: 50rpx;
				justify-content: space-between;
				padding: 30rpx;

				.name {
					font-weight: 700;
				}

				.price {
					color: skyblue;
				}
			}

			.describe {
				font-size: 30rpx;
				color: #999;
				padding: 20rpx;
			}
		}

		.handle {
			position: fixed;
			bottom: 0;
			width: 100%;
		}
	}
</style>
