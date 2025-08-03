<template>
  <div class="layout">
    <AppTopbar />
    <Toast />
    <Splitter>
      <SplitterPanel :size="25">
        <ExperimentTable v-if="Object.keys(parsed).length" :data="parsed" />
        <div v-else>
          <Skeleton height="100vh" />
        </div>
      </SplitterPanel>

      <SplitterPanel :size="75"><div></div></SplitterPanel>
    </Splitter>
  </div>
</template>

<script setup lang="ts">
import Skeleton from 'primevue/skeleton'
import Splitter from 'primevue/splitter'
import { Toast } from 'primevue'
import SplitterPanel from 'primevue/splitterpanel'

import { useExperimentStore } from '../../app/store/experimentStore'
import { storeToRefs } from 'pinia'

import AppTopbar from '../../components/AppTopbar.vue'
import ExperimentTable from '../../components/experiment/ExperimentTable.vue'

const experimentStore = useExperimentStore()
const { parsed } = storeToRefs(experimentStore)
</script>
