<!-- Компонент с кнополкй добавления коммента к посту -->
<template>
	<div class="form">
	  <form @submit.prevent="createNewComment" >
		<div class="form__group" >
		  <label>Leave a comment</label>
  
		  <textarea
			v-model="newComment"
			rows="10"
			required
			cols="50"
			placeholder="type in your comment"
		  />
		  <button :class="{ spinable: !store.loaded }"><span>Submit</span></button>
		</div>
	  </form>
	</div>
  </template>
  
<script setup>
import { useResponseStore } from "../stores/store.js"
let newComment = '';
const props = defineProps({
	postId: Number,
})
const store = useResponseStore()
function createNewComment() {	 //Функция добавления нового коммента
	const addCommentUrl = `https://jsonplaceholder.typicode.com/posts/${props.postId}`; //Отправляем запрос с новым комментом
	if (newComment === '') {
		return;
	}
	store.loaded = false
	fetch(addCommentUrl, {
		method: 'PUT',
		body: JSON.stringify({
			id: props.postId,
			title: 'foo',
			body: newComment,
			userId: props.postId,
		}),
	})
	.catch((error) => error.message.includes('Failed to fetch')) //отлавливаем ошибки и выводим в консоль
	.finally(() => {
		store.loaded = true;
	})
}
</script>