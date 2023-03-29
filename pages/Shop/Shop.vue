<template>
	<view class="shop">
		<SlideNav :navList="goodsTypeList" :navid="id" @changeId="changeGoodsTypeId"/>
		<view class="goodslist" v-if="goodsList.length !== 0">
			<view class="goodsitem" v-for="goods in newGoodsList" :key="goods.id" @click="goGoodsInfo(goods.id)">
				<view class="img" :style="{background:'url('+goods.goods_img[0]+')','background-size':'cover',bacgroundRepeat:'no-repeat','background-position':'center'}">
					<!-- <image :src="goods.goods_img[0]" mode=""></image> -->
				</view>
				<view class="goodsinfo">
					<text class="goods_name">{{goods.name.slice(0,8)}}</text>
					<text class="goods_describe">{{goods.goods_describe.slice(0,25)}}</text>
					<text class="goods_price">￥{{goods.price}}</text>
				</view>
			</view>
		</view>
		<NoData v-else />
		<uni-fab horizontal="right" vertical="bottom" @fabClick="fabClick" :popMenu="false">
		</uni-fab>
	</view>
</template>

<script>
	import SlideNav from '../../components/SlideNav.vue'
	import NoData from '../../components/NoData.vue'
	export default {
		data() {
			return {
				goodsTypeList:[],
				id : 0,
				page: 1,
				total: 10,
				goodsList:[]
			};
		},
		components:{
			SlideNav,
			NoData
		},
		onLoad() {
			this.getGoodsTypeList()
		},
		onShow(){
			this.getGoodsList()
		},
		watch:{
			id(newV,oldV){
				this.getGoodsList()
			}
		},
		computed:{
			newGoodsList(){  //计算展示的第一张图片
				const newGoodsList = this.goodsList
				newGoodsList.map(goods => {
					if(goods.goods_img !== null){
						goods.goods_img = goods.goods_img.split('#')
						goods.goods_img.shift()
					}
				})
				return newGoodsList
			}
		},
		methods:{
			async getGoodsTypeList(){
				const result = await this.$myRequest({
					url:'/api/getgoodstypelist'
				})
				if(result.data.status == 0){
					this.goodsTypeList = result.data.data
					this.id = result.data.data[0].id
				}
			},
			changeGoodsTypeId(id){
				this.id = id
			},
			async getGoodsList(){
				const result = await this.$myRequest({
					url:'/api/getgoodslist',
					method:'post',
					data:{
						id:this.id,
						page:this.page,
						total:this.total
					}
				})
				if(result.data.status == 0){
					this.goodsList = result.data.data
				}else{
					uni.showToast({
						title:'网络出现问题！'
					})
				}
			},
			fabClick(){
				uni.navigateTo({
					url:`../PublishGoods/PublishGoods?id=${this.id}`
				})
			},
			goGoodsInfo(id){   //点击商品去往详情页的回调
				uni.navigateTo({
					url:`../GoodsInfo/GoodsInfo?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.shop{
		.goodslist{
			width: 100%;
			padding: 0 20rpx;
			display: flex;
			flex-wrap: wrap;
			.goodsitem{
				display: flex;
				flex-direction: column;
				width: 345rpx;
				border-radius: 20rpx;
				overflow: hidden;
				background-color: #c3dcfa;
				color: #fff;
				&:nth-child(odd){
					margin-right: 20rpx;
				}
				.img{
					width: 100%;
					height: 345rpx;
					overflow: hidden;
					// image{
						// width: 100%;
						// height: 100%;
					// }
				}
				.goodsinfo{
					display: flex;
					flex-direction: column;
					padding: 10rpx 20rpx;
					.goods_name{
						font-size: 35rpx;
					}
					.goods_describe{
						font-size: 25rpx;
						margin-bottom: 5rpx;
					}
					.goods_price{
						color: pink;
						font-size: 40rpx;
					}
				}
			}
		}
	}
</style>
