<template>
  <div class="p-6 space-y-6">
    <div class="flex">
      <Button
        label="Return to panel"
        icon="pi pi-arrow-left"
        class="mb-4"
        @click="$emit('close')"
      />
    </div>

    <div v-if="selectedParsed.length === 0" class="text-center text-gray-500 text-lg">
      Select more experiments to view charts.
    </div>

    <div v-else class="flex flex-wrap gap-[5px]">
      <div
        v-for="metricName in metricNames"
        :key="metricName"
        class="w-full md:w-[calc(50%-2.5px)] box-border p-4 border rounded shadow bg-white"
      >
        <h2 class="text-xl font-bold mb-4 text-center">Metric: {{ metricName }}</h2>
        <Chart
          type="line"
          :data="getComparisonChartData(selectedParsed, metricName)"
          :options="defaultChartOptions"
          style="min-height: 300px"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import Chart from 'primevue/chart'
import Button from 'primevue/button'

import { useExperimentStore } from '../../app/store/experimentStore'
import { defaultChartOptions, getComparisonChartData } from '../../utils/chartUtils'

defineEmits(['close'])

const { parsed, selectedIds } = storeToRefs(useExperimentStore())

const selectedParsed = computed(() =>
  selectedIds.value
    .filter((id) => parsed.value[id])
    .map((id) => ({ id, metrics: parsed.value[id] }))
)

const metricNames = computed(() => {
  const set = new Set<string>()
  selectedParsed.value.forEach((exp) => Object.keys(exp.metrics).forEach((name) => set.add(name)))
  return Array.from(set)
})
</script>
