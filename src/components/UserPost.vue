<template>
  <section class="section">
    <div class="section__details">
      <div class="section__details-info">
        <h1>{{ props.fetchedPost.title }}</h1>
        <div class="section__details-img">
          <img
            src="https://res.cloudinary.com/terieyenike/image/upload/v1644896156/vvasmj6onychxlkkynua.png"
            alt="anime character"
          />
          <p>Written by {{ getUserById(props.fetchedPost.userId) }}</p>
        </div>
      </div>
      <div class="section__details-content">
        <p>
          {{ props.fetchedPost.body }}
        </p>
      </div>
    </div>
    <div class="comment-space">
      Comments:
      <TransitionGroup name="list" tag="div">
        <div v-for="comment in commentResponse" :key="comment.id">
          <Comment :commentData="comment" />
        </div>
      </TransitionGroup>
    </div>
    <add-comment :postId="props.fetchedPost.id" />
  </section>
</template>
  
<script setup>
import AddComment from '@/components/AddComment.vue'
import Comment from '@/components/UserComment.vue'
import { ref } from 'vue'

const props = defineProps({
  fetchedPost: {},
  users: {}
})
let loaded = ref(false)
let commentResponse = ref({})

function getUserById(id) { //СФункция поиска имени юзера по id
  for (let i = 0; i < props.users.length; i++) {
    if (props.users[i].id === id) {
      return props.users[i].username
    }
  }
}

function getComments(postId) {  //Функция получения комментов к конкретному посту
  const commentUrl = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  fetch(commentUrl, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })
    .then((res) => res.json().then((x) => (commentResponse.value = x))) //преобразуем ответ в json и сохраняем в переменную
    .catch((error) => error.message.includes('Failed to fetch')) //отлавливаем ошибки и выводим в консоль
    .finally(() => {
      loaded.value = true //Переменная для окончания загрузки
    })
}

getComments(props.fetchedPost.id)
</script>
