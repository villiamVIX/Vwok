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
 :class="isShowTip ? 'tips' : ''"
 -->

<template>
	<div>
		<div class="slider" ref="slider">
			<div class="process" :style="{ width: width }"></div>

			<div class="trunk_estimate" ref="trunk" :style="{ left }">
				<div class="block" @mouseenter="show_tip" @mouseleave="hide_tip">
					<div class="tips">{{ scale * 100 }}</div>
				</div>
			</div>

			<div class="process_actual" :style="{ width: width_actual }"></div>

			<div class="thunk_actual" ref="thunk_actual" :style="{ left: left_actual }">
				<div class="block_actual"></div>
				<!-- <div class="tips">
					<span>{{ scale_actual * 100 }}</span>
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
	watch: {
		target() {
			this.per = this.target;
		},
		actual() {
			this.per_actual = this.actual;
		},
	},
	props: {
		min: {
			type: Number,
			default() {
				return 0;
			}
		},
		max: {
			type: Number,
			default() {
				return 100;
			}
		},
		target: {
			type: Number
		},
		actual: {
			type: Number
		}
	},
	mounted() {
		this.calculate_Height(); // 自适应容器高度
		this.onResize();
	},
	data() {
		return {
			slider: null, //整个    滚动条DOM元素
			trunk_estimate: null, //小点点->拖拽DOM元素
			thunk_actual: null,
			per: this.target, //接收一个当前值
			per_actual: this.actual,
			
			isShowTip: false
		};
	},
	//渲染到页面的时候
	mounted() {
		this.init();
	},
	methods: {
		onResize() {
			window.onresize = () => {
				// 自适应高度
				// this.calculate_Height();
				console.log(123123)
			};
		},
		show_tip() {
			this.isShowTip = true;
		},
		hide_tip() {
			this.isShowTip = false;
		},
		init() {
			// 初始化
			this.slider = this.$refs.slider;
			this.trunk_estimate = this.$refs.trunk;
			this.thunk_actual = this.$refs.thunk_actual;

			var _this = this,
				slider_Width = this.slider.offsetWidth;
			// 小点的点击事件
			this.trunk_estimate.onmousedown = function(e) {
				// parseInt 字符串转数字  因为在这个组件内，this这里指向slider  width是内进度的宽度
				// _this.width是百分比 转成px再计算
				let width = (parseInt(_this.width) / 100) * slider_Width,
					// disX 点击时的鼠标横坐标  起始点
					disX = e.clientX;

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
					_this.$emit('Estimate', _this.per);
				};
				document.onmouseup = function() {
					document.onmousemove = document.onmouseup = null;
				};
				return false;
			};

			this.thunk_actual.onmousedown = function(e) {
				// parseInt 字符串转数字  因为在这个组件内，this这里指向slider  width是内进度的宽度
				var width = (parseInt(_this.width_actual) / 100) * slider_Width,
					// disX 点击时的鼠标横坐标  起始点
					disX = e.clientX;
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
					_this.$emit('Actual', _this.per_actual);
				};
				document.onmouseup = function() {
					document.onmousemove = document.onmouseup = null;
				};
				return false;
			};
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
			let a = (this.per_actual - this.min) / (this.max - this.min);

			return a;
		},
		width() {
			// 待加载出来再调用
			if (this.slider) {
				// 动态 以总长度 * 比例 得出 宽度
				return this.scale * 100 + '%';
			} else {
				return `0%`;
			}
		},
		width_actual() {
			// 待加载出来再调用
			if (this.slider) {
				// 动态 以总长度 * 比例 得出 宽度
				let a = this.scale_actual * 100 + '%';
				// console.log(a);/
				return a;
			} else {
				return `0%`;
			}
		},
		left() {
			if (this.slider) {
				// 减去小圆球的一半 10
				let slider = this.slider.offsetWidth * this.scale;
				let ball = slider - this.trunk_estimate.offsetWidth / 2;
				return (ball / this.slider.offsetWidth) * 100 + '%';
			} else {
				return `0%`;
			}
		},
		left_actual() {
			if (this.slider) {
				let slider = this.slider.offsetWidth * this.scale_actual;
				let ball = slider - this.thunk_actual.offsetWidth / 2;
				// console.log((ball / this.slider.offsetWidth) * 100);
				return (ball / this.slider.offsetWidth) * 100 + '%';
				// let a = this.slider.offsetWidth * this.scale_actual - this.thunk_actual.offsetWidth / 2 + 'px';
			} else {
				return `0%`;
			}
		}
	}
};
</script>
<style>
.box {
	margin: 6.25rem auto 0;
	width: 80%;
}
.clear:after {
	content: '';
	display: block;
	clear: both;
}
.slider {
	position: relative;
	margin: 0.975rem 0;
	width: 85%;
	height: 0.375rem;
	background: #e4e7ed;
	border-radius: 5px;
	cursor: pointer;
}
.slider .process {
	position: absolute;
	left: 0;
	top: 0;
	width: 7rem;
	height: 0.375rem;
	border-radius: 5px;
	border-top-left-radius: 0.45px;
	background: var(--custom-bgc);
}
.process_actual {
	position: absolute;
	width: 7rem;
	height: 0.375rem;
	border-radius: 5px;
	border-top-left-radius: 0px;
	border-bottom-left-radius: 0px;
	background: var(--custom-green);
	opacity: 0.9;
}
.slider .trunk_estimate {
	position: absolute;
	top: -5px;
	width: 1.375rem;
	height: 1.375rem;
}
.slider .thunk_actual {
	position: absolute;
	top: 5px;
	width: 1.375rem;
	height: 1.375rem;
}
.slider .block {
	width: 1rem;
	height: 1rem;
	border-radius: 4%;
	border: 2px solid var(--custom-bgc);
	background: white;
	transition: 0.2s all;
	margin-left: 0.15625rem;
}
.slider .block_actual {
	width: 0.9rem;
	height: 0.9rem;
	border-left: 10px solid transparent;
	border-right: 10px solid transparent;
	border-bottom: 20px solid var(--custom-green);
}

.slider .block:hover {
	transform: scale(1.01);
	opacity: 0.8;
}
.slider .block_actual:hover {
	transform: scale(1.08);
	opacity: 0.6;
}

/* ✔ */

.complete {
	position: relative;
	display: inline-block;
	top: -1px;
	width: 1rem;
	height: 1rem;
	background: var(--custom-green);
	border-radius: 25px;
}
.complete::after {
	content: '';
	position: absolute;
	left: 0.255rem;
	top: 0.35rem;
	width: 50%;
	height: 25%;
	border: 2.9px solid #000;
	border-radius: 1px;
	border-top: none;
	border-right: none;
	background: var(--custom-green);
	transform: rotate(-45deg);
	z-index: 888;
}

.tips {
	/* 	position: absolute;
	left: -7px;
	text-align: center;
	background: #000;
	color: #fff;

	border-radius: 4px;
	padding: 10px;
	z-index: 2000;
	font-size: 12px;
	line-height: 14.2;
	min-width: 10px;
	word-wrap: break-word;
height: 35px; */
	text-align: center;
	position: absolute;
	line-height: 11;
	/* background: #000; */
	color: #0339ff;
	border-radius: 4px;
	min-width: 10px;
	z-index: 2000;
	padding: 10px;
	font-size: 25px;
	bottom: 15px;
	left: -7px;
	word-wrap: break-word;
height: 15px;

	animation: fade-in; /*动画名称*/
	animation-duration: 0.2s; /*动画持续时间*/
	-webkit-animation: fade-in 0.3s; /*针对webkit内核*/
}
@keyframes fade-in {
	0% {
		opacity: 0;
	} /*初始状态 透明度为0*/
	40% {
		opacity: 0;
	} /*过渡状态 透明度为0*/
	100% {
		opacity: 1;
	} /*结束状态 透明度为1*/
}
@-webkit-keyframes fade-in {
	/*针对webkit内核*/
	0% {
		opacity: 0;
	}
	40% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
</style>
