<template>
  <div class="p-2 mb-2 flex justify-between gap-2 items-center">
    <div class="flex gap-2 items-center">
      <InputText v-model="localSearchQuery" type="text" placeholder="Search by ID" />
      <Button
        icon="pi pi-times"
        size="medium"
        severity="secondary"
        outlined
        @click="resetFilters"
        aria-label="Reset filters"
        title="Reset filters"
      />
    </div>
    <div class="flex gap-2 items-center">
      <Button
        label="All"
        size="small"
        :outlined="filterModel !== 'all'"
        :severity="filterModel === 'all' ? 'primary' : undefined"
        @click="filterModel = 'all'"
      />
      <Button
        label="Selected"
        size="small"
        :outlined="filterModel !== 'selected'"
        :severity="filterModel === 'selected' ? 'primary' : undefined"
        @click="filterModel = 'selected'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const searchModel = defineModel<string>('searchQuery')
const filterModel = defineModel<'all' | 'selected'>('filterMode')

const localSearchQuery = ref(searchModel.value ?? '')

watch(localSearchQuery, (val) => {
  searchModel.value = val
})

watch(searchModel, (val) => {
  if (val !== localSearchQuery.value) {
    localSearchQuery.value = val ?? ''
  }
})

function resetFilters() {
  localSearchQuery.value = ''
  filterModel.value = 'all'
}
</script>
