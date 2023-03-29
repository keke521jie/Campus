<template>
	<view class="login">
		<view class="title">
			登&nbsp;&nbsp;&nbsp;录
		</view>
		<!-- 基础表单校验 -->
		<uni-forms ref="valiForm" :rules="rules" :modelValue="userinfo">
			<uni-forms-item name="username">
				<uni-easyinput v-model="userinfo.username" placeholder="请输入账号" />
			</uni-forms-item>
			<uni-forms-item name="password">
				<uni-easyinput v-model="userinfo.password" type="password" placeholder="请输入密码" />
			</uni-forms-item>
		</uni-forms>
		<button class="submit_btn" @click="submit('valiForm')">登录</button>
		<button class="register_btn" @click="register">注册</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo: {
					username: '',
					password: ''
				},
				// 校验规则
				rules: {
					username: {
						rules: [{
							required: true,
							errorMessage: '用户名不能为空'
						}]
					},
					password: {
						rules: [{
							required: true,
							errorMessage: '密码不能为空'
						}]
					}
				}
			}
		},
		methods: {
			submit(ref) {
				this.$refs[ref].validate().then(async res => {
					const result = await this.$myRequest({
						url:'/api/user/login',
						method:'POST',
						data:{
							username:this.userinfo.username,
							password:this.userinfo.password
						}
					})
					if(result.data.status == 0){
						uni.setStorage({
							key:'token',
							data:result.data.token
						})
						uni.showToast({
							title:result.data.message
						})
						uni.switchTab({
							url:'/pages/Home/Home'
						})
					}else{
						uni.showToast({
							title:result.data.message
						})
					}
				}).catch(err => {
					console.log('err', err);
				})
			},
			register(){
				uni.navigateTo({
					url: '/pages/Register/Register'
				});
			}
		}
	}
</script>

<style lang="scss">
	.login {
		width: 100%;
		padding: 30% 20rpx 0;

		.title {
			font-size: 60rpx;
			margin-bottom: 50rpx;
			color: skyblue;
			text-align: center;
		}

		.submit_btn {
			background-color: skyblue;
			color: #fff;
			margin-bottom: 20rpx;
		}
		
		.register_btn{
			background-color: pink;
			color: #fff;
		}
	}
</style>
