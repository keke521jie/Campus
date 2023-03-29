<template>
	<view class="login">
		<!-- 基础表单校验 -->
		<uni-forms ref="valiForm" :rules="rules" :modelValue="password">
			<uni-forms-item name="oldPwd">
				<uni-easyinput v-model="password.oldPwd" type="password" placeholder="请输入原密码" />
			</uni-forms-item>
			<uni-forms-item name="newPwd">
				<uni-easyinput v-model="password.newPwd" type="password" placeholder="请输入新密码" />
			</uni-forms-item>
			<uni-forms-item name="newPwdOk">
				<uni-easyinput v-model="password.newPwdOk" type="password" placeholder="请输入新密码" />
			</uni-forms-item>
		</uni-forms>
		<button class="submit_btn" @click="update('valiForm')">修改</button>
		<button class="quit" @click="quit">取消</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				password: {
					oldPwd: '',
					newPwd: '',
					newPwdOk:''
				},
				// 校验规则
				rules: {
					oldPwd: {
						rules: [{
							required: true,
							errorMessage: '密码不能为空'
						}]
					},
					newPwd: {
						rules: [{
							required: true,
							errorMessage: '密码不能为空'
						}]
					},
					newPwdOk: {
						rules: [{
							required: true,
							errorMessage: '密码不能为空'
						}]
					}
				}
			}
		},
		onLoad(options) {
			this.id = options.id
		},
		methods: {
			update(ref){
				this.$refs[ref].validate().then(async res=>{
					if(this.password.newPwd == this.password.newPwdOk){
						const result = await this.$myRequest({
							url:'/my/updatepwd',
							method:'POST',
							data:{
								id:this.id,
								oldPwd:this.password.oldPwd,
								newPwd:this.password.newPwd
							}
						})
						console.log(result);
						uni.showToast({
							title:result.data.message
						})
						if(result.data.status == 0){
							uni.switchTab({
								url:'/pages/Mine/Mine'
							})
						}
					}else{
						uni.showToast({
							title:'俩次密码不一致！'
						})
					}
				}).catch(err=>{
					uni.showToast({
						title:result.data.message
					})
				})
			},
			quit(){
				uni.switchTab({
					url:'/pages/Mine/Mine'
				})
			}
		}
	}
</script>

<style lang="scss">
	.login {
		width: 100%;
		padding: 40rpx 20rpx ;

		.title {
			font-size: 60rpx;
			margin-bottom: 50rpx;
			color: skyblue;
			text-align: center;
		}

		.submit_btn ,
		.quit{
			background-color: skyblue;
			color: #fff;
			margin-bottom: 20rpx;
		}
		.quit{
			background-color: pink;
		}
	}
</style>
