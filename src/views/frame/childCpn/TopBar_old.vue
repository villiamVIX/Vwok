<template>
	<div class="header-Box">
		<div class="header-left">
			<div class="toggle" @click="$store.dispatch('common/toggleSideBar')"><i class="el-icon-s-unfold"></i></div>
			<el-breadcrumb separator-class="el-icon-caret-right" style="display: inline-block">
				<el-breadcrumb-item><a href="javascript:;">首页</a></el-breadcrumb-item>
				<transition-group name="breadcrumb">
					<el-breadcrumb-item v-for="item in levelList" :key="item.path" v-if="item.meta.title" :to="item.redirect || item.path">
						{{ item.meta.title }}
					</el-breadcrumb-item>
				</transition-group>
			</el-breadcrumb>
		</div>

		<div class="header-mid"><img src="../../../../public/logoFont_v2.1.png" /></div>

		<div class="header-right">
			<el-dropdown>
				<i class="el-icon-user-solid"></i>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.native="Change_Password">修改密码</el-dropdown-item>
					<el-dropdown-item @click.native="Logout">退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<span>{{ username }}</span>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import AvatarVIX from '../../../common/Components/AvatarVIX/AvatarVIX.vue';
export default {
	computed: {
		...mapGetters(['username'])
	},
	watch: {
		$route(to, from) {
			this.getBreadcrumb();
		}
	},
	components: {
		AvatarVIX
	},
	mounted() {
		this.getBreadcrumb();
	},
	data() {
		return {
			levelList: undefined
		};
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
		getBreadcrumb() {
			let matched = this.$route.matched.filter(item => item.meta.title);
			// console.log(this.$route.matched)
			this.levelList = matched;
		},
		Logout() {
			console.log(123);
			this.$store.dispatch('log_Out');
			window.location.reload(true);
		},
		Change_Password() {}
	}
};
</script>

<style scoped>
.gymIcon-sideClose {
	font-size: 1.125rem;
}

.header-Box {
	display: flex;
	align-items:center;
	justify-content: space-between;
	margin-top: 5px;
}

.toggle {
	width: 0.9375rem;
}

.header-mid {
	display: flex;
	align-self: center;
}

.header-mid img {
	height: 32px;
}

.header-right {
	display: flex;
	/* align-items: flex-start; */
	font-size: 1rem;
}

.header-right i {
	font-size: 1.4rem;
}

/* .header-right i:hover {
 background-color: #00c58e1f;
 border-radius: 15px;
 
} */

</style>
