<!-- компонент для отображения карточки пользователя -->
<template>	
	<div class="user-card">
		<h2 class="user-card__name">{{props.userData.username}}</h2>		
		<p class="user-card__email">{{props.userData.email}}</p>
		<button @click="showPosts(props.userData.id)">Посмотреть посты пользователя</button>
	</div>
</template>

<script setup>
	import { useTabsStore } from "../stores/tabsStore.js"
	import { useResponseStore } from "../stores/store.js"
	const store = useResponseStore()
	const tabsStore = useTabsStore()  
	const props = defineProps({
		userData: {}
	})
	function showPosts (id) { // Функция смены компонента на PostView + отображение плашки user на этом компоненте
    tabsStore.showUserPanel = props.userData.username;
		tabsStore.currentTab = 'PostsView'
		store.getPosts(`?userId=${id}`)
	}
</script>