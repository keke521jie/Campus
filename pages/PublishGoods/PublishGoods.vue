<template>
	<view class="publish_goods">
		<uni-easyinput v-model="name" placeholder="请输入商品名称(必填)" class="title"></uni-easyinput>
		<uni-easyinput type="textarea" v-model="describe" placeholder="请输入描述(可选)" class="inp"></uni-easyinput>
		<uni-easyinput v-model="price" placeholder="请输入价格(必填)" class="title"></uni-easyinput>
		<uni-easyinput v-model="userWx" placeholder="请输入卖家微信(必填)" class="title"></uni-easyinput>
		<uni-easyinput v-model="userPhone" placeholder="请输入卖家电话(必填)" class="title"></uni-easyinput>
		<uni-file-picker limit="9" @select="select" @delete="del" title="商品图片,最多选择9张图片(必填)" fileMediatype="image" mode="grid" />
		<uni-fab horizontal="right" vertical="bottom" :popMenu="true" @trigger="trigger" :content="content"></uni-fab>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				describe:'',
				userWx:'',
				userPhone:'',
				goods_type_id:'',
				price:'',
				imageList:[],
				content: [{
					text: '发表'
				}],
			};
		},
		onLoad(params) {
			this.goods_type_id = params.id
		},
		methods:{
			select(e) {
				this.imageList = [...this.imageList, ...e.tempFilePaths]
			},
			del(e) {
				const result = this.imageList.filter(img => img !== e.tempFilePath);
				this.imageList = result
			},
			async trigger(e){
				if (e.index !== 0) return
				let regx = /^1[3456789]\d{9}$/
				if(!regx.test(this.userPhone)){
					uni.showToast({
						title:'手机号都糊弄你是来捣乱的吧!'
					})
					return 
				}
				if(this.name=='' || this.userWx=='' || this.userPhone == '' || this.price == ''){
					uni.showToast({
						title:'该写的写一下啊!'
					})
					return 
				}
				//上传逻辑
				let imgListStr = ''
				let count = 0
				if(this.imageList.length == 0){
					uni.showToast({
						title:'请选择图片！'
					})
				}
				for (let i = 0; i < this.imageList.length; i++) {
					const res = await this.$myUpload({
						url: '/my/upload/goodsimg',
						filePath: `${this.imageList[i]}`,
						name: 'goods_pic',
					})
					if (JSON.parse(res.data).status == 0) {
						imgListStr = imgListStr + '#' + JSON.parse(res.data).data
					} else {
						uni.showToast({
							title: '发布失败！',
						})
						return
					}
					count++
					if (count == this.imageList.length) {
						const result = await this.$myRequest({
							url: '/my/publishgoods',
							method: 'POST',
							data: {
								goods_type_id:this.goods_type_id,
								name:this.name, 
								describe:this.describe,
								goods_img:imgListStr,
								user_vx:this.userWx,
								price:this.price,
								user_phone:this.userPhone
							}
						})
						if(result.data.status == 0){
							uni.showToast({
								title:'发布成功！'
							})
							uni.navigateBack(1)
						}else{
							uni.showToast({
								title:'发布失败！请重试！'
							})
						}
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.publish_goods{
		width: 100%;
		padding: 20rpx;
		.title{
			margin-bottom: 20rpx;
		}
		.inp {
			margin-bottom: 20rpx;
		}
	}
</style>
