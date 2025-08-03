<template>
  <div>
    <ExperimentFilters v-model:searchQuery="searchQuery" v-model:filterMode="filterMode" />
    <DataTable
      v-model:selection="selectedExperiments"
      :value="filteredExperimentRows"
      dataKey="id"
      selectionMode="multiple"
      @selection-change="onSelectionChange"
      :rows="3"
      :paginator="true"
    >
      <Column selectionMode="multiple" headerStyle="width: 3rem" />
      <Column field="id" header="Experiments" />
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

import { useExperimentStore } from '../../app/store/experimentStore'
import type { ParsedData } from '../../types/types'
import ExperimentFilters from './ExperimentFilters.vue'

const props = defineProps<{ data: ParsedData }>()
const experimentStore = useExperimentStore()

const selectedExperiments = ref<{ id: string }[]>([])
const searchQuery = ref('')
const filterMode = ref<'all' | 'selected'>('all')

const experimentRows = computed(() => Object.keys(props.data).map((id) => ({ id })))

const filteredExperimentRows = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  const selectedIds = selectedExperiments.value.map((e) => e.id)

  return experimentRows.value.filter((row) => {
    const matchesSearch = row.id.toLowerCase().includes(query)
    const matchesFilter = filterMode.value === 'all' || selectedIds.includes(row.id)
    return matchesSearch && matchesFilter
  })
})

function onSelectionChange(event: { value: { id: string }[] }) {
  selectedExperiments.value = event.value
  const selectedIds = event.value.map((row) => row.id)
  experimentStore.setSelectedIds(selectedIds)
}
</script>
