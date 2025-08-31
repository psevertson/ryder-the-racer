<template lang="pug">
QLayout(view="lHh Lpr lFf")
  QHeader(elevated)
    QToolbar
      QBtn(flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer")
      QToolbarTitle Quasar App
      div Quasar v{{ $q.version }}
  
  QDrawer(v-model="leftDrawerOpen" showIfAbove bordered)
    QList
      QItemLabel(header) Essential Links

  QPageContainer
    RouterView
</template>
<script setup lang="ts">
import { ref } from "vue"

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
	leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
