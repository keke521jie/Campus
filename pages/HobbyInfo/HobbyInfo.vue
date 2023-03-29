<template>
	<view class="hobbyinfo">
		<SlideNav :navList="hobbyList" :navid="id" @changeId="changeHobby"/>
		<NoData v-if="hobbyNote.length==0" />
		<view v-else class="article_list">
			<view class="article_item" v-for="noteItem in noteList" :key="noteItem.id">
				<view class="author">
					<image :src="noteItem.user_pic" mode="" class="user_pic" @click="lookUserInfo(noteItem.user_id)"></image>
					<text class="author_name" @click="lookUserInfo(noteItem.user_id)">{{noteItem.nickname}}</text>
					<text class="publish_date">{{noteItem.date}}</text>
				</view>
				<view class="content" @click="readNote(noteItem.id)">
					<view class="left">
						<text class="title">{{noteItem.title}}</text>
						<text class="primary_content">{{noteItem.content.slice(0,25)}}</text>
					</view>
					<view class="img" v-if="noteItem.img_list" :style="{background:'url('+noteItem.img_list[0]+')','background-size':'cover',bacgroundRepeat:'no-repeat','background-position':'center'}">
						<!-- <image v-if="noteItem.img_list" :src="noteItem.img_list[0]" mode=""></image> -->
					</view>
				</view>
			</view>
		</view>
		<uni-fab :pattern="pattern" horizontal="right" vertical="bottom" @fabClick="fabClick" :popMenu="false">
		</uni-fab>
	</view>
</template>

<script>
	import NoData from '../../components/NoData.vue'
	import SlideNav from '../../components/SlideNav.vue'
	export default {
		data() {
			return {
				hobbyList: [],
				hobbyNote: [],
				id: '',
				pattern: {
					backgroundColor: 'skyblue'
				}
			};
		},
		components:{
			NoData,
			SlideNav
		},
		onShow() {
			this.getHobbyNote()
		},
		onLoad(options) {
			this.id = options.id
			this.getHobbyList()
		},
		methods: {
			async getHobbyList() {
				const result = await this.$myRequest({
					url: '/api/gethobbylist'
				})
				if (result.data.status == 0) {
					this.hobbyList = result.data.data
				} else {
					uni.showToast({
						title: '服务器出错！'
					})
				}
			},
			async getHobbyNote(){    //获取文章列表的方法
				const result = await this.$myRequest({
					url: '/api/gethobbynote',
					method:'post',
					data:{
						hobby_id:this.id,
						page:1,
						total:10
					}
				})
				if (result.data.status == 0) {
					this.hobbyNote = result.data.data
				} else {
					uni.showToast({
						title: '服务器出错！'
					})
				}
			},
			changeHobby(id) {
				this.id = id
			},
			fabClick() { //点击悬浮按钮回调
				uni.navigateTo({
					url:`../EditHobby/EditHobby?id=${this.id}`
				})
			},
			readNote(id){
				uni.navigateTo({
					url:`/pages/ArticleInfo/ArticleInfo?id=${id}`
				})
			},
			lookUserInfo(userId){
				uni.navigateTo({
					url:`/pages/UserInfo/UserInfo?id=${userId}`
				})
			}
		},
		watch:{
			id(newV,oldV){
				this.getHobbyNote(newV)
			} 	
		},
		computed:{
			noteList(){
				const newHobbyNote = this.hobbyNote
				newHobbyNote.map(note => {
					note.date = note.date.slice(0,10)
					if(note.img_list !== null){
						note.img_list = note.img_list.split('#')
						note.img_list.shift()
					}
				})
				return newHobbyNote
			}
		}
	}
</script>

<style lang="scss">
	.hobbyinfo {
		width: 100%;

		
		.article_list{
			padding: 10rpx 20rpx;
			.article_item{
				display: flex;
				flex-direction: column;
				padding-bottom: 20rpx;
				border-bottom: 1rpx solid #ccc;
				margin-bottom: 20rpx;
				.author{
					display: flex;
					align-items: center;
					margin-bottom: 20rpx;
					.user_pic{
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
						margin-right: 20rpx;
					}
					.author_name{
						font-size: 30rpx;
						margin-right: 20rpx;
					}
					.publish_date{
						color: #999;
					}
				}
				.content{
					display: flex;
					justify-content: space-between;
					.left{
						display: flex;
						flex-direction: column;
						width: 440rpx;
						padding: 10rpx;
						.title{
							font-size: 35rpx;
							font-weight: 700;
							margin-bottom: 5rpx;
						}
						.primary_content{
							font-size: 30rpx;
						}
					}
					.img{
						width: 250rpx;
						height: 156.25rpx;
					}
					// image{
					// 	width: 250rpx;
					// 	height: 156.25rpx;
					// }
				}
			}
		}
	}
</style>
