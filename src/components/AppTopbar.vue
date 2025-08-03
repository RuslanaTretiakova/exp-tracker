<template>
  <Toolbar>
    <template #start>
      <h1>Exp-tracker</h1>
    </template>

    <template #end>
      <div class="flex items-center gap-5">
        <FileUploader />

        <Button
          v-if="selectedIds.length > 1"
          label="Compare"
          size="medium"
          icon="pi pi-chart-line"
          class="flex-none"
          @click="$emit('compare')"
        />

        <Button
          severity="success"
          class="flex-none"
          size="medium"
          variant="outlined"
          :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
          @click="toggleTheme"
          aria-label="Toggle Theme"
        />
      </div>
    </template>
  </Toolbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useExperimentStore } from '../app/store/experimentStore'

import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import FileUploader from './FileUploader.vue'

const isDark = ref(false)
const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('app-dark', isDark.value)
}

const { selectedIds } = storeToRefs(useExperimentStore())
</script>
