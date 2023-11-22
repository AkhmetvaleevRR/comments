
<template>		
	<div	class="user-filter"
		v-show="tabsStore.showUserPanel"
  	>Filter by user: 
    {{tabsStore.showUserPanel}}
    <button @click="resetFilter()">X</button>
	</div>
</template>

<script setup>
	import { useTabsStore } from "../stores/tabsStore.js"
	import { useResponseStore } from "../stores/store.js"
	const store = useResponseStore()
	const tabsStore = useTabsStore()
  function resetFilter () {  //Функция убирает фильтр (запрашивается весь список постов заново)
    tabsStore.showUserPanel=''
    store.getPosts()
  }
</script>
