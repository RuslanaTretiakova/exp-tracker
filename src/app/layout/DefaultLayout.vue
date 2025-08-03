<template>
  <div class="layout">
    <AppTopbar @compare="showComparison = true" />
    <Toast />

    <Splitter :layout="splitterLayout">
      <SplitterPanel :size="30">
        <template v-if="hasParsedData">
          <ExperimentTable />
        </template>
        <template v-else>
          <Skeleton height="100vh" />
        </template>
      </SplitterPanel>

      <SplitterPanel :size="75">
        <CompareMetrics v-if="showComparison" @close="showComparison = false" />
        <AllExperimentsChart v-else />
      </SplitterPanel>
    </Splitter>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'

import Skeleton from 'primevue/skeleton'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import { Toast } from 'primevue'

import { useExperimentStore } from '../../app/store/experimentStore'

import AppTopbar from '../../components/AppTopbar.vue'
import ExperimentTable from '../../components/experiment/ExperimentTable.vue'
import AllExperimentsChart from '../../components/charts/AllExperimentsChart.vue'
import CompareMetrics from '../../components/charts/CompareMetrics.vue'
import { useSplitterLayout } from '../../utils/hooks/useSplitterLayout'

const experimentStore = useExperimentStore()
const { parsed } = storeToRefs(experimentStore)

const hasParsedData = computed(() => Object.keys(parsed.value).length > 0)
const showComparison = ref(false)

const { splitterLayout } = useSplitterLayout()
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: auto;
}

.layout :deep(.p-splitter) {
  flex: 1;
  min-height: 100vh;
  height: auto;
}

.layout :deep(.p-splitter-panel) {
  overflow: auto;
}
</style>
