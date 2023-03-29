<template>
	<view class="login">
		<view class="userinfo">
			<!-- https://cdn.seovx.com/?mom=302 -->
			<image class="user_pic" :src="userinfo.user_pic" mode=""></image>
			<button class="btn"  @click="updateImg">更换头像</button>
			<kps-image-cutter @ok="onok" @cancel="oncancel" :url="url" :fixed="true" :blob="false" :Width="500" :Height="500"></kps-image-cutter>
		</view>
		<!-- 基础表单校验 -->
		<uni-forms ref="valiForm" :rules="rules" :modelValue="userinfo">
			<uni-forms-item name="nickname">
				<uni-easyinput v-model="userinfo.nickname" placeholder="请输入昵称" />
			</uni-forms-item>
			<uni-forms-item name="email">
				<uni-easyinput v-model="userinfo.email"  placeholder="请输入邮箱" />
			</uni-forms-item>
		</uni-forms>
		<button class="submit_btn" @click="update('valiForm')">修改</button>
		<button class="quit" @click="quit">取消</button>
	</view>
</template>

<script>
	import kpsImageCutter from "@/components/ksp-image-cutter/ksp-image-cutter.vue";
	export default {
		data() {
			return {
				id:0,
				url:'',
				userinfo: {
					nickname: '',
					email: '',
					user_pic:''
				},
				oldUser_pic:'',
				// 校验规则
				rules: {
					nickname: {
						rules: [{
							required: true,
							errorMessage: '昵称不能为空'
						}]
					},
					email: {
						rules: [{
							required: true,
							errorMessage: '密码不能为空'
						},{
							format:'email',
							errorMessage: '输入正确的邮箱'
						}]
					}
				}
			}
		},
		components: {kpsImageCutter},
		onLoad(options) {
			this.id = options.id
			this.getUserInfo()
		},
		methods: {
			async getUserInfo(){  //获取用户信息的方法
				if(!uni.getStorageSync('token')){
					uni.showToast({
						title:'请登录！'
					})
					uni.navigateTo({
						url:'/pages/Login/Login'
					})
					return
				}
				let result = await this.$myRequest({
					url:'/my/userinfo',
				})
				if(result.data.status == 0){
					this.userinfo = result.data.data
					this.oldUser_pic = result.data.data.user_pic
				}else{
					uni.showToast({
						title:'网络出现问题！'
					})
				}
			},
			update(ref){
				this.$refs[ref].validate().then(async res=>{
					const result = await this.$myRequest({
						url:'/my/updateuserinfo',
						method:'POST',
						data:{
							id:this.id,
							nickname:this.userinfo.nickname,
							email:this.userinfo.email
						},
					})
					if(this.oldUser_pic !== this.userinfo.user_pic){
						await this.$myUpload({  //修改头像
							url:'/my/upload/userpic',
							filePath:this.userinfo.user_pic,
							name:'user_pic',
						})
					}
					uni.showToast({
						title:result.data.message
					})
					if(result.data.status == 0){
						uni.switchTab({
							url:'/pages/Mine/Mine'
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
			},
			updateImg(){
				uni.chooseImage({
					count: 1,
					success: (rst) => {
						// 设置url的值，显示控件
						this.url = rst.tempFilePaths[0]
					}
				});
			},
			onok(ev) {
				this.userinfo = {...this.userinfo,user_pic:ev.path}
				this.url = "";
			},
			oncancel() {
				// url设置为空，隐藏控件
				this.url = "";
			}
		}
	}
</script>

<style lang="scss">
	.login {
		width: 100%;
		padding: 40rpx 20rpx ;
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
			.btn{
				background-color: skyblue;
				color: #fff;
			}
		}
		
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
