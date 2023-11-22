<!-- Компонент для отображения комментария -->
<template>
	<div class="comment" >
		<div class="comment__flex">
		<p>{{ props.commentData.body }}</p>
			<div class="comment__flex-btn">
			</div>
		</div>
	</div>
  </template>
  
<script setup>
	const props = defineProps([
		'commentData'
	])
</script>