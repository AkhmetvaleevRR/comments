<template>
  <div class="posts-wrapper" ref="scrollComponent" > 
    <UserFilter/>
    <div class="posts-wrapper__container" v-for="post in store.cutResponse" :key="post.id">      
      <UserPost ref="post"
        :fetchedPost = post 
        :users = store.usersResponse />
    </div>
  </div>
</template>

<script setup>
  import { useResponseStore } from "../stores/store.js"
  import { onMounted, onUnmounted, ref } from 'vue'
  import UserFilter from "@/components/UserFilter.vue"  
  import UserPost from '@/components/UserPost.vue';
  
  const scrollComponent = ref(null)
  const post = ref(null)
  const store = useResponseStore()  

  onMounted(() => {
    window.addEventListener("scroll", handleScroll)  //отлавливаем скролла страницы
  })

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll) //убираем отслеживание скролла страницы
  })


  const handleScroll = () => {  //Что далем при скролле
    let el = scrollComponent.value
    if (el.getBoundingClientRect().bottom < window.innerHeight) {
      store.loadMorePosts() //функция которая выполняется когда доходим до низа контейнера с постами
    }
  }
</script>