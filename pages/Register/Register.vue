<template>
	<view class="login">
		<view class="title">
			注&nbsp;&nbsp;&nbsp;册
		</view>
		<!-- <!-- 基础表单校验 -->
		<uni-forms ref="valiForm" :rules="rules" :modelValue="userinfo">
			<uni-forms-item name="username">
				<uni-easyinput v-model="userinfo.username" placeholder="请输入账号" />
			</uni-forms-item>
			<uni-forms-item name="password">
				<uni-easyinput v-model="userinfo.password" type="password" placeholder="请输入密码" />
			</uni-forms-item>
			<uni-forms-item name="confirmPassword">
				<uni-easyinput v-model="userinfo.confirmPassword" type="password" placeholder="请确认密码" />
			</uni-forms-item>
		</uni-forms>
		<button class="register_btn" @click="register('valiForm')">注册</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo: {
					username: '',
					password: '',
					confirmPassword:''
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
					},
					confirmPassword: {
						rules: [{
							required: true,
							errorMessage: '密码不能为空'
						}]
					}
				}
			}
		},
		methods: {
			register(ref){
				this.$refs[ref].validate().then( async res => {
					if(this.userinfo.password !== this.userinfo.confirmPassword) {
						uni.showToast({
							title:'俩次密码不一致！'
						})
						return
					}
					const result = await this.$myRequest({
						url:'/api/user/register',
						method:'POST',
						data:{
							username: this.userinfo.username,
							password:this.userinfo.password
						}
					})
					if(result.data.status == 0){
						uni.showToast({
							title:result.data.message
						})
						uni.navigateTo({
							url:'/pages/Login/Login'
						})
					}else{
						uni.showToast({
							title:result.data.message
						})
					}
				}).catch(err => {
					uni.showToast({
						title:result.data.message
					})
				})
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
