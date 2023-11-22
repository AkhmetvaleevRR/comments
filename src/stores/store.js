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

  function getPosts(id = '', sortByUsers = 'desc') {
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
          getUsers(sortByUsers)
        })
      ) //преобразуем ответ в json и сохраняем в переменную
      .catch((error) => error.message.includes('Failed to fetch')) //отлавливаем ошибки и выводим в консоль
      .finally(() => {
        loaded.value = true
      })
  }

  function getUsers(sortByUsers) {
    //Собираем юзеров
    fetch(usersUrl, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
      .then((res) =>
        res.json().then((x) => {
          usersResponse.value = x
          if (sortByUsers) {
            for (let i = 0; i < response.value.length; i++) {
              response.value[i].username = usersResponse.value.find(
                (x) => x.id === response.value[i].userId
              ).username
            }
            if (sortByUsers === 'desc') {
              response.value.sort((a, b) => a.username.localeCompare(b.username))
            } else if (sortByUsers === 'asc') {
              response.value.sort((a, b) => -1 * a.username.localeCompare(b.username))
            }
          }
        })
      ) //преобразуем ответ в json и сохраняем в переменную
      .catch((error) => error.message.includes('Failed to fetch')) //отлавливаем ошибки и выводим в консоль
      .finally(() => {
        if (sortByUsers) {
          cutResponse.value = response.value.slice(0, 10)
        }
        loaded.value = true
      })
  }

  const loadMorePosts = () => {
    //Функция добавляет к урезанному списку постов еще 20
    let objLength = cutResponse.value.length
    cutResponse.value = response.value.slice(0, objLength + 10)
  }

  getPosts()
  return { response, loaded, usersResponse, cutResponse, getPosts, loadMorePosts }
})
