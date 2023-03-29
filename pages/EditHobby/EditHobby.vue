<template>
	<view class="edit_hobby">
		<uni-easyinput v-model="title"  placeholder="请输入标题" class="title"></uni-easyinput>
		<uni-easyinput type="textarea" v-model="cont" placeholder="请输入内容" class="inp"></uni-easyinput>
		<uni-file-picker limit="9" @select="select" @delete="del" title="最多选择9张图片" fileMediatype="image" mode="grid" />
		<uni-fab horizontal="right" vertical="bottom" :popMenu="true" @trigger="trigger" :content="content"></uni-fab>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				hobbyId: '',
				cont: '',
				content: [{
					text: '发表'
				}],
				imageList: []
			};
		},
		onLoad(params) {
			this.hobbyId = params.id
		},
		methods: {
			select(e) {
				this.imageList = [...this.imageList, ...e.tempFilePaths]
			},
			del(e) {
				const result = this.imageList.filter(img => img !== e.tempFilePath);
				this.imageList = result
			},
			async trigger(e) {
				if (e.index !== 0) return
				//上传逻辑
				let imgListStr = ''
				let count = 0
				for (let i = 0; i < this.imageList.length; i++) {
					const res = await this.$myUpload({
						url: '/my/upload/hobbyimg',
						filePath: `${this.imageList[i]}`,
						name: 'hobby_pic',
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
							url: '/my/addhobbynote',
							method: 'POST',
							data: {
								hobby_id: this.hobbyId,
								title: this.title,
								content: this.cont,
								img_list: imgListStr
							}
						})
						if (result.data.status == 0) {
							uni.showToast({
								title: '发布成功！'
							})
							uni.navigateBack(1)
						} else {
							uni.showToast({
								title: '发布失败！请重试！'
							})
						}
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.edit_hobby {
		width: 100%;
		padding: 20rpx;

		.title {
			margin-bottom: 20rpx;
		}

		.inp {
			margin-bottom: 20rpx;
		}
	}
</style>
