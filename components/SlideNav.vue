<template>
	<scroll-view scroll-x>
		<view class="scroll">
			<view class="nav-item" v-for="item in navList" :key="item.id">
				<text :class="{'active':navid == item.id}" @click="changeId(item.id)">{{item.name}}</text>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		name: "SlideNav",
		data() {
			return {

			};
		},
		props:['navList','navid'],
		methods:{
			changeId(id){
				this.$emit('changeId',id)
			}
		}
	}
</script>

<style lang="scss">
	.scroll {
		display: flex;
		justify-content: space-around;
		width: 600px;
		height: 80rpx;

		.nav-item {
			text {
				font-size: 30rpx;
				color: #999;
				line-height: 80rpx;
			}

			.active {
				color: skyblue;
				border-bottom: 4rpx solid skyblue;
			}
		}
	}
</style>
