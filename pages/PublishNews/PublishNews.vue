<template>
	<view class="publish_news">
		<uni-easyinput v-model="title" placeholder="请输入新鲜事标题(必填)" class="title"></uni-easyinput>
		<uni-easyinput type="textarea" v-model="content" placeholder="请输入新鲜事内容(必填)" class="content"></uni-easyinput>
		<uni-file-picker limit="9" @select="select" @delete="del" title="新鲜图片,最多选择9张图片" fileMediatype="image" mode="grid" />
		<uni-fab horizontal="right" vertical="bottom" :popMenu="true" @trigger="trigger" :content="Content"></uni-fab>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'',
				content:'',
				imageList:[],
				news_type_id:'',
				Content: [{
					text: '发表'
				}],
			};
		},
		onLoad(params) {
			this.news_type_id = params.id
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
				if(this.title=='' || this.content==''){
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
						url: '/my/upload/newsimg',
						filePath: `${this.imageList[i]}`,
						name: 'news_pic',
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
							url: '/my/addnewsnote',
							method: 'POST',
							data: {
								title:this.title,
								content:this.content,
								img_list:imgListStr,
								news_type_id:this.news_type_id
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
.publish_news{
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
