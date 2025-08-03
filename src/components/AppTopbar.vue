<template>
  <Toolbar>
    <template #start>
      <h1>Exp-tracker</h1>
    </template>

    <template #end>
      <Button
        severity="success"
        variant="outlined"
        :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
        @click="toggleTheme"
        aria-label="Toggle Theme"
      />
    </template>
  </Toolbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'

const isDark = ref<boolean>(false)

const toggleTheme = (): void => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('app-dark', isDark.value)
}
</script>
