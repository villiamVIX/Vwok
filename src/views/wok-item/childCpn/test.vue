<template>
	<div class="slider" ref="slider">
		<div class="process" :style="{width}"></div>
		<div class="thunk" ref="trunk" :style="{left}">
			<div class="block"></div>
			<div class="tips">
				<span>{{scale*100}}</span>
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
		//       0      100     当前值
		props: ['min', 'max', 'value'],
		data() {
			return {
				slider: null, //整个    滚动条DOM元素
				thunk: null, //小点点->拖拽DOM元素
				per: this.value, //接收一个当前值
			}
		},
		//渲染到页面的时候
		mounted() {
			// 初始化
			this.slider = this.$refs.slider;
			this.thunk = this.$refs.trunk;

			var _this = this;
			// 小点的点击事件
			this.thunk.onmousedown = function(e) {
				// parseInt 字符串转数字  因为在这个组件内，this这里指向slider  width是内进度的宽度
				var width = parseInt(_this.width);
				console.log(_this)
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
					_this.$emit('input', _this.per)
				}
				document.onmouseup = function() {
					document.onmousemove = document.onmouseup = null;
				}
				return false;
			}
		},
		computed: {
			// 设置一个百分比，提供计算slider进度宽度和trunk的left值
			// 对应公式为 当前值-最小值/最大值-最小值 = slider进度width / slider总width
			// trunk left = slider进度width + trunk宽度/2
			scale() {
				return (this.per - this.min) / (this.max - this.min);
			},
			width() {
				if (this.slider) {
					return this.slider.offsetWidth * this.scale + 'px';
				} else {
					return 0 + 'px'
				}
			},
			left() {
				if (this.slider) {
					return this.slider.offsetWidth * this.scale - this.thunk.offsetWidth / 2 + 'px';
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
		clear: both
	}

	.slider {
		position: relative;
		margin: 20px 0;
		width: 400px;
		height: 10px;
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
		background: #409eff
	}

	.slider .thunk {
		position: absolute;
		left: 100px;
		top: -7px;
		width: 20px;
		height: 20px
	}

	.slider .block {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		border: 2px solid #409eff;
		background: rgba(255, 255, 255, 1);
		transition: .2s all
	}

	.slider .tips {
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
	}

	.slider .block:hover {
		transform: scale(1.1);
		opacity: .6
	}
</style>
