<template>
	<div>
		<van-row>
			<van-col span="2"><van-button hairline @click="$back()" icon="arrow-left"/></van-col>
			<van-col span="22"><van-search v-model="search" show-action autofocus placeholder="请输入搜索关键词">
				<template #action>
					<div @click="onSearch">搜索</div>
				</template>
			</van-search></van-col>
		</van-row>
		
		<van-cell-group inset>
		  <van-cell title="搜索发现" />
		  <van-cell>
			  <van-row>
			    <van-col style="margin-top: 10px;" span="12" v-for="item in list">{{item}}</van-col>
			  </van-row>
		  </van-cell>
		</van-cell-group>
	</div>
</template>

<script>
	import {
		Toast
	} from 'vant';
	export default {
		data() {
			return {
				search: '',
				list:['全部商品','小米11','手机','小米10S','空调','红米','充电宝','耳机']
			};
		},
		methods: {
			onSearch() {
				Toast(this.search);
			},
		}
	}
</script>

<style>
	.van-button{
		 margin: 3px;
		 background: none;
	}
</style>
