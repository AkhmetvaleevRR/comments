//Стор с данными для постов и их обработкой
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useResponseStore = defineStore('responseStore', () => {
  let response = ref({})
  let usersResponse = ref({})
  let loaded = ref(false)
  let cutResponse = ref({})
  const usersUrl = 'https://jsonplaceholder.typicode.com/users'
  const postsUrl = 'https://jsonplaceholder.typicode.com/posts'

  function getPosts(id = '') {
    //Собираем посты
    loaded.value = false
    fetch(postsUrl + id, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
      .then((res) =>
        res.json().then((x) => {
          response.value = x
          cutResponse.value = response.value.slice(0, 10)
        })
      ) //преобразуем ответ в json и сохраняем в переменную
      .catch((error) => error.message.includes('Failed to fetch')) //отлавливаем ошибки и выводим в консоль
      .finally(() => {
        loaded.value = true
      })
  }

  function getUsers() {
    //Собираем юзеров
    fetch(usersUrl, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
      .then((res) => res.json().then((x) => (usersResponse.value = x))) //преобразуем ответ в json и сохраняем в переменную
      .catch((error) => error.message.includes('Failed to fetch')) //отлавливаем ошибки и выводим в консоль
      .finally(() => {
        loaded.value = true
      })
  }

  const loadMorePosts = () => {
    //Функция добавляет к урезанному списку постов еще 20
    let objLength = cutResponse.value.length
    cutResponse.value = response.value.slice(0, objLength + 10)
  }

  getPosts()
  getUsers()
  return { response, loaded, usersResponse, cutResponse, getPosts, loadMorePosts }
})
