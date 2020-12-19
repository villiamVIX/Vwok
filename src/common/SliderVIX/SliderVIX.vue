<!-- 
父组件传入
:target='per' :actual="per_actual" 
预计与实际值

父组件用这两个方法 接收预计值 实际值
@scale='set_Scale'
@scale_actual='set_Scale_Actual'
 
 set_Scale(val){
 	this.per = val 
 },
 set_Scale_Actual(val){
 	this.per_actual = val 
 }
 
 -->
<template>
	<div>

		<div class="slider" ref="slider">
			<div class="process" :style="{width:width}"></div>

			<div class="trunk_estimate" ref="trunk" :style="{left}">
				<div class="block"></div>
				<!-- <div class="tips">
					<span>{{scale*100}}</span>
				</div> -->
			</div>

			<div class="process_actual" :style="{width:width_actual}"></div>

			<div class="thunk_actual" ref="thunk_actual" :style="{left:left_actual}">
				<div class="block_actual"></div>
				<!-- <div class="tips">
					<span>{{scale_actual*100}}</span>
				</div> -->
			</div>
		</div>

	</div>

</template>
<script>
	/*
	 * min 进度条最小值
	 * max 进度条最大值
	 * v-model 对当前值进行双向绑定实时显示拖拽进度
	 * */
	export default {
		watch:{
			target(){
				this.per=this.target
			},
			actual(){
				this.per_actual=this.actual
			},
		}
		,
		props: {
			min: {
				type: Number,
				default () {
					return 0
				}
			},
			max: {
				type: Number,
				default () {
					return 100
				}
			},
			target: {
				type: Number,
			},
			actual: {
				type: Number
			}
		},

		data() {
			return {
				slider: null, //整个    滚动条DOM元素
				trunk_estimate: null, //小点点->拖拽DOM元素
				thunk_actual: null,
				per: this.target, //接收一个当前值
				per_actual: this.actual,
				
			}
		},
		//渲染到页面的时候
		mounted() {
			this.init()
		},
		methods:{
			init(){
				// 初始化
				this.slider = this.$refs.slider;
				this.trunk_estimate = this.$refs.trunk;
				this.thunk_actual = this.$refs.thunk_actual;
				
				var _this = this;
				// 小点的点击事件
				this.trunk_estimate.onmousedown = function(e) {
					// parseInt 字符串转数字  因为在这个组件内，this这里指向slider  width是内进度的宽度
					var width = parseInt(_this.width);
					// disX 点击时的鼠标横坐标  起始点
					var disX = e.clientX;
					// 全局的鼠标移动事件 实时移动->实时调用
					document.onmousemove = function(e) {
						// value, left, width
						// 当value变化的时候，会通过计算属性修改left，width
				
						// 拖拽的时候获取的新width
						//  新的长度   最后的落点 - 起始点 + 老的长度
						var newWidth = e.clientX - disX + width;
				
						// 拖拽的时候得到新的百分比
						//    新的长度        /    总长度 
						var scale = newWidth / _this.slider.offsetWidth;
						// 先算出拖动的值
						_this.per = Math.ceil((_this.max - _this.min) * scale + _this.min);
						// 最小是（拖动值，最小值）的最大值 不低0
						_this.per = Math.max(_this.per, _this.min);
						// 最大是（拖动值，最大值）的最小值 不超100
						_this.per = Math.min(_this.per, _this.max);
						// 传值给父组件
						// _this.$emit('Progress', _this.per)
						_this.$emit('Estimate', _this.per)
					}
					document.onmouseup = function() {
						document.onmousemove = document.onmouseup = null;
					}
					return false;
				}
				
				this.thunk_actual.onmousedown = function(e) {
					// console.log(_this)
					// parseInt 字符串转数字  因为在这个组件内，this这里指向slider  width是内进度的宽度
					var width = parseInt(_this.width_actual);
					// disX 点击时的鼠标横坐标  起始点
					var disX = e.clientX;
					// 全局的鼠标移动事件 实时移动->实时调用
					document.onmousemove = function(e) {
						// value, left, width
						// 当value变化的时候，会通过计算属性修改left，width
				
						// 拖拽的时候获取的新width
						//  新的长度   最后的落点 - 起始点 + 老的长度
						var newWidth = e.clientX - disX + width;
				
						// 拖拽的时候得到新的百分比
						//    新的长度        /    总长度 
						var scale = newWidth / _this.slider.offsetWidth;
						// 先算出拖动的值
						_this.per_actual = Math.ceil((_this.max - _this.min) * scale + _this.min);
						// 最小是（拖动值，最小值）的最大值 不低0
						_this.per_actual = Math.max(_this.per_actual, _this.min);
						// 最大是（拖动值，最大值）的最小值 不超100
						_this.per_actual = Math.min(_this.per_actual, _this.max);
						// 传值给父组件
						_this.$emit('Actual', _this.per_actual)
					}
					document.onmouseup = function() {
						document.onmousemove = document.onmouseup = null;
					}
					return false;
				}
			}
		},
		computed: {
			// 设置一个百分比，提供计算slider进度宽度和trunk的left值
			// 对应公式为 当前值-最小值/最大值-最小值 = slider进度width / slider总width
			// trunk left = slider进度width + trunk宽度/2
			scale() {
				// 算百分比
				return (this.per - this.min) / (this.max - this.min);
			},
			scale_actual() {
				// 算百分比
				return (this.per_actual - this.min) / (this.max - this.min);
			},
			width() {
				// 待加载出来再调用
				if (this.slider) {
					// 动态 以总长度 * 比例 得出 宽度
					return this.slider.offsetWidth * this.scale + 'px';
				} else {
					return 0 + 'px'
				}
			},
			width_actual() {
				// 待加载出来再调用
				if (this.slider) {
					// 动态 以总长度 * 比例 得出 宽度
					return this.slider.offsetWidth * this.scale_actual + 'px';
				} else {
					return 0 + 'px'
				}
			},
			left() {
				if (this.slider) {
					// 减去小圆球的一半 10 
					return this.slider.offsetWidth * this.scale - this.trunk_estimate.offsetWidth / 2 + 'px';
				} else {
					return 0 + 'px'
				}
			},
			left_actual() {
				if (this.slider) {
					// console.log(this.trunk_estimate.offsetWidth)
					return this.slider.offsetWidth * this.scale_actual - this.thunk_actual.offsetWidth / 2 + 'px';
				} else {
					return 0 + 'px'
				}
			}
		},
	}
</script>
<style>
	.box {
		margin: 100px auto 0;
		width: 80%
	}

	.clear:after {
		content: '';
		display: block;
		clear: both;
	}

	.slider {
		position: relative;
		margin: 0.975rem 0;
		width: 9.85rem;
		height: 0.5625rem;
		background: #e4e7ed;
		border-radius: 5px;
		cursor: pointer
	}

	.slider .process {
		position: absolute;
		left: 0;
		top: 0;
		width: 112px;
		height: 10px;
		border-radius: 5px;
		background: #409eff;
	}

	.process_actual {
		position: absolute;
		width: 112px;
		height: 10px;
		border-radius: 5px;
		background: #67C23A;
		opacity: .9;
	}

	.slider .trunk_estimate {
		position: absolute;
		top: -4px;
		width: 22px;
		height: 22px;
	}

	.slider .thunk_actual {
		position: absolute;
		top: 12px;
		width: 22px;
		height: 22px;
	}

	.slider .block {
		width: 1rem;
		height: 1rem;
		border-radius: 4%;
		border: 2px solid #409eff;
		background: white;
		transition: .2s all;
		margin-left:0.15625rem;
	}

	.slider .block_actual {
		width: 0.9rem;
		height: 0.9rem;
		border-radius: 50%;
		border: 2px solid #23a500;
		background: rgba(255, 255, 255, 1);
		transition: .2s all;
		margin-left:0.1825rem;
	}
	
	.slider .block:hover {
		transform: scale(1.51);
		opacity: .8
	}

	.slider .block_actual:hover {
		transform: scale(1.12);
		opacity: .6
	}
	
	/* .slider .tips {
		position: absolute;
		left: -7px;
		bottom: 30px;
		min-width: 15px;
		text-align: center;
		padding: 4px 8px;
		background: #000;
		border-radius: 5px;
		height: 24px;
		color: #fff
	}
	
	.slider .tips i {
		position: absolute;
		margin-left: -5px;
		left: 50%;
		bottom: -9px;
		font-size: 16px;
		color: #000
	} */
</style>

