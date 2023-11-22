<template>
  <div class="posts-wrapper" ref="scrollComponent" >
    <button @click ="sortbyUser(sortOrder)" v-show="!tabsStore.showUserPanel">Sort by username</button>
    <UserFilter/>
    <div class="posts-wrapper__container" v-for="post in store.cutResponse" :key="post.id">      
      <UserPost ref="post"
        :fetchedPost = post  />
    </div>
  </div>
</template>

<script setup>
  import { useResponseStore } from "../stores/store.js"
	import { useTabsStore } from "../stores/tabsStore.js"
  import { onMounted, onUnmounted, ref } from 'vue'
  import UserFilter from "@/components/UserFilter.vue"  
  import UserPost from '@/components/UserPost.vue';
  let sortOrder = ref(false);
  const scrollComponent = ref(null)
  const store = useResponseStore()
  const tabsStore = useTabsStore()

  onMounted(() => {
    window.addEventListener("scroll", handleScroll)  //отлавливаем скролла страницы
  })

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll) //убираем отслеживание скролла страницы
  })
  function sortbyUser (order) {
    order === true?store.getPosts('',"desc"):store.getPosts('',"asc")
    sortOrder.value = !sortOrder.value;
  }

  const handleScroll = () => {  //Что далем при скролле
    let el = scrollComponent.value
    if (el.getBoundingClientRect().bottom < window.innerHeight) {
      store.loadMorePosts() //функция которая выполняется когда доходим до низа контейнера с постами
    }
  }
</script>