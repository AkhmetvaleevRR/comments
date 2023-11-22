//Стор который хранит данные по табам
import { ref } from 'vue'
import { defineStore } from 'pinia'
import PostsView from '../pages/PostsView.vue'
import UsersView from '../pages/UsersView.vue'

export const useTabsStore = defineStore('tabsStore', () => {
  const showUserPanel = ref('')
  const currentTab = ref('PostsView')
  const tabs = {
    PostsView,
    UsersView
  }
  return { currentTab, tabs, showUserPanel }
})
