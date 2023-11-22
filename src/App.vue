<script setup>
import { useTabsStore } from "./stores/tabsStore.js"
const store = useTabsStore()  
function setTab(tab) {
  store.currentTab = tab
}
</script>

<template>
  <main>
    <button
       v-for="(_, tab) in store.tabs"
       :key="tab"
       :class="['tab-button', { active: store.currentTab === tab }]"
       @click="setTab(tab)"
     >
     {{tab}}
    </button>
    <div class="tabs-wrapper">
      <KeepAlive include="PostsView">
        <component :is="store.tabs[store.currentTab]"></component>
      </KeepAlive>
    </div>
  </main>
</template>