<template>
	<view class="nodate">
		<view class="img" :style="{background:'url(http://152.136.253.106:2000/images/nodata.webp)','background-size':'cover',bacgroundRepeat:'no-repeat','background-position':'center'}">
			<!-- <image src="http://localhost:3000/images/nodata.webp" class="nodate_img"></image> -->
		</view>
	</view>
</template>

<script>
	export default {
		name:"NoData",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.nodate{
		width: 100%;
		.img{
			width: 100%;
			height: 667rpx;
		}
		.nodate_img{
			width: 100%;
		}
	}
</style>