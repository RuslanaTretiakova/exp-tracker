<template>
  <div>
    <ExperimentFilters v-model:searchQuery="searchQuery" v-model:filterMode="filterMode" />
    <DataTable
      v-model:selection="selectedExperiments"
      :value="filteredExperimentRows"
      dataKey="id"
      selectionMode="multiple"
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
import { storeToRefs } from 'pinia'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

import { useExperimentStore } from '../../app/store/experimentStore'
import ExperimentFilters from './ExperimentFilters.vue'

const experimentStore = useExperimentStore()
const { parsed, selectedIds } = storeToRefs(experimentStore)

const searchQuery = ref('')
const filterMode = ref<'all' | 'selected'>('all')

const selectedExperiments = computed({
  get: () => selectedIds.value.map((id) => ({ id })),
  set: (val) => {
    experimentStore.setSelectedIds(val.map((v) => v.id))
  },
})

const experimentRows = computed(() => Object.keys(parsed.value).map((id) => ({ id })))

const filteredExperimentRows = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  const selectedIdList = selectedExperiments.value.map((e) => e.id)

  return experimentRows.value.filter((row) => {
    const matchesSearch = row.id.toLowerCase().includes(query)
    const matchesFilter = filterMode.value === 'all' || selectedIdList.includes(row.id)
    return matchesSearch && matchesFilter
  })
})
</script>
