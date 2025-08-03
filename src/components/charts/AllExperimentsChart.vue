<template>
  <div class="p-6 space-y-6">
    <div v-if="selectedParsed.length === 0" class="text-center text-gray-500 text-lg">
      Select one or more experiments to view charts.
    </div>

    <div v-else class="flex flex-wrap gap-[5px]">
      <div
        v-for="{ id, metrics } in selectedParsed"
        :key="id"
        class="w-full md:w-[calc(50%-2.5px)] box-border p-4 border rounded shadow bg-white"
      >
        <h2 class="text-xl font-bold mb-4 text-center">{{ id }}</h2>
        <Chart
          type="line"
          :data="getChartData(metrics)"
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

import { useExperimentStore } from '../../app/store/experimentStore'
import { getChartData, defaultChartOptions } from '../../utils/chartUtils'

const { parsed, selectedIds } = storeToRefs(useExperimentStore())

const selectedParsed = computed(() =>
  selectedIds.value
    .filter((id) => parsed.value[id])
    .map((id) => ({ id, metrics: parsed.value[id] }))
)
</script>
