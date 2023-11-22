<template>
  <div class="users-container">
    <div class="users-container__item" v-for="user in store.usersResponse" :key="user.id">
      <UserCard :userData = user />
    </div>     
  </div>
</template>

<script setup>
  import UserCard from "../components/UserCard.vue";
  import { useResponseStore } from "../stores/store.js"
  const store = useResponseStore()
</script>
