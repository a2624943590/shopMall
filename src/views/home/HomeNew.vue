<!-- 首页-热卖 -->
<template>
	<div class="body">
		<!-- 下拉刷新 -->
		<van-pull-refresh v-model="isLoading" @refresh="onRefresh" style="margin-bottom: 50px;">
			<van-image width="100%" height="90px"
				src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c0bcf1381f9a43f60b39b58e891f6daa.jpg?f=webp" />

			<!-- 中间item项 -->

			<!-- 中间图片 -->

			<!--goods-->

			<van-row gutter="20" class="main_list">
				<van-col span="12" v-for="(item, index) in goodlist" :key="index" @click="$navto('/goods/'+item.id)">
					<van-row style="background-color: #FFFFFF; margin: 5px ;">
						<img :src="item.img" height="150px" width="100%">
						<van-row class="goods_desc van-multi-ellipsis--l2 van-ellipsis text-center">
							{{item.name}}
						</van-row>
						<van-row class="text-center color-red mb-10">
							￥{{item.sell_price}}
						</van-row>
					</van-row>


				</van-col>
				<!-- <van-image
		  width="50%"
		  height="150px"
		 
		  src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/0a1ae5341d2dae66cd42566c60d2d666.png?thumb=1&w=320&h=220&f=webp&q=90"
		/>
		<van-row class="goods_desc van-multi-ellipsis--l2 van-ellipsis text-center" >
		  小米电视 大师  77  OLED
		</van-row>
		<van-row class="text-center color-red mb-10">
		    ￥1000
		</van-row> -->
			</van-row>


			<van-image width="100%" height="90px"
				src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c5e9c307b3f2be15a71bb094509e04a9.jpg?f=webp" />

			<van-row type="flex" justify="space-around">
				<van-col span="7">

					<van-row class="text-center" style="margin: 5px 2.5px;">
						<img width="100%"
							src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/37c64856e3d7a35557049bb5e5c9e687.jpg?thumb=1&w=221&h=221" />
						<van-row class="goods_desc van-multi-ellipsis--l2 van-ellipsis text-center">小米电视 KING OLED</van-row>
						<van-row class="text-center color-red mb-10">￥1000</van-row>
					</van-row>

				</van-col>
				<van-col span="7" class="text-center" style="margin: 5px 2.5px;">
					<van-row class="text-center" style="margin: 5px 2.5px;">
						<img width="100%"
							src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1bb566a499a4691cf878bb3ac23c056.jpg?thumb=1&w=221&h=221" />
						<van-row class="goods_desc van-multi-ellipsis--l2 van-ellipsis text-center">小米电视 GS OLED</van-row>
						<van-row class="text-center color-red mb-10">￥1000</van-row>
					</van-row>
				</van-col>
				<van-col span="7" class="text-center" style="margin: 5px 2.5px;">
					<van-row class="text-center" style="margin: 5px 2.5px;">
						<img width="100%"
							src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/abf7219dc5dd88a5a425e05d66459c1e.jpg?thumb=1&w=221&h=221" />
						<van-row class="goods_desc van-multi-ellipsis--l2 van-ellipsis text-center">小米电视 大师 TT OLED</van-row>
						<van-row class="text-center color-red mb-10">￥1000</van-row>
					</van-row>
				</van-col>

			</van-row>

			<van-row type="flex" justify="space-around">
				<van-col span="7">

					<van-row class="text-center" style="margin: 5px 2.5px;">
						<img width="100%"
							src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/26eb3bb463c62c0be77dfd04cae7a703.jpg?thumb=1&w=221&h=221" />
						<van-row class="goods_desc van-multi-ellipsis--l2 van-ellipsis text-center">小米全面屏电视  E65X</van-row>
						<van-row class="text-center color-red mb-10">￥1000</van-row>
					</van-row>

				</van-col>
				<van-col span="7" class="text-center" style="margin: 5px 2.5px;">
					<van-row class="text-center" style="margin: 5px 2.5px;">
						<img width="100%"
							src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/e44891db2e4acc151d269a4e5b6105db.jpg?thumb=1&w=221&h=221" />
						<van-row class="goods_desc van-multi-ellipsis--l2 van-ellipsis text-center">小米电视 大师 77 OLED</van-row>
						<van-row class="text-center color-red mb-10">￥1000</van-row>
					</van-row>
				</van-col>
				<van-col span="7" class="text-center" style="margin: 5px 2.5px;">
					<van-row class="text-center" style="margin: 5px 2.5px;">
						<img width="100%"
							src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/e2db332ce37323f53d62ccd899cf101b.jpg?thumb=1&w=221&h=221" />
						<van-row class="goods_desc van-multi-ellipsis--l2 van-ellipsis text-center">全面屏电视  E55X</van-row>
						<van-row class="text-center color-red mb-10">￥1000</van-row>
					</van-row>
				</van-col>

			</van-row>





<!-- <van-col span="12" v-model="ruleForm"  >
					<van-row style="background-color: #FFFFFF; margin: 5px ;">
						<img :src="ruleForm.img" height="150px" width="100%">
						<van-row class="goods_desc van-multi-ellipsis--l2 van-ellipsis text-center">
							{{ruleForm.name}}
						</van-row>
						<van-row class="text-center color-red mb-10">
							￥{{ruleForm.sell_price}}
						</van-row>
					</van-row>


				</van-col> -->




		</van-pull-refresh>

	</div>
</template>

<script>
	import {
		home
	} from '../../common/api/web/home.js'
	import Swiper from '@/components/index/Swiper'
	import {
		mendelist
	} from '@/common/mock/mock.js'
	import menu from '@/components/index/menu'
	import data from '../../../data'
	export default {
		components: {
			Swiper,
			'mi-menu': menu,
		},
		data() {
			return {
				ruleForm: {
					
					id: '',
					img: '',
					name: '',
					evaluation: '',
					factory: '',
					sell_price: ''

				},
				isLoading: false,
				banner: [],
                teep:[],
				temp:[],
				search: '',
				menulist: mendelist,
				menu: data.menu,
				goodlist: []
			}
		},
		mounted() {
			this.initData();
			// this.showData();
		},
		methods: {
			//下拉刷新
			onRefresh() {
				this.initData();
				// this.showData();
				setTimeout(() => {
					this.isLoading = false;
					this.count++;
				}, 1000);
			},
			//获取数据
			initData() {
				let that = this;
				home({}).then(function(res) {
					// console.log(res);
					let map = res.data;

					// console.log(map.banner);
					if (res.code == 200) {
						that.banner = map.banner;
						that.notice = map.notice;
						that.goodlist = map.goodlist;
					}
				});
			},
			// showData(row) {
			// 	let that = this;
			// 	this.$http.get("http://localhost:3000/productList").then((res) => {
			// 		console.log(res);
			// 		let tep = res.data;
			// 		console.log(tep.teep);
			// 		if(res.code == 200){
			// 			that.teep = tep.teep;
						
			// 			that.ruleForm = tep.temp;
			// 		}
			// 	});

			// },
		}
	}
</script>

<style>
	.body {
		background-color: #FFAE99;
	}

	.category-list {
		display: flex;
		flex-shrink: 0;
		flex-wrap: wrap;
		width: 100%;
		padding-bottom: 13px;
	}

	.category-list div {
		display: flex;
		flex-direction: column;
		width: 20%;
		text-align: center;
	}

	.category-list div .img {
		width: 40px;
		height: 40px;
		margin: 13px auto 8px auto;

	}

	.text-center {
		background-color: #FFFFFF;
	}
</style>
