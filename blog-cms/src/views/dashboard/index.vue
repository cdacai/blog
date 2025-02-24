<template>
	<div>
		<!-- 第一行：地图 -->
		<el-row class="panel-group" :gutter="20">
			<el-col :span="24">
				<el-card>
					<div ref="mapEcharts" class="chart-container"></div>
				</el-card>
			</el-col>
		</el-row>

		<!-- 第二行：数据统计卡片 -->
		<el-row class="panel-group" :gutter="20">
			<el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
				<el-card class="card-panel" body-style="padding: 0" @click.native="handleCardClick('/visitor')">
					<div class="card-panel-icon-wrapper">
						<SvgIcon icon-class="yonghu" class="card-panel-icon"/>
					</div>
					<div class="card-panel-description">
						<div class="card-panel-text">访客人数</div>
						<span class="card-panel-num">{{ uv }}</span>
					</div>
				</el-card>
			</el-col>

			<el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
				<el-card class="card-panel" body-style="padding: 0" @click.native="handleCardClick('/blog/list')">
					<div class="card-panel-icon-wrapper">
						<SvgIcon icon-class="article" class="card-panel-icon"/>
					</div>
					<div class="card-panel-description">
						<div class="card-panel-text">博客数目</div>
						<span class="card-panel-num">{{ blogCount }}</span>
					</div>
				</el-card>
			</el-col>

			<el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
				<el-card class="card-panel" body-style="padding: 0" @click.native="handleCardClick('/blog/comment/list')">
					<div class="card-panel-icon-wrapper">
						<SvgIcon icon-class="pinglun-blue" class="card-panel-icon"/>
					</div>
					<div class="card-panel-description">
						<div class="card-panel-text">评论数目</div>
						<span class="card-panel-num">{{ commentCount }}</span>
					</div>
				</el-card>
			</el-col>

			<el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
				<el-card class="card-panel" body-style="padding: 0" @click.native="handleCardClick('/log/visit')">
					<div class="card-panel-icon-wrapper">
						<SvgIcon icon-class="eye" class="card-panel-icon"/>
					</div>
					<div class="card-panel-description">
						<div class="card-panel-text">总访问量</div>
						<span class="card-panel-num">{{ pv }}</span>
					</div>
				</el-card>
			</el-col>
		</el-row>

		<!-- 第三行：分类和标签统计 -->
		<el-row class="panel-group" :gutter="20">
			<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
				<el-card>
					<div ref="categoryEcharts" class="chart-container"></div>
				</el-card>
			</el-col>
			<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
				<el-card>
					<div ref="tagEcharts" class="chart-container"></div>
				</el-card>
			</el-col>
		</el-row>

		<!-- 第四行：访问记录 -->
		<el-row class="panel-group" :gutter="20">
			<el-col :span="24">
				<el-card>
					<div ref="visitRecordEcharts" class="chart-container"></div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import SvgIcon from "@/components/SvgIcon";
	import echarts from 'echarts'
	import 'echarts/map/js/world'
	import 'echarts/map/js/china'
	import {getDashboard} from "@/api/dashboard";
	//城市经纬度数据来自 https://github.com/Naccl/region2coord
	import geoCoordMap from '@/util/city2coord.json'

	export default {
		name: "Dashboard",
		components: {SvgIcon},
		data() {
			return {
				pv: 0,
				uv: 0,
				blogCount: 0,
				commentCount: 0,
				categoryEcharts: null,
				tagEcharts: null,
				mapEcharts: null,
				visitRecordEcharts: null,
				isShowTodayVisitor: true, // 是否显示今日访客
				todayMapData: [], // 今日访客数据
				totalMapData: [], // 累计访客数据
				categoryOption: {
					title: {
						text: '分类下文章数量',
						x: 'center'
					},
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b} : {c} ({d}%)'
					},
					legend: {
						left: 'center',
						top: 'bottom',
						data: []
					},
					series: [
						{
							name: '文章数量',
							type: 'pie',
							radius: [30, 110],
							roseType: 'area',
							data: []
						}
					]
				},
				tagOption: {
					title: {
						text: '标签下文章数量',
						x: 'center'
					},
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b} : {c} ({d}%)'
					},
					legend: {
						left: 'center',
						top: 'bottom',
						data: []
					},
					series: [
						{
							name: '文章数量',
							top: '-10%',
							type: 'pie',
							radius: [30, 110],
							roseType: 'area',
							data: []
						}
					]
				},
				//地图效果 reference https://www.jianshu.com/p/028525cbd080
				//reference https://echarts.apache.org/examples/zh/editor.html?c=map-polygon
				mapOption: {
					title: {
						text: '今日访客地图',
						x: 'center',
						textStyle: {
							color: '#333',
							fontSize: 16,
							fontWeight: 'normal'
						}
					},
					backgroundColor: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 1,
						y2: 1,
						colorStops: [{
							offset: 0,
							color: '#f6f8fc'
						}, {
							offset: 1,
							color: '#fff'
						}]
					},
					tooltip: {
						show: false
					},
					geo: {
						map: "world",
						roam: true,
						zoom: 3,
						center: [105, 35],
						label: {
							normal: {
								show: false,
								fontSize: "10",
								color: "rgba(0,0,0,0.7)"
							},
							emphasis: {
								show: false
							}
						},
						itemStyle: {
							normal: {
								areaColor: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 1,
									y2: 1,
									colorStops: [{
										offset: 0,
										color: '#e8f4ff'
									}, {
										offset: 1,
										color: '#cce6ff'
									}]
								},
								borderColor: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 1,
									y2: 1,
									colorStops: [{
										offset: 0,
										color: '#1890ff'
									}, {
										offset: 1,
										color: '#0076ff'
									}]
								},
								borderWidth: 0.5,
								shadowBlur: 8,
								shadowColor: 'rgba(24,144,255,0.2)',
								shadowOffsetX: 1,
								shadowOffsetY: 1
							},
							emphasis: {
								areaColor: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 1,
									y2: 1,
									colorStops: [{
										offset: 0,
										color: '#cce7ff'
									}, {
										offset: 1,
										color: '#a3d2ff'
									}]
								},
								shadowBlur: 12,
								shadowColor: 'rgba(24,144,255,0.3)'
							}
						}
					},
					toolbox: {
						show: true,
						orient: 'vertical',
						left: 'right',
						top: 'center',
						feature: {
							myTool: {
								show: true,
								title: '切换显示',
								icon: 'path://M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-0.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2 0.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.2 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z',
								onclick: () => {
									this.toggleMapMode();
								}
							},
							restore: {
									iconStyle: {
										borderColor: '#666'
									}
								},
								saveAsImage: {
									iconStyle: {
										borderColor: '#666'
									}
								}
						}
					},
					series: [
						{
							name: "",
							type: "scatter",
							coordinateSystem: "geo",
							data: [],
							symbol: "circle",
							symbolSize: 6,
							hoverSymbolSize: 8,
							tooltip: {
								formatter(value) {
									return value.data.name + "<br/>" + "访客数：" + value.data.uv;
								},
								show: true
							},
							encode: {
								value: 2
							},
							label: {
								formatter: "{b}",
								position: "right",
								show: false
							},
							itemStyle: {
								color: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 1,
									y2: 1,
									colorStops: [{
										offset: 0,
										color: '#1890ff'
									}, {
										offset: 1,
										color: '#0076ff'
									}]
								},
								shadowBlur: 6,
								shadowColor: 'rgba(24,144,255,0.3)'
							}
						},
						{
							name: "Top 5",
							type: "effectScatter",
							coordinateSystem: "geo",
							data: [],
							symbol: "circle",
							symbolSize: 12,
							tooltip: {
								formatter(value) {
									return value.data.name + "<br/>" + "访客数：" + value.data.uv;
								},
								show: true
							},
							encode: {
								value: 2
							},
							showEffectOn: "render",
							rippleEffect: {
								brushType: "stroke",
								scale: 5,
								period: 4,
								color: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 1,
									y2: 1,
									colorStops: [{
										offset: 0,
										color: '#ff6a00'
									}, {
										offset: 1,
										color: '#ff8534'
									}]
								}
							},
							hoverAnimation: true,
							label: {
								formatter: "{b}",
								position: "right",
								show: true,
								color: '#333',
								textBorderColor: '#fff',
								textBorderWidth: 2,
								fontSize: 12
							},
							itemStyle: {
								color: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 1,
									y2: 1,
									colorStops: [{
										offset: 0,
										color: '#ff6a00'
									}, {
										offset: 1,
										color: '#ff8534'
									}]
								},
								shadowBlur: 10,
								shadowColor: 'rgba(255,106,0,0.5)'
							},
							zlevel: 1
						}
					]
				},
				visitRecordOption: {
					xAxis: {
						data: [],
						boundaryGap: false,
						axisTick: {
							show: false
						}
					},
					grid: {
						left: 10,
						right: 20,
						top: 30,
						bottom: 0,
						containLabel: true
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						},
						padding: [5, 10]
					},
					yAxis: {
						axisTick: {
							show: false
						}
					},
					legend: {
						data: ['访问量(PV)', '独立访客(UV)']
					},
					series: [
						{
							name: '访问量(PV)',
							smooth: true,
							type: 'line',
							itemStyle: {
								normal: {
									color: '#FF005A',
									lineStyle: {
										color: '#FF005A',
										width: 2
									}
								}
							},
							data: [],
							animationDuration: 2800,
							animationEasing: 'cubicInOut'
						},
						{
							name: '独立访客(UV)',
							smooth: true,
							type: 'line',
							itemStyle: {
								normal: {
									color: '#3888fa',
									lineStyle: {
										color: '#3888fa',
										width: 2
									},
									areaStyle: {
										color: '#f3f8ff'
									}
								}
							},
							data: [],
							animationDuration: 2800,
							animationEasing: 'quadraticOut'
						}
					]
				},
				specialCityCoords: {
					'南极': [0, -75]  // 只保留南极坐标
				}
			}
		},
		mounted() {
			this.getData()
		},
		methods: {
			toggleSideBar() {
				this.$store.dispatch('app/toggleSideBar')
			},
			handleCardClick(path) {
				console.log('Card clicked, navigating to:', path)
				this.$router.push(path).catch(err => {
					console.error('Navigation failed:', err)
				})
			},
			getData() {
				getDashboard().then(res => {
					this.pv = res.data.pv
					this.uv = res.data.uv
					this.blogCount = res.data.blogCount
					this.commentCount = res.data.commentCount
					//渲染分类数据
					this.categoryOption.legend.data = res.data.category.legend
					this.categoryOption.series[0].data = res.data.category.series
					this.initCategoryEcharts()
					//渲染标签数据
					this.tagOption.legend.data = res.data.tag.legend
					this.tagOption.series[0].data = res.data.tag.series
					this.initTagEcharts()
					//处理访客地图数据
					const visitors = res.data.cityVisitor;
					this.todayMapData = this.convertData(visitors);
					
					//设置地图数据
					this.mapOption.series[0].data = this.todayMapData;
					this.mapOption.series[1].data = this.todayMapData.slice(0, 5);
					this.initMapEcharts();
					//渲染一周访问量数据
					this.visitRecordOption.xAxis.data = res.data.visitRecord.date
					this.visitRecordOption.series[0].data = res.data.visitRecord.pv
					this.visitRecordOption.series[1].data = res.data.visitRecord.uv
					this.initVisitRecordEcharts()
				})
			},
			initCategoryEcharts() {
				this.categoryEcharts = echarts.init(this.$refs.categoryEcharts, 'light')
				this.categoryOption.series[0].radius = [30, 110]
				this.categoryEcharts.setOption(this.categoryOption)
				window.addEventListener('resize', () => {
					this.categoryEcharts.resize()
				})
			},
			initTagEcharts() {
				this.tagEcharts = echarts.init(this.$refs.tagEcharts, 'light')
				this.tagOption.series[0].radius = [30, 110]
				this.tagEcharts.setOption(this.tagOption)
				window.addEventListener('resize', () => {
					this.tagEcharts.resize()
				})
			},
			initMapEcharts() {
				this.mapEcharts = echarts.init(this.$refs.mapEcharts);
				this.mapOption.geo.map = 'world';
				
				// 计算所有访客位置的边界
				if (this.todayMapData && this.todayMapData.length > 0) {
					let minLng = Number.MAX_VALUE;
					let maxLng = Number.MIN_VALUE;
					let minLat = Number.MAX_VALUE;
					let maxLat = Number.MIN_VALUE;
					
					this.todayMapData.forEach(point => {
						const lng = point.value[0];
						const lat = point.value[1];
						minLng = Math.min(minLng, lng);
						maxLng = Math.max(maxLng, lng);
						minLat = Math.min(minLat, lat);
						maxLat = Math.max(maxLat, lat);
					});
					
					// 计算中心点
					const centerLng = (minLng + maxLng) / 2;
					const centerLat = (minLat + maxLat) / 2;
					
					// 计算合适的缩放级别
					let zoom;
					if (this.todayMapData.length === 1) {
						// 单点时使用固定的缩放级别，显示更大范围的地图
						zoom = 5;  // 可以根据需要调整这个值
					} else {
						// 多点时计算合适的缩放级别
						const lngDiff = Math.max(maxLng - minLng, 5);  // 确保最小经度差
						const latDiff = Math.max(maxLat - minLat, 5);  // 确保最小纬度差
						zoom = Math.min(
							360 / Math.max(lngDiff * 2.5, 30),
							180 / Math.max(latDiff * 2.5, 20)
						);
					}
					
					this.mapOption.geo.center = [centerLng, centerLat];
					this.mapOption.geo.zoom = zoom;
				} else {
					// 没有数据时默认显示中国
					this.mapOption.geo.center = [105, 38];
					this.mapOption.geo.zoom = 3.5;
				}
				
				this.mapOption.geo.roam = true;
				this.mapOption.geo.scaleLimit = {
					min: 1,
					max: 10
				};
				this.mapOption.series[0].symbolSize = 8;
				this.mapOption.series[1].symbolSize = 15;
				
				this.mapEcharts.setOption(this.mapOption);
				
				// 保存初始配置
				const initialOption = JSON.parse(JSON.stringify(this.mapOption));
				
				// 添加双击事件，支持缩放查看其他区域
				this.mapEcharts.on('dblclick', (params) => {
					const currentZoom = this.mapOption.geo.zoom;
					const coordinate = this.mapEcharts.convertFromPixel({geoIndex: 0}, [params.event.offsetX, params.event.offsetY]);
					if (coordinate) {
						this.mapOption.geo.center = coordinate;
						this.mapOption.geo.zoom = currentZoom * 1.5;
						this.mapEcharts.setOption(this.mapOption);
					}
				});

				// 监听工具栏事件
				this.mapEcharts.on('restore', () => {
					this.mapOption.geo.zoom = initialOption.geo.zoom;
					this.mapOption.geo.center = initialOption.geo.center;
					this.mapEcharts.setOption(this.mapOption);
				});

				window.addEventListener('resize', () => {
					this.mapEcharts.resize();
				});
			},
			convertData(data) {
				console.log('Converting visitor data:', data);
				let res = [];
				for (let i = 0; i < data.length; i++) {
					// 先查找特殊城市坐标，如果没有再查找正常城市坐标
					let geoCoord = this.specialCityCoords[data[i].city] || geoCoordMap[data[i].city];
					if (geoCoord) {
						res.push({
							name: data[i].city,
							value: [geoCoord[0], geoCoord[1]],
							uv: data[i].uv
						});
					} else {
						console.warn('未找到坐标的城市:', data[i].city);
					}
				}
				console.log('Converted data:', res);
				return res;
			},
			initVisitRecordEcharts() {
				this.visitRecordEcharts = echarts.init(this.$refs.visitRecordEcharts)
				this.visitRecordOption.grid = {
					left: 10,
					right: 20,
					top: 30,
					bottom: 0,
					containLabel: true
				}
				this.visitRecordEcharts.setOption(this.visitRecordOption)
				window.addEventListener('resize', () => {
					this.visitRecordEcharts.resize()
				})
			},
			toggleMapMode() {
				this.isShowTodayVisitor = !this.isShowTodayVisitor;
				const currentData = this.isShowTodayVisitor ? this.todayMapData : this.totalMapData;
				
				this.mapEcharts.setOption({
					title: {
						text: this.isShowTodayVisitor ? '今日访客地图' : '累计访客地图'
					},
					series: [{
						data: currentData
					}, {
						data: currentData.slice(0, 5)
					}]
				});
			},
		}
	}
</script>

<style scoped>
	.panel-group {
		margin-bottom: 20px;
	}

	.chart-container {
		height: 500px;
		width: 100%;
	}

	/* 统计卡片样式 */
	.panel-group .card-panel {
		height: 90px;
		position: relative;
		overflow: hidden;
		cursor: pointer;
		transition: all 0.3s ease-in-out;

		&:hover {
			box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
			transform: translateY(-2px);
		}
	}

	.panel-group .card-panel .card-panel-icon-wrapper {
		float: left;
		margin: 10px 0 0 10px;
		padding: 12px;
	}

	.panel-group .card-panel .card-panel-icon {
		float: left;
		font-size: 42px;
	}

	.panel-group .card-panel .card-panel-description {
		float: right;
		font-weight: 700;
		margin: 20px 20px 20px 0;
	}

	.panel-group .card-panel .card-panel-description .card-panel-text {
		color: rgba(0, 0, 0, 0.45);
		font-size: 14px;
		margin-bottom: 8px;
	}

	.panel-group .card-panel .card-panel-description .card-panel-num {
		font-size: 18px;
	}

	/* 图表通用样式 */
	:deep(.echarts-title) {
		font-size: 16px !important;
	}

	:deep(.echarts-legend) {
		font-size: 14px !important;
	}

	/* 饼图样式 */
	:deep(.pie-chart) {
		.echarts-series {
			transform: scale(1);
		}
	}

	/* 移动端适配样式 */
	@media screen and (max-width: 768px) {
		.panel-group {
			margin-bottom: 15px;
			padding: 0 10px;
		}

		.chart-container {
			height: 300px;
		}

		/* 统计卡片移动端样式 */
		.panel-group .card-panel {
			height: 80px;
			margin-bottom: 10px;
		}

		.panel-group .card-panel .card-panel-icon-wrapper {
			margin: 8px 0 0 8px;
			padding: 10px;
		}

		.panel-group .card-panel .card-panel-icon {
			font-size: 36px;
		}

		.panel-group .card-panel .card-panel-description {
			margin: 16px 16px 16px 0;
		}

		.panel-group .card-panel .card-panel-description .card-panel-text {
			font-size: 12px;
			margin-bottom: 6px;
		}

		.panel-group .card-panel .card-panel-description .card-panel-num {
			font-size: 16px;
		}

		/* 图表移动端样式 */
		:deep(.echarts-title) {
			font-size: 14px !important;
		}

		:deep(.echarts-legend) {
			font-size: 12px !important;
			padding: 0 10px !important;
		}

		/* 饼图移动端样式 */
		:deep(.pie-chart) {
			.echarts-series {
				transform: scale(0.8);
			}
			.echarts-legend {
				bottom: 0 !important;
				top: auto !important;
			}
		}

		/* 折线图移动端样式 */
		:deep(.line-chart) {
			.echarts-grid {
				left: 5px !important;
				right: 10px !important;
				bottom: 5px !important;
				top: 40px !important;
			}
			.echarts-legend {
				padding: [0, 10px] !important;
			}
		}

		/* 地图移动端样式 */
		:deep(.map-chart) {
			.echarts-geo {
				transform: scale(0.8);
			}
			.echarts-series-scatter circle {
				transform: scale(0.75);
			}
			.echarts-series-effectScatter circle {
				transform: scale(0.8);
			}
		}
	}

	/* 平板适配样式 */
	@media screen and (min-width: 769px) and (max-width: 1024px) {
		.chart-container {
			height: 400px;
		}

		.panel-group {
			margin-bottom: 20px;
			padding: 0 15px;
		}

		:deep(.echarts-title) {
			font-size: 15px !important;
		}

		:deep(.echarts-legend) {
			font-size: 13px !important;
		}

		:deep(.pie-chart) {
			.echarts-series {
				transform: scale(0.9);
			}
		}
	}
</style>