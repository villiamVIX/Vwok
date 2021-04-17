<template>
	<header class="navbar_content">
		<nav id="navbar">
			<div class="navbar-left">
				<div class="toggle_btn"
				 v-show="isShowIcon"
				 @click="$store.dispatch('common/toggleSideBar')"><i class="el-icon-s-unfold"></i></div>
				<img class="logo" src="~/assets/logoFont_v2.1.png" />
			</div>
			<ul class="navbar-right">
				<li v-for="item in navlist">
					<a :href="item.href">{{ item.title }}</a>
				</li>
				<el-dropdown v-show="isShowIcon" >
					<i class="el-icon-user-solid "></i>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="Change_Password">修改密码</el-dropdown-item>
						<el-dropdown-item @click.native="Logout">退出</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</ul>
		</nav>
	</header>
</template>

<script>
export default {
	data() {
		return {
			isShowIcon:true,
			navlist: [
				{
					href: '',
					title: '项目首页'
				},
				{
					href: '/apidoc',
					title: '接口文档'
				},
				{
					href: ' http://wp.coderv.cn:83/index.php/blog/',
					title: 'LOGV博客'
				}
			]
		};
	},
	mounted() {
		console.log(this.$route.path=='/login')
		if(this.$route.path=='/login'){
			this.isShowIcon = false
		}
	},
	methods:{
		Logout() {
			this.$store.dispatch('log_Out');
			window.location.reload(true);
		},
	}
};
</script>

<style scoped="scoped">
.navbar_content {
	min-height: auto;
	color: #333333;
	border-bottom: 1px solid rgba(204, 204, 204, 0.16);
	box-shadow: 0 1px 4px 0 rgb(0 0 0 / 15%);
	z-index: 1;
	display: flex;
	justify-content: center;
	flex-direction: column;
	padding: 0 1.875rem;
	height: 3.5rem;
	-webkit-font-smoothing: antialiased;
}
#navbar {
	display: flex;
	justify-content: space-between;
	justify-content: baseline;
}
.navbar-left {
	flex: 1;
	display: flex;
}
.navbar-right {
	/* flex: 1; */
	display: flex;
	margin: auto 0;
	justify-content: space-between;
	font-size: 0.875rem;
	width: 30rem;
	list-style-type: none;
}

.toggle_btn {
	width: 1rem;
	margin-right: 30px;
}

.toggle_btn:hover {
	transform: scale(1.04);
	opacity: 0.8;
}

.logo {
	width: 11rem;
}
</style>
