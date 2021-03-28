<template>
	<div id="Wok-Item">
		<el-card class="box-card">
			<div class="board">
				<KanBanVIX :key="1" :list="list1" :group="group" class="kanban todo" header-text="待完成" />
				<KanBanVIX :key="2" :list="list2" :group="group" class="kanban working" header-text="工作中" />
				<KanBanVIX :key="3" :list="list3" :group="group" class="kanban done" header-text="转测试" />
			</div>
		</el-card>
	</div>
</template>

<script>
	import KanBanVIX from 'common/Components/KanBanVIX/KanBanVIX.vue'
	export default {
		data() {
			return {
				group: '123',
				list1: [{
						name: 'Mission',
						id: 1
					},
					{
						name: 'Mission',
						id: 2
					}
				
				],
				list2: [{
						name: 'Mission',
						id: 5
					},
					{
						name: 'Mission',
						id: 6
					},
					{
						name: 'Mission',
						id: 7
					}
				],
				list3: [{
						name: 'Mission',
						id: 8
					},
					{
						name: 'Mission',
						id: 9
					},
					{
						name: 'Mission',
						id: 10
					}
				]
			}
		},
		components: {
			KanBanVIX

		},
		methods: {

		}
	}
</script>

<style scoped="scoped">
	#Wok-Item{
		height: 100vh;
	}
	.kanban{
		margin: 0 1.25rem;
	}
	.board {
		margin-left: 1.25rem;
		display: flex;
		justify-content: baseline;
		flex-direction: row;
		align-items: flex-start;
	}
</style>
