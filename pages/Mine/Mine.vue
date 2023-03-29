<template>
	<view class="mine">
		<view class="login" v-show="isLogin">
			<view class="userinfo">
				<!-- https://cdn.seovx.com/?mom=302 -->
				<image class="user_pic" :src="user_pic" mode=""></image>
				<text class="nickname">{{userInfo.nickname}}</text>
			</view>
			<view class="user_handle">
				<view class="item" @click="updeuserinfo">
					<uni-icons type="compose" size="25" class="icon"></uni-icons><text>修改个人信息</text>
				</view>
				<view class="item" @click="updePwd">
					<uni-icons type="compose" size="25" class="icon"></uni-icons><text>修改密码</text>
				</view>
			</view>
			<view class="quit" @click="quit">
				<uni-icons type="pulldown" size="25" class="icon" color="#fff"></uni-icons><text>退出登录</text>
			</view>
		</view>
		<view class="no-login" v-show="!isLogin">
			<view class="login-btn" @click="login">
				<text>登录/注册</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin: false,
				userInfo: {},
			}
		},
		onShow() {
			this.getUserInfo()
			if (uni.getStorageSync('token')) {
				this.isLogin = true
			} else {
				this.isLogin = false
			}
		},
		methods: {
			async getUserInfo() { //获取用户信息的方法
				if (!uni.getStorageSync('token')) {
					return
				}
				let result = await this.$myRequest({
					url: '/my/userinfo',
				})
				if (result.data.status == 0) {
					this.userInfo = result.data.data
				} else {
					uni.showToast({
						title: '网络出现问题！'
					})
				}
			},
			updeuserinfo() { //点击修改用户信息按钮的回调
				uni.redirectTo({
					url: `/pages/UpdateUserInfo/UpdateUserInfo?id=${this.userInfo.id}`,
				})
			},
			updePwd() { //点击修改用户密码按钮的回调
				uni.redirectTo({
					url: `/pages/UpdatePwd/UpdatePwd?id=${this.userInfo.id}`,
				})
			},
			quit() { // 击删除按钮的回调
				uni.showModal({
					title: '确定退出？',
					success: (res) => {
						if (res.confirm) {
							uni.removeStorage({
								key: 'token',
								success: () => {
									uni.showToast({
										title: '已退出！'
									})
									uni.switchTab({
										url: '/pages/Home/Home'
									})
								},
								fail: () => {
									uni.showToast({
										title: '操作失败！'
									})
								}
							})
						}
					},
					fail: () => {
						uni.showToast({
							title: '操作失败！'
						})
					}
				})
			},
			login() {
				uni.navigateTo({
					url: '/pages/Login/Login'
				})
			}
		},
		computed:{
			user_pic(){
				return this.userInfo.user_pic === null ? 'http://152.136.253.106:2000/images/default-userpic.png' : this.userInfo.user_pic
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #eee;
	}

	.mine {
		width: 100%;
		padding: 20rpx;

		.userinfo {
			width: 100%;
			border-radius: 10rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 35rpx 0;
			background-color: #fff;
			margin-bottom: 20rpx;

			.user_pic {
				width: 200rpx;
				height: 200rpx;
				border-radius: 50%;
				margin-bottom: 20rpx;
			}

			.nickname {
				font-size: 35rpx;
			}
		}

		.user_handle {
			width: 100%;
			border-radius: 10rpx;
			display: flex;
			flex-direction: column;
			background-color: #fff;
			overflow: hidden;
			margin-bottom: 20rpx;
		}

		.item {
			display: flex;
			height: 90rpx;
			border-bottom: 1rpx solid #eee;
			font-size: 32rpx;
			padding: 0 20rpx;
			align-items: center;

			.icon {
				margin-right: 10rpx;
			}
		}

		.item:last-child {
			border-bottom: none;
		}

		.quit {
			display: flex;
			height: 90rpx;
			border-bottom: 1rpx solid #eee;
			font-size: 32rpx;
			padding: 0 20rpx;
			align-items: center;
			background-color: indianred;
			color: #fff;
			border-radius: 10rpx;
		}

		.login-btn {
			display: flex;
			height: 90rpx;
			border-bottom: 1rpx solid #eee;
			font-size: 32rpx;
			padding: 0 20rpx;
			align-items: center;
			background-color: skyblue;
			color: #fff;
			border-radius: 10rpx;
			justify-content: center;
		}
	}
</style>
